import React from "react";
import Card from "./Card";
import { Text, View } from "react-native";

type Props = {};

export default function TopDemands({}: Props) {
  const demands = [
    {
      name: "Fish Bun",
      demand: "High",
      color: "#BC1A1A82",
    },
    {
      name: "Bread",
      demand: "Medium",
      color: "#F188186B",
    },
    {
      name: "Jam Bun",
      demand: "Medium",
      color: "#F9CD9E",
    },
  ];

  return (
    <Card className="mb-5">
      <Text className="font-Poppins-Bold text-3xl  text-gray-100  w-fit  ">
        Demand Insights (Top 3)
      </Text>
      <View className="mt-5">
        {demands.map((card, i) => (
          <View
            key={i}
            className={`flex-row gap-5 items-center ${
              i == 0 ? "pb-5" : "border-t border-gray-200 w-full py-5"
            }`}
          >
            <View
              className="w-14 aspect-square rounded-xl "
              style={{
                backgroundColor: card.color,
              }}
            ></View>
            <View>
              <Text className="text-xl  text-black-300 font-Poppins-Bold">
                {card.name}
              </Text>
              <Text className="text-xl  text-gray-100 font-Poppins-Regular">
                {card.demand}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </Card>
  );
}
