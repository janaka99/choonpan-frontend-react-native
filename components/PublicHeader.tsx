import { Link, useRouter } from "expo-router";
import React, { ReactNode, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import images from "@/constants/icons";
import { ArrowLeft } from "lucide-react-native";
import { Picker } from "@react-native-picker/picker";
import DropDownPicker from "react-native-dropdown-picker";
type Props = {
  children: ReactNode;
  title?: string;
  logoTitle?: boolean;
  backArrow?: boolean;
  pathToSignUp?: boolean;
};

export default function PublicHeader({
  children,
  title,
  logoTitle = false,
  backArrow = true,
  pathToSignUp = true,
}: Props) {
  const router = useRouter(); // Initialize router

  return (
    <View className="absolutes bottom-0 left-0 w-full min-h-[60vh] rounded-t-[30px] bg-white">
      <View className="flex-grow flex flex-col justify-between py-10">
        <View className=" flex flex-col gap-5">
          <View className="flex flex-row justify-between  relative">
            <View className="flex flex-row items-center px-10 gap-5">
              {backArrow ? (
                <TouchableOpacity
                  onPress={() => {
                    if (router.canGoBack()) {
                      router.back();
                    } else {
                      router.replace("/");
                    }
                  }}
                  className=""
                >
                  <ArrowLeft
                    size={24}
                    strokeWidth={3}
                    className=""
                    color="#7E5B4E"
                  />
                </TouchableOpacity>
              ) : (
                <Text></Text>
              )}
              {title && (
                <Text className="uppercase font-Poppins-ExtraBold text-accent-400 text-5xl leading-snug">
                  {title}
                </Text>
              )}
            </View>
            <Image
              source={images.LocationIcon}
              className="w-28 aspect-square object-contain absolute right-10 -top-[75px]"
            />
          </View>
          {logoTitle && (
            <View className="flex  px-10 ">
              <View className="w-full flex-row gap-3 justify-center items-center pr-3  text-wrap first-letter">
                <Text className="text-3xl font-Poppins-Bold">CHOONPAAN</Text>
                <View className="flex flex-row">
                  <Text className="text-3xl font-Poppins-Bold">OPTIM</Text>
                  <Text className="text-3xl font-Poppins-Bold text-accent-400">
                    AI
                  </Text>
                </View>
              </View>
            </View>
          )}

          {children}
        </View>
        {pathToSignUp ? (
          <View className="flex flex-row justify-center items-center px-10 flex-wra">
            <Text className="text-lg font-Poppins-Regular text-black-300">
              Already have an account?{" "}
            </Text>
            <Link
              className="text-lg font-Poppins-Bold text-black-400"
              href="/sign-in"
            >
              Login
            </Link>
          </View>
        ) : (
          <View className="flex-col justify-center items-center gap-5">
            <View className="flex flex-row justify-center items-center px-10 flex-wra">
              <Text className="text-lg font-Poppins-Medium text-black-300">
                Don’t have an account?{" "}
              </Text>
              <Link
                className="text-lg font-Poppins-Bold text-black-400"
                href="/select-role"
              >
                SignUp
              </Link>
            </View>
            {/* <Text className="text-lg font-Poppins-Medium text-black-300">
              Or
            </Text>
            <View className="flex-row gap-10 justify-center">
              <Image
                source={images.FacebookIcon}
                className="w-16 aspect-square object-cover"
              />
              <Image
                source={images.TwitterIcon}
                className="w-16 aspect-square object-cover"
              />
              <Image
                source={images.AppleIcon}
                className="w-16 aspect-square object-cover"
              />
            </View> */}
          </View>
        )}
      </View>
    </View>
  );
}
