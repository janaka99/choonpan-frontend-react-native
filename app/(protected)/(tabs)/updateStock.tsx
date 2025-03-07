import {
  View,
  Text,
  ScrollView,
  Animated,
  Easing,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft, Loader2, LoaderPinwheel } from "lucide-react-native";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import images from "@/constants/icons";
import AddStockCard from "@/components/AddStockCard";
import SectionTitle from "@/components/SectionTitle";
import Card from "@/components/Card";

type Props = {};

const UpdateStock = (props: Props) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<null | string>(
    "server Error Occured Try Again"
  );

  const spinValue = useRef(new Animated.Value(0)).current;

  const loadProducts = async () => {
    setIsLoading(true);
    await getProducts();
    setIsLoading(false);
  };

  const getProducts = async () => {
    try {
      setError(null);
      setProducts([]);
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
    <SafeAreaView className="h-full ">
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
            <View className="mt-5 px-10  flex-row justify-between w-full items-center">
              <TouchableOpacity
                onPress={() => {
                  if (router.canGoBack()) {
                    router.back();
                  } else {
                    router.replace("/");
                  }
                }}
                className="h-12 rounded-full aspect-square bg-accent-500 flex justify-center items-center"
              >
                <View className="h-full w-full flex justify-center items-center">
                  <ChevronLeft size={32} color="#ffffff" />
                </View>
              </TouchableOpacity>

              <CustomButton
                varient="small_accent"
                text="Update"
                width="w-2/4"
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
                  <Card className=" gap-5 items-center justify-center">
                    <Text className="text-3xl font-Poppins-Medium">
                      {product.name}
                    </Text>
                    <View>
                      <View className="flex-row items-center justify-center rounded-lg bg-white p-2">
                        {/* Minus Button */}
                        <TouchableOpacity
                          // disabled={isSubmitting || value <= 0}
                          // onPress={() => onChange(Math.max(0, value - 1))}
                          className="bg-gray-200 w-16 aspect-square rounded-full justify-center items-center"
                        >
                          <Text className="text-5xl font-bold">-</Text>
                        </TouchableOpacity>

                        {/* Stock Value */}

                        <Text className="px-10 text-2xl font-Poppins-Bold">
                          0
                        </Text>

                        {/* Plus Button */}
                        <TouchableOpacity
                          // disabled={isSubmitting}
                          // onPress={() => onChange(value + 1)}
                          className=" bg-accent-500 w-16 aspect-square rounded-full justify-center items-center "
                        >
                          <Text className="text-5xl font-bold text-white pt-2">
                            +
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <Text className="text-2xl font-Poppins-Medium">
                      LKR {product.price}
                    </Text>
                  </Card>
                ))}
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpdateStock;
