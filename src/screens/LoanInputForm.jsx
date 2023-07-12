import { View, Text, ScrollView, Alert } from "react-native";
import React, { useLayoutEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextInput, useTheme } from "react-native-paper";
import { PaperSelect } from "react-native-paper-select";
import { handleItemFormSubmit } from "../reducers";
import { connect } from "react-redux";

const defaultValues = {
  account: "",
  name: "",
  description: "",
  amount: "",
};

const schema = yup.object().shape({
  account: yup.object().required("Account is required"),
  name: yup.string().required("Name is required"),
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .required("Amount is required"),
  description: yup.string().required("Description is required"),
});

const LoanInputForm = ({ navigation, accounts, submitForm }) => {
  const { colors } = useTheme();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Loan Details",
    });
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <ScrollView>
        <View
          style={{
            flex: 1,
            padding: 20,
            justifyContent: "center",
            gap: 15,
          }}
        >
          <Controller
            control={control}
            render={({ field: { value } }) => (
              <PaperSelect
                label="Select Account"
                value={value?.value}
                onSelection={(selectedValue) => {
                  setValue("account", selectedValue.selectedList?.[0]);
                }}
                arrayList={[...accounts]}
                selectedArrayList={[value]}
                errorText={errors.account?.message}
                multiEnable={false}
              />
            )}
            name="account"
            rules={{ required: true }}
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Name"
                mode="outlined"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                style={{
                  marginBottom: 10,
                }}
                keyboardType="default"
                error={errors.name ? true : false}
              />
            )}
            name="name"
            rules={{ required: true }}
          />
          {errors.name && (
            <Text
              variant="labelLarge"
              style={{
                color: colors.error,
              }}
            >
              {errors.name.message}
            </Text>
          )}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Amount to borrow"
                mode="outlined"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                style={{
                  marginBottom: 10,
                }}
                keyboardType="phone-pad"
                error={errors.amount ? true : false}
              />
            )}
            name="amount"
            rules={{ required: true }}
          />
          {errors.amount && (
            <Text
              variant="labelLarge"
              style={{
                color: colors.error,
              }}
            >
              {errors.amount.message}
            </Text>
          )}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Description of the loan"
                mode="outlined"
                onBlur={onBlur}
                multiline={true}
                numberOfLines={4}
                onChangeText={(value) => onChange(value)}
                value={value}
                style={{
                  marginBottom: 10,
                }}
                error={errors.description ? true : false}
              />
            )}
            name="description"
            rules={{ required: true }}
          />
          {errors.description && (
            <Text
              variant="labelLarge"
              style={{
                color: colors.error,
              }}
            >
              {errors.description.message}
            </Text>
          )}

          <Button
            mode="contained"
            disabled={isSubmitting}
            style={{
              alignSelf: "center",
              marginTop: 30,
            }}
            onPress={handleSubmit(async (data) => {
              const { account } = data;
              const dateOfBorrowing = new Date().toLocaleDateString();
              const loanToSave = {
                ...data,
                dateOfBorrowing,
              };
              //JUST INCREASE THE AMOUNT IN THE SELECTED ACCOUNT AND ITS GOOD.
              const updatedAccount = {
                ...account,
                available_amount:
                  parseFloat(account.available_amount) + parseFloat(data.amount),
              };
              try {
                await submitForm(loanToSave, "loans");
                await submitForm(updatedAccount, "accounts");
                Alert.alert("Success!", "Item saved successfully");
                navigation.goBack();
              } catch (error) {
                console.error(error);
              }
            })}
          >
            Save
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return {
    accounts: state.accounts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitForm: (url, data) => {
      dispatch(handleItemFormSubmit(url, data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoanInputForm);