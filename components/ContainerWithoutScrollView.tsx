import { View, Text, ScrollView, Image } from "react-native";
import React, { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/icons";
type Props = {
  children: ReactNode;
  logo?: boolean;
};

const ContainerWithoutScrollView = ({ children, logo = false }: Props) => {
  return (
    <SafeAreaView className=" flex-1 bg-orange-400  relative">
      <View className="flex-1  ">
        <View className="h-full flex-1 justify-between">
          <View className="h-full w-full absolute inset-0">
            <View className="w-full h-2/5 flex justify-center items-cente relative ">
              <Image
                source={images.BgIcon}
                className="w-full h-full absolute inset-0"
              />
              {logo && (
                <View className="flex h-full w-full justify-center items-center px-20 bg-transparent">
                  <Image source={images.LogoIcon} className="w-full " />
                </View>
              )}
            </View>
          </View>
          {children}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ContainerWithoutScrollView;
