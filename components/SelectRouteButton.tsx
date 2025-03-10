import { View, Text, Image } from "react-native";
import React from "react";
import images from "@/constants/icons";
import CustomButton from "./CustomButton";
import H2Text from "./H2Text";

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
  return (
    <View className="w-full absolute bottom-0 left-0 bg-white px-10 py-12 rounded-t-3xl  items-start gap-10">
      <View className="flex-row justify-center items-center gap-2">
        <Image source={images.LocationMark} />
        <View className="">
          <Text className="text-2xl font-Poppins-Bold ">
            West Portal Avenue
          </Text>
          <Text className="text-2xl font-Poppins-Medium ">Deal Place</Text>
        </View>
      </View>
      <CustomButton text="START JOURNEY" varient="small_accent" />
    </View>
  );
};

export const SellStockouteButton = (props: Props) => {
  return (
    <View className="absolute bottom-0 items-center justify-center w-full">
      <CustomButton
        text="SELL STOCK    "
        varient="small_accent"
        className=" mb-10"
        width="w-3/4"
      />
    </View>
  );
};
