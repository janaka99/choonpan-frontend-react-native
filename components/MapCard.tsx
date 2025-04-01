import React from "react";
import Card from "./Card";
import { Text, View } from "react-native";
import { ChevronRight } from "lucide-react-native";
import { Link } from "expo-router";
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
