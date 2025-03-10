import React, { useState } from "react";
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthContext";
import { Redirect } from "expo-router";
import UserHeader from "./UserHeader";
import AddStockCard from "./AddStockCard";
import MapCard from "./MapCard";
import TopDemands from "./TopDemands";
import GooglePlaces from "./GooglePlaces";
import { useOrderContext } from "@/context/order/OrderContext";
import UserSalesCard from "./UserSalesCard";

type Props = {};

export default function UserDashboard({}: Props) {
  const { user } = useAuth();
  const { getLocationAndRouteInformation } = useOrderContext();
  const [refreshing, setRefreshing] = useState(false);
  const [locationSearchingOn, setLocationSearchingOn] = useState(false);
  const { currentLocationUpdating } = useOrderContext();

  const onRefresh = async () => {
    if (refreshing) return;
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  if (!user) return <Redirect href="/sign-in" />;

  return (
    <SafeAreaView className="h-full pb-[75px] relative">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          gap: 6,
          backgroundColor: "#f7f7f7",
          marginBottom: 80,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <UserHeader
          user={user}
          className="pt-5"
          setLocationSearchingOn={setLocationSearchingOn}
          locationSearchingOn={locationSearchingOn}
        />

        {locationSearchingOn && (
          <GooglePlaces setLocationSearchingOn={setLocationSearchingOn} />
        )}
        <View className="gap-10 px-7 pt-5">
          <UserSalesCard />
          <AddStockCard />
          <MapCard />
          <TouchableOpacity onPress={getLocationAndRouteInformation}>
            <Text>Get Sales</Text>
          </TouchableOpacity>
          <TopDemands />
        </View>
      </ScrollView>
      {currentLocationUpdating && (
        <View className="w-full h-full absolute top-0 left-0 bg-gray-300/25 flex justify-center items-center">
          <Text>Loading...</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
