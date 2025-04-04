import { View, Text, ScrollView, RefreshControl } from "react-native";
import React, { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { SafeAreaView } from "react-native-safe-area-context";
import { Loader2 } from "lucide-react-native";
import CustomButton from "@/components/CustomButton";
import { router, useFocusEffect } from "expo-router";
import images from "@/constants/icons";
import AddStockCard from "@/components/AddStockCard";
import SectionTitle from "@/components/SectionTitle";
import Toast from "react-native-toast-message";

const products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isStockResetting, setIsStockResetting] = useState(false);
  const [error, setError] = useState<null | string>(
    "server Error Occured Try Again"
  );

  const loadProducts = async () => {
    setIsLoading(true);
    await getProducts();
    setIsLoading(false);
  };

  const resetProducts = async () => {
    try {
      setIsStockResetting(true);
      const res = await axiosInstance.post("/employee/products/reset");
      if (res.data.error) {
        Toast.show({
          type: "error",
          text1: res.data.message || "Error",
        });
      } else {
        Toast.show({
          type: "success",
          text1: res.data.message || "Error",
        });
        loadProducts();
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Server error occured, Please try again later",
      });
    } finally {
      setIsStockResetting(false);
    }
  };

  const getProducts = async () => {
    try {
      setError(null);
      const response = await axiosInstance.get(`/products/all`);
      if (response.data.error) {
        setError("server Error Occured Try Again");
      } else {
        if (response.data.products) {
          setProducts(response.data.products);
        } else {
          setProducts([]);
        }
      }
    } catch (error) {
      setError("server Error Occured Try Again");
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadProducts();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadProducts();
    setRefreshing(false);
  };

  if (isLoading) {
    return (
      <View className="h-full flex justify-center items-center">
        <View className="animate-spin">
          <Loader2 color="#F1720C" size={40} className="animate-spin" />
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView className="h-full pb-[75px] bg-[#f7f7f7] ">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          gap: 6,
          backgroundColor: "#f7f7f7",
          marginBottom: 80,
        }}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }
      >
        <View>
          <View className="px-8 pt-5">
            <SectionTitle
              title="All products"
              icon={images.ProductsIcon}
              backLink="/dashboard-landing"
            />
          </View>
          {error ? (
            <View className="w-full h-full justify-center items-center gap-2">
              <Text className="text-lg">Oops! Something Went Wrong!</Text>
              <CustomButton
                text="Refresh"
                onClick={loadProducts}
                width="w-fit"
                varient="small_accent"
              />
            </View>
          ) : (
            <View className="h-full">
              {products && products.length > 0 ? (
                <View className="px-8 pt-5">
                  <CustomButton
                    varient="small_accent"
                    text="Reset Stock"
                    onClick={resetProducts}
                    width="w-full"
                    disabled={isStockResetting}
                  />
                </View>
              ) : (
                <></>
              )}
              {products && products.length <= 0 ? (
                <View className="h-full flex justify-center items-center gap-3">
                  <Text className="text-lg">No products available</Text>
                  <CustomButton
                    text="Add product"
                    width="w-fit"
                    onClick={() => {
                      router.push("/dashboard-landing");
                    }}
                    varient="small_accent"
                  />
                </View>
              ) : (
                <View className="px-8 pt-8 gap-8">
                  {products.map((product: any, i) => (
                    <AddStockCard
                      update
                      product={product}
                      key={i}
                      getProducts={getProducts}
                    />
                  ))}
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default products;
