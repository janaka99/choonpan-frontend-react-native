import { View, Text } from "react-native";
import React from "react";
import { Redirect, Slot, Tabs } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { useOrderContext } from "@/context/order/OrderContext";

const ProtectedLayout = () => {
  const { user } = useAuth();

  if (!user) return <Redirect href="/sign-in" />;

  return <Slot />;
};

export default ProtectedLayout;
