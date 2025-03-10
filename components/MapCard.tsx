import React, { useEffect, useState } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import Card from "./Card";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import FeatherIcon from "react-native-vector-icons/Feather";
import Icon from "react-native-vector-icons/MaterialIcons";
import { ChevronRight } from "lucide-react-native";
import { Link, Redirect } from "expo-router";
import { useOrderContext } from "@/context/order/OrderContext";
import MapViewComponent from "./MapView";

export default function MapCard() {
  return (
    <Card className=" w-full  ">
      <View className="flex-row justify-between items-center pl-2 mb-5">
        <Text className="font-Poppins-Bold text-3xl  text-gray-100 capitalize w-fit">
          ROUTES
        </Text>
        <Link
          href="/selectRoute"
          className="w-14 aspect-square bg-accent-500 rounded-full justify-center items-center pl-1 "
        >
          <View className="h-full w-full flex justify-center items-center">
            <ChevronRight size={32} color="#ffffff" />
          </View>
        </Link>
      </View>
      <View className="rounded-xl overflow-hidden w-full aspect-square">
        <MapViewComponent />
      </View>
    </Card>
  );
}
