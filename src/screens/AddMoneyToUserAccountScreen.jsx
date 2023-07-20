import React, { useEffect, useLayoutEffect } from "react";
import { connect } from "react-redux";
import { Text, Button, TextInput, useTheme } from "react-native-paper";
import { ScrollView, View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateUserProfile } from "../reducers";

const schema = yup.object().shape({
  amount_to_add_to_user_account: yup
    .number()
    .typeError("Amount must be a number")
    .required("Amount is required"),
});

function ProfileScreen({ navigation, users, route, updateUserInfo }) {
  const { userId } = route.params;
  const userProfile = users.find((user) => user._id === userId) || {};

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add Money to User Account",
    });
  }, []);
  const defaultValues = {
    ...userProfile,
    amount_in_account: `${userProfile.amount_in_account}`,
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
              My Profile
            </Text>
          </View>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="First Name"
                mode="outlined"
                editable={false}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                style={{
                  marginBottom: 10,
                }}
                keyboardType="default"
                error={errors.first_name ? true : false}
              />
            )}
            name="first_name"
            rules={{ required: true }}
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Last Name"
                editable={false}
                mode="outlined"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                style={{
                  marginBottom: 10,
                }}
                error={errors.last_name ? true : false}
              />
            )}
            name="last_name"
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Phone Number"
                mode="outlined"
                onBlur={onBlur}
                editable={false}
                onChangeText={(value) => onChange(value)}
                value={value}
                style={{
                  marginBottom: 10,
                }}
                error={errors.phone_number ? true : false}
              />
            )}
            name="phone_number"
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Account Number"
                mode="outlined"
                editable={false}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                style={{
                  marginBottom: 10,
                }}
                error={errors.account_number ? true : false}
              />
            )}
            name="account_number"
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Current Balance"
                mode="outlined"
                editable={false}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                style={{
                  marginBottom: 10,
                }}
                error={errors.amount_in_account ? true : false}
              />
            )}
            name="amount_in_account"
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Amount to Add"
                mode="outlined"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                style={{
                  marginBottom: 10,
                }}
                error={errors.amount_to_add_to_user_account ? true : false}
              />
            )}
            name="amount_to_add_to_user_account"
            rules={{ required: true }}
          />
          {errors.amount_to_add_to_user_account && (
            <Text
              variant="labelLarge"
              style={{
                color: colors.error,
              }}
            >
              {errors.amount_to_add_to_user_account.message}
            </Text>
          )}
          <Button
            mode="contained"
            style={{
              alignSelf: "center",
              marginTop: 30,
            }}
            onPress={handleSubmit(async (data) => {
              const updatedUserInfo = {
                ...data,
                amount_in_account:
                  parseFloat(data.amount_in_account) +
                  parseFloat(data.amount_to_add_to_user_account),
              };
              await updateUserInfo(userProfile.id, updatedUserInfo);
              Alert.alert("Success!", "Amount added successfully");
              navigation.goBack();
            })}
          >
            Add Amount
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserInfo: (userId, userData) => {
      dispatch(updateUserProfile(userId, userData));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
