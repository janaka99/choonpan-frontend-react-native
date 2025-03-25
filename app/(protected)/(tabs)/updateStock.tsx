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
import { Redirect, router } from "expo-router";
import images from "@/constants/icons";
import AddStockCard from "@/components/AddStockCard";
import SectionTitle from "@/components/SectionTitle";
import Card from "@/components/Card";
import Toast from "react-native-toast-message";
import { Product } from "@/types/types";
import { useAuth } from "@/context/AuthContext";
import { useLocationContext } from "@/context/liveLocationContext";
import { useNotificationContext } from "@/context/NotificationContext";

type Props = {};
type ActionType = "increase" | "decrease";

const UpdateStock = (props: Props) => {
  const { user: loggedUser } = useAuth();

  const { liveLocation, getLiveLocation } = useLocationContext();
  const { getUnreadNotificationCount, getAllNotifications } =
    useNotificationContext();

  if (!loggedUser || !loggedUser.id) {
    return <Redirect href="/" />;
  }

  const [order, setOrder] = useState<null | {
    user: {
      id: string;
      bakery_id: string | null;
    };
    orders: {
      productId: string;
      price: number;
      baught: number;
      name: string;
    }[];
  }>({
    user: {
      id: loggedUser.id,
      bakery_id: loggedUser.bakery?.id || null,
    },
    orders: [],
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<null | string>(
    "server Error Occured Try Again"
  );
  const [orderFilling, setOrderFilling] = useState(false);
  const [isStockResetting, setIsStockResetting] = useState(false);

  const loadProducts = async () => {
    setIsLoading(true);
    setOrder({
      user: {
        id: loggedUser.id,
        bakery_id: loggedUser.bakery?.id || null,
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
        resetOrder();
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

  useEffect(() => {
    loadProducts();
  }, []);

  const resetOrder = () => {
    setOrder({
      user: {
        id: loggedUser.id,
        bakery_id: loggedUser.bakery?.id || null,
      },
      orders: [],
    });
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadProducts();
    setRefreshing(false);
  };

  const updateBaught = (productId: number, action: ActionType) => {
    setOrder((prevOrder: any) => {
      if (!prevOrder) {
        return {
          user: {
            id: loggedUser.id,
            bakery_id: loggedUser.bakery?.id || null,
          },
          orders: [],
        };
      }

      const { orders, user } = prevOrder;

      const product = products.find((p) => p.id === productId);
      if (!product) return prevOrder;

      if (action === "increase") {
        if (product.stock <= 0) {
          Toast.show({
            type: "error",
            text1: "Not enough stock",
          });
          return prevOrder;
        }

        const existingOrder = orders.find(
          (orderItem: any) => orderItem.productId === productId.toString()
        );
        if (existingOrder) {
          existingOrder.baught += 1;
        } else {
          orders.push({
            productId: productId.toString(),
            price: product.price,
            baught: 1,
            name: product.name,
          });
        }

        product.stock -= 1;
      } else if (action === "decrease") {
        const existingOrder = orders.find(
          (orderItem: any) => orderItem.productId === productId.toString()
        );
        if (!existingOrder || existingOrder.baught <= 0) {
          return prevOrder;
        }
        existingOrder.baught -= 1;
        product.stock += 1;
      }
      return { user, orders };
    });
  };

  const submitOrder = async () => {
    try {
      if (!liveLocation) {
        await getLiveLocation();
      }
      if (!order || order.orders.length <= 0) {
        return;
      }
      setOrderFilling(true);
      const response = await axiosInstance.post(`/employee/order/new`, {
        location: liveLocation,
        user: order.user,
        orders: order.orders,
      });
      if (response.data.error) {
        Toast.show({
          type: "error",
          text1: "Failed to submit order. Please try again.",
        });
      } else {
        Toast.show({
          type: "success",
          text1: "Order has been completed",
        });
        resetOrder();
        getUnreadNotificationCount();
        getAllNotifications();
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Failed to submit order. Please try again.",
      });
    } finally {
      setOrderFilling(false);
    }
  };

  if (isLoading) {
    return (
      <View className="h-full flex justify-center items-center bg-transparent">
        <View className="animate-spin">
          <Loader2 color="#F1720C" size={40} />
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView className="h-full  relative">
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
          <View className="w-full flex-grow justify-center items-center gap-2 ">
            <Text className="text-lg">{error}</Text>
            <CustomButton
              text="Refresh"
              onClick={loadProducts}
              width="w-fit"
              varient="small_accent"
              disabled={orderFilling || isStockResetting}
            />
          </View>
        ) : (
          <View className="pb-[85px]">
            <View className="mt-5 px-10   justify-start w-full items-start">
              <TouchableOpacity
                onPress={() => {
                  if (router.canGoBack()) {
                    router.back();
                  } else {
                    router.replace("/");
                  }
                }}
                className="h-12 rounded-full aspect-square bg-accent-500 flex justify-start items-center mb-5"
              >
                <View className="h-full w-full flex justify-center items-center">
                  <ChevronLeft size={32} color="#ffffff" />
                </View>
              </TouchableOpacity>

              <View className="flex-row gap-5">
                <CustomButton
                  varient="small_accent"
                  text="Place Order"
                  onClick={submitOrder}
                  width="w-full"
                  disabled={
                    order === null ||
                    order.orders.length <= 0 ||
                    orderFilling ||
                    isStockResetting
                  }
                />
              </View>
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
                    className=" gap-5 items-center justify-center realtive "
                  >
                    <Text className="text-3xl font-Poppins-Medium mt-6">
                      {product.name}
                    </Text>
                    <View>
                      <View className="flex-row items-center justify-center rounded-lg bg-white p-2 ">
                        <TouchableOpacity
                          onPress={() => updateBaught(product.id, "decrease")}
                          disabled={orderFilling || isStockResetting}
                          className="bg-gray-200 w-16 aspect-square rounded-full justify-center items-center"
                        >
                          <Text className="text-5xl font-bold">-</Text>
                        </TouchableOpacity>
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

                        <TouchableOpacity
                          onPress={() => updateBaught(product.id, "increase")}
                          disabled={orderFilling || isStockResetting}
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
