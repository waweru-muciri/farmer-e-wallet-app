import React, { useEffect, useLayoutEffect } from "react";
import { connect } from "react-redux";
import { fetchDataFromUrl, handleDelete } from "../reducers";
import { List, Text, Button } from "react-native-paper";
import { ScrollView, View, Alert } from "react-native";


function WithdrawalsScreen({ navigation, fetchData, withdrawals, deleteItem }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Withdrawals",
    });
  }, []);

  useEffect(() => {
    fetchData("withdrawals");
  }, []);

  useEffect(() => {
    fetchData("accounts");
  }, []);

  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          justifyContent: "space-evenly",
          padding: 10,
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "space-evenly",
            flexDirection: "row",
          }}
        >
          <Text
            variant="titleLarge"
            style={{ fontWeight: "bold", textAlign: "center", margin: 10 }}
          >
            {" "}
             My Withdrawals
          </Text>
          <Button
            mode="elevated"
            style={{ alignSelf: "center" }}
            onPress={() => {
              navigation.navigate("WithdrawalInputScreen", {});
            }}
          >
            Withdraw
          </Button>
        </View>
        <List.Section>
          <List.Subheader>Your withdrawals</List.Subheader>
          {withdrawals.map((withdrawal) => (
            <List.Item
              key={withdrawal?._id}
              title={`${withdrawal?.name} - Ksh: ${withdrawal?.amount}`}
              description={withdrawal?.description}
              left={(props) => <List.Icon {...props} icon="cash-minus" />}
              right={(props) => <Button {...props} icon="delete" onPress={async () => {
                try {
                    await deleteItem(withdrawal._id, "withdrawals")
                    Alert.alert("Success!", "Item deleted successfully");
                } catch (error) {
                    console.error(error);
                }
            }} />}
            />
          ))}
        </List.Section>
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    withdrawals: state.withdrawals,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => {
      dispatch(fetchDataFromUrl(url));
    },
    deleteItem: (itemId, url) => {
      dispatch(handleDelete(itemId, url))
  },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WithdrawalsScreen);
