import React, { useEffect, useLayoutEffect } from "react";
import { connect } from "react-redux";
import { fetchDataFromUrl } from "../reducers";
import { Text, Button, TextInput, useTheme } from "react-native-paper";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { handleItemFormSubmit } from "../reducers";


const defaultValues = {
  first_name: "",
  last_name: "",
  phone_number: "",
};

const schema = yup.object().shape({
  first_name: yup.string().required("First Name is required"),
  phone_number: yup.string().required("Phone Number is required"),
  last_name: yup.string().required("Last Name is required"),
});

function ProfileScreen({ navigation, fetchData, users }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "User Profile",
    });
  }, []);

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

  useEffect(() => {
    fetchData("loans");
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
          {errors.first_name && (
            <Text
              variant="labelLarge"
              style={{
                color: colors.error,
              }}
            >
              {errors.first_name.message}
            </Text>
          )}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Last Name"
                mode="outlined"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                style={{
                  marginBottom: 10,
                }}
                error={errors.first_name ? true : false}
              />
            )}
            name="first_name"
            rules={{ required: true }}
          />
          {errors.first_name && (
            <Text
              variant="labelLarge"
              style={{
                color: colors.error,
              }}
            >
              {errors.first_name.message}
            </Text>
          )}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Phone Number"
                mode="outlined"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                style={{
                  marginBottom: 10,
                }}
                error={errors.phone_number ? true : false}
              />
            )}
            name="phone_number"
            rules={{ required: true }}
          />
          {errors.phone_number && (
            <Text
              variant="labelLarge"
              style={{
                color: colors.error,
              }}
            >
              {errors.phone_number.message}
            </Text>
          )}

          <Button
            mode="contained"
            style={{
              alignSelf: "center",
              marginTop: 30,
            }}
            onPress={handleSubmit((data) => {
              submitForm(data, "users");
            })}
          >
            Save Profile
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
    fetchData: (url) => {
      dispatch(fetchDataFromUrl(url));
    },
    submitForm: (url, data) => {
        dispatch(handleItemFormSubmit(url, data));
      },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
