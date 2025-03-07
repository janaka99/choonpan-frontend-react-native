import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { Link, router } from "expo-router";
import H2Text from "./H2Text";

type Props = {
  title: string;
};

const MapHeader = ({ title }: Props) => {
  const { user } = useAuth();
  const firstCharacter = user.name ? user.name.charAt(0) : "M";
  return (
    <View className="mt-5 px-10 absolute top-0 left-0 z-10 flex-row justify-between w-full items-center">
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

      <Text className="text-2xl font-Poppins-Bold">{title}</Text>

      <View className="w-14 aspect-square rounded-full bg-accent-500 flex justify-center items-center ">
        <Text
          className="uppercase font-Poppins-Medium text-white pt-1"
          style={{
            fontSize: 26,
          }}
        >
          {firstCharacter}
        </Text>
      </View>
    </View>
  );
};

export default MapHeader;
