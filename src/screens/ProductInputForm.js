import { View, Text, ScrollView, Alert, Image } from "react-native";
import React, { useLayoutEffect, useState, } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextInput, useTheme } from "react-native-paper";
import { handleItemFormSubmit, uploadImageAsync } from "../reducers";
import { connect } from "react-redux";
import * as ImagePicker from 'expo-image-picker';


const defaultValues = {
  name: "",
  description: "",
  quantity: "",
  price: "",
};

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .required("Price is required"),
  quantity: yup
    .number()
    .typeError("Quantity must be a number")
    .required("Quantity is required"),
  description: yup.string().required("Description is required"),
});

const ProductInputForm = ({
  navigation,
  submitForm,
}) => {
  const [productImage, setProductImage] = useState(null);

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
      title: "Product Details",
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
                label="Product Name"
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
                label="Price"
                mode="outlined"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                style={{
                  marginBottom: 10,
                }}
                keyboardType="number-pad"
                error={errors.price ? true : false}
              />
            )}
            name="price"
            rules={{ required: true }}
          />
          {errors.price && (
            <Text
              variant="labelLarge"
              style={{
                color: colors.error,
              }}
            >
              {errors.price.message}
            </Text>
          )}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Quantity"
                mode="outlined"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                style={{
                  marginBottom: 10,
                }}
                keyboardType="number-pad"
                error={errors.price ? true : false}
              />
            )}
            name="quantity"
            rules={{ required: true }}
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
                label="Product Description"
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
          {productImage && <Image source={{ uri: productImage }} style={{ width: 200, height: 200 }} />}
          <Button
            mode="outlined"
            icon={"camera"}
            onPress={async () => {
              // No permissions request is necessary for launching the image library
              let result = await ImagePicker.launchImageLibraryAsync({
                selectionLimit: 1,
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
              });

              console.log(result);

              if (!result.canceled) {
                setProductImage(result.assets[0].uri);
              }
            }}
          >
            Pick Image
          </Button>

          <Button
            mode="contained"
            disabled={isSubmitting}
            style={{
              alignSelf: "center",
              marginTop: 30,
            }}
            onPress={handleSubmit(async (data) => {
              let productObject = { ...data }
              try {
                if (productImage) {
                  const productImageUrl = await uploadImageAsync(productImage);
                  productObject = { ...data, product_image_url: productImageUrl }
                }
                await submitForm(productObject, "products");
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductInputForm);
