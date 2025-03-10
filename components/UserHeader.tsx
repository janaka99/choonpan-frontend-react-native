import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/icons";
import { getFirstCharacter } from "@/utils/getFirstCharacter";
import { useAuth } from "@/context/AuthContext";
import { Redirect } from "expo-router";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useOrderContext } from "@/context/order/OrderContext";

type Props = {
  user: any;
  className?: string;
  setLocationSearchingOn: Dispatch<SetStateAction<boolean>>;
  locationSearchingOn: boolean;
};

export default function UserHeader({
  user,
  className = "",
  setLocationSearchingOn,
  locationSearchingOn,
}: Props) {
  const { currentLocation, isLoading } = useOrderContext();

  const handleLocationPress = () => {
    setLocationSearchingOn(!locationSearchingOn);
  };

  return (
    <View>
      <View className={`flex-row justify-between px-7 ${className}`}>
        <View className="flex-row gap-5">
          <View className="w-[46px] aspect-square bg-white rounded-full flex justify-center items-center">
            <Image source={images.MenuRIght} />
          </View>
          {isLoading ? (
            <View className=" bg-gray-50 h-20 w-40 rounded-xl"></View>
          ) : (
            <View>
              <Text className="text-xl font-Poppins-Bold text-accent-500">
                LOCATION
              </Text>
              <TouchableOpacity onPress={handleLocationPress}>
                <View className="flex gap-3 items-center flex-row">
                  <Text className="text-xl font-Poppins-Regular text-gray-100">
                    {currentLocation
                      ? `${
                          currentLocation.name
                            ? currentLocation.name
                            : "Enter Location"
                        }`
                      : "Enter Location"}
                  </Text>
                  <Icon name="arrow-drop-down" size={28} color="#000000" />
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View className="w-[46px] aspect-square rounded-full bg-accent-500 flex justify-center items-center ">
          <Text
            className="uppercase font-Poppins-Medium text-white pt-1"
            style={{
              fontSize: 26,
            }}
          >
            {getFirstCharacter(user.name)}
          </Text>
        </View>
      </View>
    </View>
  );
}
