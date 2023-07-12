import React, { useEffect, useLayoutEffect } from "react";
import { connect } from "react-redux";
import { fetchDataFromUrl } from "../reducers";
import { List, Text, Button } from "react-native-paper";
import { ScrollView, View } from "react-native";

function DepositsScreen({ navigation, fetchData, deposits }) {
  
    useLayoutEffect(() => {
    navigation.setOptions({
      title: "Deposits",
    });
  }, []);

  useEffect(() => {
    fetchData("deposits");
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
            My Current Deposits
          </Text>
          <Button
            mode="elevated"
            style={{ alignSelf: "center" }}
            onPress={() => {
              navigation.navigate("SavingsInputScreen", {});
            }}
          >
            Add Deposit
          </Button>
        </View>
        <List.Section>
          <List.Subheader>Your deposits</List.Subheader>
          {deposits.map((deposit) => (
            <List.Item
              key={deposit?._id}
              title={`${deposit?.name} - Ksh: ${deposit?.amount}`}
              description={deposit?.description}
              left={(props) => <List.Icon {...props} icon="cash-plus" />}
              // onPress={() => {
              //     navigation.navigate("transactionInputScreen", {
              //         transactionId: deposit._id
              //     })
              // }}
            />
          ))}
        </List.Section>
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    deposits: state.deposits,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => {
      dispatch(fetchDataFromUrl(url));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DepositsScreen);
