import { SafeAreaView } from "react-native";
import React, { useState } from "react";
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
  const { selectedRoute, journeyStarted, setJourneyStarted } =
    useOrderContext();
  return (
    <>
      <SafeAreaView className="rounded-xl h-full overflow-hidden w-full ">
        <MapHeader title="SELECT ROUTE" />
        <MapViewComponent />
        {selectedRoute ? (
          journeyStarted ? (
            <SellStockouteButton />
          ) : (
            <InformationButton />
          )
        ) : (
          <SelectRouteButton />
        )}
      </SafeAreaView>
    </>
  );
};

export default selectRoute;
