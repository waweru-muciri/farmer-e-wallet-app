import React, { useEffect, useLayoutEffect } from "react";
import { connect } from "react-redux";
import { fetchDataFromUrl } from "../reducers";
import { List, Text, Button } from "react-native-paper";
import { ScrollView, View } from "react-native";

function LoansScreen({ navigation, fetchData, loans }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Loans",
    });
  }, []);

  useEffect(() => {
    fetchData("loans");
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
            My Current Loans
          </Text>
          <Button
            mode="elevated"
            style={{ alignSelf: "center" }}
            onPress={() => {
              navigation.navigate("LoanInputScreen", {});
            }}
          >
            Get Loan
          </Button>
        </View>
        <List.Section>
          <List.Subheader>Your loans</List.Subheader>
          {loans.map((loan) => (
            <List.Item
              key={loan?._id}
              title={`${loan?.name} - Ksh: ${loan?.amount}`}
              description={loan?.description}
              left={(props) => <List.Icon {...props} icon="cash-plus" />}
              // onPress={() => {
              //     navigation.navigate("transactionInputScreen", {
              //         transactionId: loan._id
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
    loans: state.loans,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => {
      dispatch(fetchDataFromUrl(url));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoansScreen);
