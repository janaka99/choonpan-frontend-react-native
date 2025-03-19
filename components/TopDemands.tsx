import React from "react";
import Card from "./Card";
import { Text, View } from "react-native";
import { useOrderContext } from "@/context/order/OrderContext";

type Props = {};

export default function TopDemands({}: Props) {
  const { selectedRoute } = useOrderContext();
  return (
    <Card className="mb-5">
      <Text className="font-Poppins-Bold text-3xl  text-gray-100  w-fit  ">
        Demand Insights{" "}
        {selectedRoute && selectedRoute.orderInsights.length > 0
          ? `${selectedRoute.orderInsights.length}`
          : ""}
      </Text>
      <View className="mt-5">
        {selectedRoute &&
          selectedRoute.orderInsights.map((card: any, i: any) => (
            <View
              key={i}
              className={`flex-row gap-5 items-center ${
                i == 0 ? "pb-5" : "border-t border-gray-200 w-full py-5"
              }`}
            >
              <View
                className="w-14 aspect-square rounded-xl "
                style={{
                  backgroundColor:
                    card.demandStatus == "HIGH"
                      ? "#BC1A1A82"
                      : card.demandStatus == "MEDIUM"
                      ? "#F188186B"
                      : "#F9CD9E",
                }}
              ></View>
              <View>
                <Text className="text-xl  text-black-300 font-Poppins-Bold">
                  {card.itemName}
                </Text>
                <Text className="text-xl  text-gray-100 font-Poppins-Regular">
                  {card.demandStatus}
                </Text>
              </View>
            </View>
          ))}
      </View>
    </Card>
  );
}
