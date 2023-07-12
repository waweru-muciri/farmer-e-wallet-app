import React, { useEffect, useLayoutEffect } from "react";
import { connect } from "react-redux";
import { fetchDataFromUrl } from "../reducers";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Card, useTheme } from "react-native-paper";

function ProductsScreen({ navigation, fetchData, products }) {
  const { colors } = useTheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Products",
    });
  }, []);

  useEffect(() => {
    fetchData("products");
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
          {products.map((product) => (
            <Card key={product._id} style={{marginBottom: 15 }}>
              <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
              <Card.Title title={product.name} />
              <Card.Content>
                <Text variant="bodyMedium">Price : {product.price}</Text>
                <Text variant="titleLarge">{product.description}</Text>
              </Card.Content>
              <Card.Actions>
                <Button
                  onPress={() => {
                    navigation.navigate("TransactionInputScreen", {
                      productId: product._id,
                    });
                  }}
                >
                  Buy
                </Button>
              </Card.Actions>
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => {
      dispatch(fetchDataFromUrl(url));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsScreen);
