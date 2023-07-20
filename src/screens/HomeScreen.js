import React, { useLayoutEffect, useEffect } from 'react';
import { Text } from 'react-native-paper';
import { Dimensions, ScrollView, View, } from 'react-native';
import { connect } from 'react-redux';
import { fetchDataFromUrl } from "../reducers";
import { PieChart, LineChart } from "react-native-chart-kit";
import { SafeAreaView } from "react-native-safe-area-context";

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};


function HomeScreen({ navigation, user, accounts, fetchData, products,
  transactions, deposits, loans, withdrawals }) {

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Home',
    });
  }, []);

  useEffect(() => {
    fetchData("products");
  }, []);
  useEffect(() => {
    fetchData("accounts");
  }, []);
  useEffect(() => {
    fetchData("transactions");
  }, []);
  useEffect(() => {
    fetchData("deposits");
  }, []);
  useEffect(() => {
    fetchData("loans");
  }, []);
  useEffect(() => {
    fetchData("withdrawals");
  }, []);

  const TRANSACTIONS_PIE_CHART_DATA = {
    name: "Transactions",
    value: transactions.reduce((totalValue, transaction) => {
      const productInTransaction = products.find(product => product._id == transaction.product) || {}
      return productInTransaction.price ? totalValue + (parseFloat(productInTransaction.price) * parseInt(transaction.quantity)) : totalValue
    }, 0),
    color: "rgba(131, 167, 234, 1)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  }
  const LOANS_PIE_CHART_DATA = {
    name: "Loans",
    value: loans.reduce((totalValue, loan) => {
      return totalValue + (parseFloat(loan.amount))
    }, 0),
    color: "#F02",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  }
  const SAVINGS_PIE_CHART_DATA = {
    name: "Savings",
    value: deposits.reduce((totalValue, deposit) => {
      return totalValue + (parseFloat(deposit.amount))
    }, 0),
    color: "rgb(0, 0, 255)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  }
  const WITHDRAWALS_PIE_CHART_DATA = {
    name: "Withdrawals",
    value: withdrawals.reduce((totalValue, withdrawal) => {
      return totalValue + (parseFloat(withdrawal.amount))
    }, 0),
    color: "#ffffff",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  }

  const pieChartData = [TRANSACTIONS_PIE_CHART_DATA, LOANS_PIE_CHART_DATA, SAVINGS_PIE_CHART_DATA, WITHDRAWALS_PIE_CHART_DATA]

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <ScrollView>
        <View
          style={{
            flex: 1,
            padding: 20,
            justifyContent: "center",
          }}
        >
          <Text variant='titleLarge' style={{ fontWeight: "bold" }}> Welcome, {user?.first_name}</Text>
          <View
            style={{
              flex: 1,
              justifyContent: "space-between",
              flexDirection: "row",
              marginBottom: 10
            }}>
            <Text variant='titleLarge' style={{ fontWeight: "bold", textAlign: "center", margin: 10 }}> My account</Text>
          </View>
          <View>
            <PieChart data={pieChartData} chartConfig={chartConfig} accessor='value'
              width={Dimensions.get("window").width} height={220}
              backgroundColor={"transparent"}
            />
          </View>
          <ScrollView horizontal>
            <LineChart
              data={{
                labels: ["January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December"],
                datasets: [
                  {
                    data: [
                      parseInt(Math.random() * 10) * 1000,
                      parseInt(Math.random() * 10) * 1000,
                      parseInt(Math.random() * 10) * 1000,
                      parseInt(Math.random() * 10) * 1000,
                      parseInt(Math.random() * 10) * 1000,
                      parseInt(Math.random() * 10) * 1000,
                      parseInt(Math.random() * 10) * 1000,
                      parseInt(Math.random() * 10) * 1000,
                      parseInt(Math.random() * 10) * 1000,
                      parseInt(Math.random() * 10) * 1000,
                      parseInt(Math.random() * 10) * 1000,
                      parseInt(Math.random() * 10) * 1000,
                    ]
                  }
                ]
              }}
              width={Dimensions.get("window").width * 2} // from react-native
              height={400}
              yAxisLabel="Ksh"
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#2a52be",
                backgroundGradientTo: "#002D62",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726"
                }
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16
              }}
            />
          </ScrollView>
        </View>
      </ScrollView >
    </SafeAreaView >
  );
}

const mapStateToProps = (state) => ({
  user: state.auth?.user,
  accounts: state.accounts,
  products: state.products,
  loans: state.loans,
  deposits: state.deposits,
  withdrawals: state.withdrawals,
  transactions: state.transactions,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => {
      dispatch(fetchDataFromUrl(url));
    },
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
