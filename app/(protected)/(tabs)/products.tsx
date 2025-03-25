import {
  View,
  Text,
  ScrollView,
  Animated,
  Easing,
  RefreshControl,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { SafeAreaView } from "react-native-safe-area-context";
import { Loader2, LoaderPinwheel } from "lucide-react-native";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import images from "@/constants/icons";
import AddStockCard from "@/components/AddStockCard";
import SectionTitle from "@/components/SectionTitle";
import Toast from "react-native-toast-message";

type Props = {};

const products = (props: Props) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isStockResetting, setIsStockResetting] = useState(false);
  const [error, setError] = useState<null | string>(
    "server Error Occured Try Again"
  );

  const spinValue = useRef(new Animated.Value(0)).current;

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
  const startSpinning = () => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000, // 1 second for a full rotation
        easing: Easing.linear,
        useNativeDriver: true, // Improves performance
      })
    ).start();
  };

  useEffect(() => {
    loadProducts();
    startSpinning();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadProducts();
    setRefreshing(false);
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  if (isLoading) {
    return (
      <View className="h-full flex justify-center items-center">
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
          <Loader2 color="#F1720C" size={40} />
        </Animated.View>
      </View>
    );
  }

  return (
    <SafeAreaView className="h-full pb-[75px] ">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          gap: 6,
          backgroundColor: "#f7f7f7",
          marginBottom: 80,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {error ? (
          <View className="w-full flex-grow justify-center items-center gap-2">
            <Text className="text-lg">{error}</Text>
            <CustomButton
              text="Refresh"
              onClick={loadProducts}
              width="w-fit"
              varient="small_accent"
            />
          </View>
        ) : (
          <View>
            <View className="px-8 pt-5">
              <SectionTitle title="All products" icon={images.ProductsIcon} />
            </View>
            <View className="px-8 pt-5">
              <CustomButton
                varient="small_accent"
                text="Reset Stock"
                onClick={resetProducts}
                width="w-full"
                disabled={isStockResetting}
              />
            </View>
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default products;
