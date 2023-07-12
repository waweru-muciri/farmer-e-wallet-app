import React, { useEffect, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { fetchDataFromUrl } from '../reducers';
import { List } from 'react-native-paper';

function TransactionsScreen({ navigation, fetchData, transactions }) {

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Transactions',
        });
    }, []);

    useEffect(() => {
        fetchData("transactions")
    }, [])

    useEffect(() => {
        fetchData("products")
    }, [])


    return (
        <List.Section>
            <List.Subheader>Your transactions</List.Subheader>
            {
                transactions.map((transaction) => (
                    <List.Item
                        key={transaction?._id}
                        title={`Product : ${transaction.product_name}`}
                        description={`Date: ${transaction.transaction_date}, Amount ${transaction.transaction_amount}`}
                        left={(props) => <List.Icon {...props} icon="cash-remove" />}
                    />))
            }
        </List.Section>
    );
}

const mapStateToProps = (state) => {
    return {
        transactions: state.transactions.map(transaction => {
            const productInTransaction = state.products.find(product => product._id == transaction.product) || {}
            return {
                transaction, product_name: productInTransaction.name,
                transaction_amount: (parseFloat(productInTransaction.price) * parseInt(transaction.quantity))
            }
        }),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => {
            dispatch(fetchDataFromUrl(url))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsScreen);
