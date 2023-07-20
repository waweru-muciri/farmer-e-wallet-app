import React, { useLayoutEffect, useEffect, useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { connect } from 'react-redux';
import { handleItemFormSubmit, updateUserProfile } from '../reducers';
import { TextInput, Text, Button, useTheme } from 'react-native-paper';
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { fetchDataFromUrl } from "../reducers";


const transactionSchema = yup.object().shape({
    quantity: yup.number().typeError("Quantity must be a number").required("Quantity is required"),
    description: yup.string(),
});

function TransactionInputScreen({ navigation, route, submitForm, products, userProfile,
    updateUserInfo, fetchData }) {
    const { productId } = route.params;
    const { colors } = useTheme()
    const productToDisplay = products.find((product) => product._id == productId) || {}

    const defaultValues = {
        account: "",
        description: '',
        quantity: "1",
        product: productToDisplay._id,
        transaction_amount: productToDisplay.price,
        transaction_date: new Date().toLocaleDateString()
    }

    const {
        control,
        handleSubmit,
        setValue,
        setError,
        formState: { errors },
    } = useForm({
        defaultValues,
        resolver: yupResolver(transactionSchema),
    });

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Transaction Details',
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
                    justifyContent: "space-evenly",
                }}
            >
                <Text variant="titleLarge">Transaction Details</Text>
                <Text variant="titleMedium">Product Name : {productToDisplay.name}</Text>
                <Text variant="titleMedium">Product Price : {productToDisplay.price}</Text>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            label="Product Quantity"
                            mode="outlined"
                            onBlur={onBlur}
                            onChangeText={(value) => onChange(value)}
                            value={value}
                            style={{
                                marginBottom: 10, marginTop: 20
                            }}
                            keyboardType="phone-pad"
                            error={errors.quantity ? true : false}
                        />
                    )}
                    name="quantity"
                />
                {errors.quantity && (
                    <Text
                        variant="labelLarge"
                        style={{
                            color: colors.error,
                        }}
                    >
                        {errors.quantity.message}
                    </Text>
                )}
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            label="Transaction Description"
                            mode="outlined"
                            onBlur={onBlur}
                            multiline
                            numberOfLines={3}
                            onChangeText={(value) => onChange(value)}
                            value={value}
                            style={{
                                marginBottom: 10,
                            }}
                            keyboardType="default"
                            error={errors.description ? true : false}
                        />
                    )}
                    name="description"
                />
                <View style={{ margin: 10, padding: 20 }}>
                    <Button mode="contained" onPress={handleSubmit(async (data) => {
                        const { account, product, description, quantity, transaction_date } = data
                        const transactionToSave = {
                            product, description, quantity, transaction_date, account
                        }
                        //JUST DECREASE THE AMOUNT IN THE SELECTED ACCOUNT AND ITS GOOD.
                        const CURRENT_AMOUNT_IN_ACCOUNT = parseFloat(
                            userProfile.amount_in_account
                          );
                          const PRODUCT_COST = (parseFloat(product.price) * parseInt(quantity));
                          const TOTAL_AMOUNT_IN_ACCOUNT =
                            CURRENT_AMOUNT_IN_ACCOUNT - PRODUCT_COST;
                          const updatedProfile = {
                            ...userProfile,
                            amount_in_account: TOTAL_AMOUNT_IN_ACCOUNT,
                          };
                        try {
                            submitForm(transactionToSave, "transactions")
                            await updateUserInfo(userProfile.id, updatedProfile);
                            Alert.alert("Success!", "Item saved successfully");
                            navigation.goBack();
                        } catch (error) {
                            console.error(error);
                        }
                    })}>
                        Save
                    </Button>
                </View>
            </View>
        </ScrollView>
    );
}


const mapStateToProps = (state) => {
    return {
        products: state.products,
        userProfile: state.auth.user,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        submitForm: (url, data) => {
            dispatch(handleItemFormSubmit(url, data))
        },
        fetchData: (url) => {
            dispatch(fetchDataFromUrl(url));
        },
        updateUserInfo: (userId, userData) => {
            dispatch(updateUserProfile(userId, userData));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionInputScreen);
