import { View, Text, Image } from "react-native";
import React from "react";
import images from "@/constants/icons";
import CustomButton from "./CustomButton";
import { useOrderContext } from "@/context/order/OrderContext";
import { Link } from "expo-router";

type Props = {};

export const SelectRouteButton = () => {
  return (
    <View className="w-full absolute bottom-0 left-0 bg-white px-10 py-12 rounded-t-3xl">
      <View className="flex-row justify-center items-center gap-2">
        <View className="w-6 rounded-full aspect-square bg-accent-500 justify-center items-center">
          <View className="w-[8px] rounded-full aspect-square bg-white"></View>
        </View>
        <Text className="text-2xl font-Poppins-Bold ">
          Select Route to Start Sales
        </Text>
      </View>
    </View>
  );
};

export const InformationButton = () => {
  const { currentLocation, setJourneyStarted } = useOrderContext();
  return (
    <View className="w-full absolute bottom-0 left-0 bg-white px-10 py-12 rounded-t-3xl  items-start gap-10">
      <View className="flex-row justify-center items-center gap-2">
        <Image source={images.LocationMark} />
        <View className="">
          <Text className="text-2xl font-Poppins-Bold ">
            {currentLocation.name}
          </Text>
          {/* <Text className="text-2xl font-Poppins-Medium ">Deal Place</Text> */}
        </View>
      </View>
      <CustomButton
        text="START JOURNEY"
        varient="small_accent"
        onClick={() => setJourneyStarted(true)}
      />
    </View>
  );
};

export const SellStockouteButton = (props: Props) => {
  return (
    <View className="absolute bottom-0 items-center justify-center w-full pb-5">
      <Link
        href="/updateStock"
        className="bg-accent-500 text-white px-5 py-3 rounded-3xl w-60 text-center"
      >
        SELL STOCK
      </Link>
    </View>
  );
};
