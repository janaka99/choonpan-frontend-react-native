import React, { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/icons";
import { getFirstCharacter } from "@/utils/getFirstCharacter";
import { useAuth } from "@/context/AuthContext";
import { Redirect } from "expo-router";
import Icon from "react-native-vector-icons/MaterialIcons";
import UserHeader from "./UserHeader";
import Card from "./Card";
import CustomButton from "./CustomButton";
import { MoveUpRight } from "lucide-react-native";
import AddStockCard from "./AddStockCard";
import MapCard from "./MapCard";
import TopDemands from "./TopDemands";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

type Props = {};

export default function UserDashboard({}: Props) {
  const { user } = useAuth();
  const [totalSales, setTotalSales] = useState(0);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>({
    latitude: 6.929631,
    longitude: 79.978104,
  });

  if (!user) return <Redirect href="/sign-in" />;

  return (
    <SafeAreaView className="h-full pb-[75px]">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          gap: 6,
          backgroundColor: "#f7f7f7",
          marginBottom: 80,
        }}
      >
        <UserHeader user={user} className="pt-5" />
        {/* <View className="bg-white p-4 rounded-xl">
        <Text className="text-lg font-semibold mb-2">Enter Your Location</Text>
        <GooglePlacesAutocomplete
          placeholder="Search for a location..."
          fetchDetails={true}
          minLength={2}
          onPress={(data, details = null) => {
            if (details) {
              console.log(details);
              const { lat, lng } = details.geometry.location;
              setLocation({ latitude: lat, longitude: lng });
            }
          }}
          query={{
            key: "AIzaSyCWDqIM4CuRTWigv1W0ISB0etvTZfKzlLo", // Replace with your actual API key
            language: "en",
          }}
          styles={{
            textInput: {
              // height: 40,
              borderColor: "#ccc",
              borderWidth: 1,
              borderRadius: 5,
              paddingHorizontal: 10,
              marginBottom: 10,
            },
          }}
        />
      </View> */}
        <View className="gap-10 px-7 pt-5">
          <View className="bg-white rounded-xl">
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
            >
              <View className="flex-row gap-2 p-5">
                <CustomButton
                  text="Total Sales"
                  varient="small_accent"
                  width="w-fit"
                />
                <CustomButton
                  text="Stock Levels"
                  varient="small_white"
                  width="w-fit"
                />
                <CustomButton
                  text="Financial Summary"
                  varient="small_accent_light"
                  width="w-fit"
                />
              </View>
            </ScrollView>

            <View className="p-5 flex-row items-end justify-between">
              <View className="flex-grow mb-4">
                <Text className="text-gray-100  text-2xl  font-Poppins-Bold  ">
                  Total Sales
                </Text>
                <Text className="text-black text-3xl  font-Poppins-Bold  ">
                  LKR {totalSales}
                </Text>
              </View>
              <View className="  items-center gap-3">
                <View className="flex-row gap-2 px-2 py-[6px] rounded-2xl border-2 border-gray-50 w-24 inline-block justify-center items-center">
                  <Text className="text-2xl  font-Poppins-Medium text-green-500">
                    0%
                  </Text>
                  <MoveUpRight
                    color="#32d46d"
                    strokeWidth={3}
                    className="text-green-500"
                    size={20}
                  />
                </View>
                <Image source={images.CHartIcon} className="contain" />
              </View>
            </View>
          </View>

          <AddStockCard />
          <MapCard location={location} />
          <TopDemands />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
