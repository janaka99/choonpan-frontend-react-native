import { View, Text, Image } from "react-native";
import React from "react";
import images from "@/constants/icons";
import CustomButton from "./CustomButton";
import { useOrderContext } from "@/context/order/OrderContext";
import { Link } from "expo-router";

type Props = {};

export const SelectRouteButton = () => {
  return (
    <View className="w-full absolute bottom-0 left-0 bg-white px-10 py-12 rounded-t-3xl">
      <View className="flex-row justify-center items-center gap-2">
        <View className="w-6 rounded-full aspect-square bg-accent-500 justify-center items-center">
          <View className="w-[8px] rounded-full aspect-square bg-white"></View>
        </View>
        <Text className="text-2xl font-Poppins-Bold ">
          Select Route to Start Sales
        </Text>
      </View>
    </View>
  );
};

export const InformationButton = ({
  selectedRoute,
}: {
  selectedRoute: any;
}) => {
  const {
    currentLocation,
    setJourneyStarted,
    currentJourney,
    currentJourneyUpdating,
    startJourney,
    endJourney,
    currentJourneyEnding,
    routeInformationLoding,
  } = useOrderContext();

  return (
    <View className="w-full absolute bottom-0 left-0 bg-white px-10 py-12 rounded-t-3xl  items-start gap-10">
      <View className="flex-row justify-center items-center gap-2">
        <Image source={images.LocationMark} />
        <View className="">
          <Text className="text-2xl font-Poppins-Bold ">
            {currentLocation.name ? currentLocation.name : ""}
          </Text>
        </View>
      </View>
      {currentJourney ? (
        <View className="flex-row gap-5 justify-center w-full">
          <Link
            href="/updateStock"
            disabled={currentJourneyEnding}
            className="bg-accent-500 text-white px-5 py-3 rounded-xl text-center w-[40%]"
          >
            SELL STOCK
          </Link>
          <CustomButton
            text="END JOURNEY"
            varient="small_accent"
            width="w-[40%]"
            // onClick={() => setJourneyStarted(true)}
            disabled={currentJourneyEnding}
            onClick={() => {
              console.log(selectedRoute);
              endJourney(currentJourney.id);
            }}
          />
        </View>
      ) : (
        <CustomButton
          text="START JOURNEY"
          varient="small_accent"
          // onClick={() => setJourneyStarted(true)}
          disabled={currentJourneyUpdating || routeInformationLoding}
          onClick={() => {
            console.log(selectedRoute);
            startJourney(selectedRoute);
          }}
        />
      )}
    </View>
  );
};

export const SellStockouteButton = (props: Props) => {
  return (
    <View className="absolute bottom-0 items-center justify-center w-full pb-5">
      <Link
        href="/updateStock"
        className="bg-accent-500 text-white px-5 py-3 rounded-3xl w-60 text-center"
      >
        SELL STOCK
      </Link>
    </View>
  );
};
