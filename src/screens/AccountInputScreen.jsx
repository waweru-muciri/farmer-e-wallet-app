import { View, Text, ScrollView } from "react-native";
import React, { useLayoutEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextInput, useTheme } from "react-native-paper";
import { handleItemFormSubmit } from "../reducers";
import { connect } from "react-redux";

const schema = yup.object().shape({
  value: yup.string().required("Name of account is required"),
  description: yup.string().required("Description is required"),
  account_number: yup.string().required("Account number is required"),
});

const AccountInputForm = ({ navigation, accounts, route, submitForm }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Account Details",
    });
  }, []);

  const { accountId } = route?.params;
  const accountToDisplay =
    accounts.find((account) => account._id == accountId) || {};

  const defaultValues = {
    id: accountToDisplay._id,
    description: accountToDisplay.description,
    account_number: accountToDisplay.account_number,
    value: accountToDisplay.value,
  };

  const onSubmit = (data) => {
    const dateCreated = new Date().toLocaleDateString();
    const accountToSave = {
      ...data,
      dateCreated,
      available_amount: accountToDisplay.available_amount || 0,
    };
    submitForm(accountToSave, "accounts");
  };

  const { colors } = useTheme();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

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
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Account Name"
                mode="outlined"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                style={{
                  marginBottom: 10,
                }}
                keyboardType="default"
                error={errors.value ? true : false}
              />
            )}
            name="value"
            rules={{ required: true }}
          />
          {errors.value && (
            <Text
              variant="labelLarge"
              style={{
                color: colors.error,
              }}
            >
              {errors.value.message}
            </Text>
          )}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Account number"
                mode="outlined"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                style={{
                  marginBottom: 10,
                }}
                error={errors.description ? true : false}
              />
            )}
            name="account_number"
            rules={{ required: true }}
          />
          {errors.account_number && (
            <Text
              variant="labelLarge"
              style={{
                color: colors.error,
              }}
            >
              {errors.account_number.message}
            </Text>
          )}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Description of the account"
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
            style={{
              marginTop: 30,
              alignSelf: "center"
            }}
            onPress={handleSubmit(onSubmit)}
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountInputForm);
