import { View, Text, ScrollView, Image } from "react-native";
import React, { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/icons";
type Props = {
  children: ReactNode;
  logo?: boolean;
  keyboardShouldPersistTaps?: boolean | "never" | "always" | "handled";
  nestedScrollEnabled?: boolean;
};

const Container = ({
  children,
  logo = false,
  keyboardShouldPersistTaps = "never",
  nestedScrollEnabled = false,
}: Props) => {
  return (
    <SafeAreaView className=" h-full bg-orange-400s  relative">
      <View className="h-full">
        {/* <ScrollView
          keyboardShouldPersistTaps={keyboardShouldPersistTaps}
          nestedScrollEnabled={nestedScrollEnabled}
          contentContainerClassName="h-full flex-1s justify-between"
        > */}
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
        <ScrollView contentContainerClassName="flex-grow">
          <View className="flex-1 pt-20 ">
            <View className="flex-1 justify-end ">{children}</View>
          </View>
        </ScrollView>

        {/* </ScrollView> */}
      </View>
    </SafeAreaView>
  );
};

export default Container;
