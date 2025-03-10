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
import Toast from "react-native-toast-message";
import { Product } from "@/types/types";

type Props = {};
type ActionType = "increase" | "decrease";

const UpdateStock = (props: Props) => {
  const [order, setOrder] = useState<null | {
    location: {
      latitude: number;
      longitude: number;
    };
    orders: {
      productId: string;
      price: number;
      baught: number;
      name: string;
    }[];
  }>({
    location: {
      latitude: 9.9999,
      longitude: 9.9999,
    },
    orders: [],
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<null | string>(
    "server Error Occured Try Again"
  );

  const spinValue = useRef(new Animated.Value(0)).current;

  const loadProducts = async () => {
    setIsLoading(true);
    setOrder({
      location: {
        latitude: 9.9999,
        longitude: 9.9999,
      },
      orders: [],
    });
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

  const updateBaught = (productId: number, action: ActionType) => {
    setOrder((prevOrder: any) => {
      // If there is no prevOrder, create a new order with an empty orders array
      if (!prevOrder) {
        return {
          location: {
            latitude: "0", // Default or fetched latitude
            longitude: "0", // Default or fetched longitude
          },
          orders: [],
        };
      }

      const { location, orders } = prevOrder;

      // Find the product in the products array
      const product = products.find((p) => p.id === productId);
      if (!product) return prevOrder; // Return if product doesn't exist

      // Handle the action based on 'increase' or 'decrease'
      if (action === "increase") {
        // Check if there is enough stock left
        if (product.stock <= 0) {
          Toast.show({
            type: "error",
            text1: "Not enough stock",
          });
          return prevOrder; // Exit if stock is insufficient
        }

        // Check if the product exists in the orders array
        const existingOrder = orders.find(
          (orderItem: any) => orderItem.productId === productId.toString()
        );
        if (existingOrder) {
          // Update the baught count for the product in orders
          existingOrder.baught += 1;
        } else {
          // If product doesn't exist in orders, add it to orders with baught = 1
          orders.push({
            productId: productId.toString(),
            price: product.price,
            baught: 1,
            name: product.name,
          });
        }

        // Decrease stock in products array
        product.stock -= 1;
      } else if (action === "decrease") {
        // Find the existing order for the product
        const existingOrder = orders.find(
          (orderItem: any) => orderItem.productId === productId.toString()
        );
        if (!existingOrder || existingOrder.baught <= 0) {
          return prevOrder; // Exit if there are no units to decrease
        }

        // Decrease the baught count for the product in orders
        existingOrder.baught -= 1;

        // Increase stock in products array
        product.stock += 1;
      }
      console.log(orders, products);
      return { location, orders }; // Return updated order
    });
  };

  const submitOrder = async () => {
    try {
      if (!order || order.orders.length <= 0) {
        return;
      }
      setIsLoading(true);
      const response = await axiosInstance.post(`/order/new`, order);
      if (response.data.error) {
        Toast.show({
          type: "error",
          text1: "Failed to submit order. Please try again.",
        });
      } else {
        Toast.show({
          type: "success",
          text1: "Order submitted successfully",
        });

        setOrder({
          location: {
            latitude: 9.9999,
            longitude: 9.9999,
          },
          orders: [],
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Failed to submit order. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
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
                onClick={submitOrder}
                width="w-2/4"
                disabled={order === null || order.orders.length <= 0}
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
                  <Card
                    key={i}
                    className=" gap-5 items-center justify-center realtive"
                  >
                    <Text className="text-3xl font-Poppins-Medium">
                      {product.name}
                    </Text>
                    <View>
                      <View className="flex-row items-center justify-center rounded-lg bg-white p-2">
                        {/* Minus Button */}
                        <TouchableOpacity
                          // disabled={isSubmitting || value <= 0}
                          onPress={() => updateBaught(product.id, "decrease")}
                          className="bg-gray-200 w-16 aspect-square rounded-full justify-center items-center"
                        >
                          <Text className="text-5xl font-bold">-</Text>
                        </TouchableOpacity>

                        {/* Stock Value */}

                        {(() => {
                          const orderItem = order?.orders.find(
                            (o) => o.productId === product.id.toString()
                          );
                          return (
                            <Text className="px-10 text-2xl font-Poppins-Bold">
                              {orderItem ? orderItem.baught : 0}
                            </Text>
                          );
                        })()}

                        {/* Plus Button */}
                        <TouchableOpacity
                          // disabled={isSubmitting}
                          onPress={() => updateBaught(product.id, "increase")}
                          className=" bg-accent-500 w-16 aspect-square rounded-full justify-center items-center "
                        >
                          <Text className="text-5xl font-bold text-white pt-2">
                            +
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View className="absolute top-4 right-4 flex-row items-center gap-2 bg-green-100 p-1 rounded-md">
                      <Text>Available</Text>
                      <Text>{product.stock}</Text>
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
