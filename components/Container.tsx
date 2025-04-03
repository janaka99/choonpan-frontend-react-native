import { View, Text, ScrollView, Image } from "react-native";
import React, { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
type Props = {
  children: ReactNode;
  logo?: boolean;
  keyboardShouldPersistTaps?: boolean | "never" | "always" | "handled";
  nestedScrollEnabled?: boolean;
  className?: string;
};

const Container = ({
  children,
  logo = false,
  keyboardShouldPersistTaps = "never",
  nestedScrollEnabled = false,
  className = "",
}: Props) => {
  return (
    <SafeAreaView className=" h-full  relative">
      <View className="h-full ">
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
        <View className="h-full  ">
     
          <KeyboardAwareScrollView 
          keyboardShouldPersistTaps="handled"
          enableOnAndroid={true}
          enableAutomaticScroll={true}
          contentContainerClassName="pt-20 flex-grow flex-col justify-end" 
        >
              <View className="flex-grow flex flex-col justify-end">
            <View className={`${className} w-full `}>

                  {children}
            </View>
          </View>
          </KeyboardAwareScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Container;
