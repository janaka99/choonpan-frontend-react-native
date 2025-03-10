import { SafeAreaView } from "react-native";
import React, { useState } from "react";

import { ALL_ORDERS, ROUTE_WITH_ORDERS } from "@/constants/tempory";

import MapHeader from "@/components/MapHeader";
import { PolylinePressEvent } from "react-native-maps/lib/MapPolyline";
import { Alert } from "react-native";
import images from "@/constants/icons";
import {
  InformationButton,
  SelectRouteButton,
} from "@/components/SelectRouteButton";
import { useOrderContext } from "@/context/order/OrderContext";
import MapViewComponent from "@/components/MapView";
type Props = {};

export const options = {
  headerShown: false, // Hide the header for this screen
};

const selectRoute = (props: Props) => {
  return (
    <>
      <SafeAreaView className="rounded-xl flex-grow overflow-hidden w-full ">
        <MapHeader title="SELECT ROUTE" />
        <MapViewComponent />
        <SelectRouteButton />
      </SafeAreaView>
    </>
  );
};

export default selectRoute;
