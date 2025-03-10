import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "@/components/Card";
import { useAuth } from "@/context/AuthContext";
import { Redirect, useRouter } from "expo-router";
import CustomButton from "@/components/CustomButton";
import { PROFILES } from "@/constants/data";

type Props = {};

const settings = (props: Props) => {
  const { user, activeProfile, toggleProfiles, signout } = useAuth();

  if (!user) return <Redirect href="/sign-in" />;
  const router = useRouter();
  const isManager = activeProfile[PROFILES.manager] ? true : false;

  const handlePress = () => {
    if (isManager) {
      toggleProfiles(PROFILES.employee);
      router.replace("/dashboard-landing");
    } else {
      toggleProfiles(PROFILES.manager);
      router.replace("/dashboard-landing");
    }
  };

  const firstCharacter = user.name ? user.name.charAt(0) : "M";

  return (
    <SafeAreaView className="h-full">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          gap: 6,
          backgroundColor: "#f7f7f7",
          marginBottom: 80,
        }}
      >
        <View className="flex-grow justify-between  ">
          <View className="px-7 pt-7 gap-5">
            <Card className="flex-row w-full gap-5">
              <View className="w-[40px] aspect-square rounded-full bg-accent-500 flex justify-center items-center ">
                <Text
                  className="uppercase font-Poppins-Medium text-white pt-1"
                  style={{
                    fontSize: 26,
                  }}
                >
                  {firstCharacter}
                </Text>
              </View>
              <View className="">
                <Text className="font-Poppins-Bold text-xl  text-black capitalize w-fit">
                  Janaka
                </Text>
                <Text className="font-Poppins-Regular text-xl  text-black capitalize w-fit">
                  {user.email}
                </Text>
              </View>
            </Card>
            <Card className="gap-5">
              <Text className="text-xl font-Poppins-Bold">Account</Text>
              <Text className="text-xl font-Poppins-Bold">Edit Profile</Text>
              <Text className="text-xl font-Poppins-Bold">Privacy</Text>
              <Text className="text-xl font-Poppins-Bold">Settings</Text>
            </Card>
            <Card className="gap-5">
              <Text className="text-xl font-Poppins-Bold">Help & Support</Text>
              <Text className="text-xl font-Poppins-Bold">Notification</Text>
            </Card>
          </View>
          <View className="px-7 gap-4">
            <CustomButton
              text={`${isManager ? "SWITCH TO USER" : "SWITCH TO MANAGER"}`}
              varient="black"
              onClick={handlePress}
            />
            <CustomButton onClick={signout} text="LOG OUT" varient="danger" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default settings;
