import { View, Text, ScrollView } from "react-native";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Redirect, Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {};

const NormalLayout = (props: Props) => {
  const { user } = useAuth();
  return user ? <Redirect href="/" /> : <Slot />;
};

export default NormalLayout;
