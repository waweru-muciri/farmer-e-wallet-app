import React, { useLayoutEffect, useEffect } from 'react';
import { Text, Card, Button } from 'react-native-paper';
import { ScrollView, View, } from 'react-native';
import { connect } from 'react-redux';
import { fetchDataFromUrl } from "../reducers";

function HomeScreen({ navigation, user, accounts, fetchData }) {

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Home',
    });
  }, []);

  useEffect(() => {
    fetchData("accounts");
  }, []);


  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          padding: 20,
          justifyContent: "center",
        }}
      >
        <Text variant='titleLarge' style={{ fontWeight: "bold" }}> Welcome {user?.displayName}</Text>
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            flexDirection: "row",
            marginBottom: 10
          }}>
          <Text variant='titleLarge' style={{ fontWeight: "bold", textAlign: "center", margin: 10 }}> My accounts</Text>
          <Button mode="elevated" style={{ alignSelf: 'center' }}
            onPress={() => {
              navigation.navigate("AccountInputScreen", {});
            }}
          >
            Add Account
          </Button>
        </View>
        {accounts.map((account) => (
          <Card key={account._id} style={{marginBottom: 15 }} onPress={() => {
            navigation.navigate("AccountInputScreen", { accountId: account._id });
          }}>
            <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
            <Card.Title title={account.value} />
            <Card.Content>
              <Text variant="bodyMedium">Available Amount : {account.available_amount}</Text>
              <Text variant="bodyMedium"> Account number : {account.account_number}</Text>
              <Text variant="bodyMedium"> Account details : {account.description}</Text>
            </Card.Content>
          </Card>
        ))}
      </View>
    </ScrollView >
  );
}

const mapStateToProps = (state) => ({
  user: state.auth?.user,
  accounts: state.accounts,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => {
      dispatch(fetchDataFromUrl(url));
    },
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
