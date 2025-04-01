import { SafeAreaView, Text, View } from "react-native";
import React from "react";
import MapHeader from "@/components/MapHeader";
import { useOrderContext } from "@/context/order/OrderContext";
import MapViewComponent from "@/components/MapView";
import {
  InformationButton,
  SelectRouteButton,
  SellStockouteButton,
} from "@/components/SelectRouteButton";
type Props = {};

export const options = {
  headerShown: false, // Hide the header for this screen
};

const selectRoute = (props: Props) => {
  const {
    selectedRoute,
    journeyStarted,
    currentJourneyUpdating,
    currentJourney,
  } = useOrderContext();
  return (
    <SafeAreaView className="rounded-xl h-full overflow-hidden w-full realative">
      <View className="h-full relative">
        {!currentJourney && <MapHeader title="SELECT ROUTE" />}
        <MapViewComponent />
        {selectedRoute ? (
          journeyStarted ? (
            <SellStockouteButton />
          ) : (
            <InformationButton selectedRoute={selectedRoute} />
          )
        ) : (
          <SelectRouteButton />
        )}
        {currentJourneyUpdating && (
          <View className="w-full h-full absolute top-0 left-0 z-50 bg-gray-100/40 flex justify-center items-center">
            <Text className="text-center font-Poppins-Bold">
              Starting new journey...
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default selectRoute;
