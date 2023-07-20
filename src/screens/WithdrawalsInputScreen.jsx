import React, { useLayoutEffect } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextInput, useTheme } from "react-native-paper";
import { handleItemFormSubmit, updateUserProfile } from "../reducers";
import { connect } from "react-redux";

const defaultValues = {
  name: "",
  description: "",
  amount: "",
};

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .required("Amount is required"),
  description: yup.string().required("Description is required"),
});

const WithdrawalInputForm = ({
  navigation,
  userProfile,
  updateUserInfo,
  submitForm,
}) => {
  const { colors } = useTheme();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Withdraw To Mpesa",
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
                label="Amount to withdraw"
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
                label="Description of the withdrawal"
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
            }}
            onPress={handleSubmit(async (data) => {
              const { account } = data;
              const dateOfWithdrawal = new Date().toLocaleDateString();
              const withdrawalToSave = {
                ...data,
                dateOfWithdrawal,
              };
              //JUST DECREASE THE AMOUNT IN THE SELECTED ACCOUNT AND ITS GOOD.
              const CURRENT_AMOUNT_IN_ACCOUNT = parseFloat(
                userProfile.amount_in_account
              );
              const WITHDRAWN_AMOUNT = parseFloat(data.amount);
              const TOTAL_AMOUNT_IN_ACCOUNT =
                CURRENT_AMOUNT_IN_ACCOUNT - WITHDRAWN_AMOUNT;
              const updatedProfile = {
                ...userProfile,
                amount_in_account: TOTAL_AMOUNT_IN_ACCOUNT,
              };
              try {
                await submitForm(withdrawalToSave, "withdrawals");
                await updateUserInfo(userProfile.id, updatedProfile);
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
    userProfile: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitForm: (url, data) => {
      dispatch(handleItemFormSubmit(url, data));
    },
    updateUserInfo: (userId, userData) => {
      dispatch(updateUserProfile(userId, userData));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithdrawalInputForm);
