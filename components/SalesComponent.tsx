import { View, Text, Image } from "react-native";
import React from "react";

type Props = {
  icon: any;
  background: string;
  title: string;
  sales: string;
  loading?: boolean;
  upby: string;
};

const SalesComponent = ({
  icon,
  background,
  title,
  sales,
  loading = false,
  upby,
}: Props) => {
  if (loading) {
    return (
      <View className="h-20 w-full rounded-xl bg-gray-50 animate-pulse"></View>
    );
  }

  return (
    <View className="bg-white flex-row items-center gap-6 rounded-xl p-6 h-fit ">
      <View
        className={`aspect-square flex justify-center items-center  w-16 rounded-xl ${background}`}
      >
        <Image source={icon} className="w-full " resizeMode="contain" />
      </View>
      <View className=" flex-col  h-fit justify-between flex-grow">
        <Text className="text-gray-400 text-xl font-Poppins-Medium mb-2">
          {title}
        </Text>
        <View className=" flex-grow justify-end">
          <View className="flex-row items-start  gap-2">
            <Text className="text-black text-4xl  font-Poppins-Bold  ">
              LKR {sales}
            </Text>
            <Text className="text-green-400 text-xl font-Poppins-Medium ">
              +{upby}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SalesComponent;
