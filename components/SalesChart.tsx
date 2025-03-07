import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { BarChart, barDataItem } from "react-native-gifted-charts";
import { BAR_DATA, formattedBarData, yAxisLabels } from "@/constants/tempory";
import NormalText from "./NormalText";
import H2Text from "./H2Text";
import ColoredSmallText from "./ColoredSmallText";
import { ChevronDown } from "lucide-react-native";

type Props = {};

enum Period {
  week = "week",
  month = "month",
  year = "year",
}

const SalesChart = (props: Props) => {
  const [chartPeriod, setChartPeriod] = React.useState<Period>(Period.week);
  const [barData, setBarData] = React.useState<barDataItem[]>(formattedBarData);
  const [chartKey, setChartKey] = React.useState(0);

  const [barOPen, setBarOPen] = useState(false);

  // Extract values and ensure they are numbers
  const validValues = BAR_DATA.map((item) => Number(item.value)).filter(
    (val) => !isNaN(val)
  );

  // Get the max value safely
  const maxValue = validValues.length > 0 ? Math.max(...validValues) : 10;
  // Generate formatted Y-axis labels dynamically
  const yAxisLabelTexts = Array.from({ length: 5 }, (_, i) => {
    const labelValue = Math.ceil((maxValue / 4) * i);
    return labelValue > 0 ? `${labelValue}k` : "0";
  });

  return (
    <View className="p-5 rounded-xl bg-white gap-4">
      <View className="flex-row items-start justify-between">
        <View>
          <NormalText>Income</NormalText>
          <View className="flex-row items-center gap-3">
            <H2Text className="mt-2" color="text-[#0F172A]">
              10,320
            </H2Text>
            <ColoredSmallText color="text-[#ED4F9D]">-20%</ColoredSmallText>
          </View>
        </View>
        <View>
          <TouchableOpacity className="flex items-center px-3 py-2  flex-row gap-3 border border-[#eeeeee] rounded-md ">
            <NormalText>This Week</NormalText>
            <ChevronDown size={26} color="#64748B" />
          </TouchableOpacity>
        </View>
      </View>
      <BarChart
        key={chartKey}
        data={barData}
        barWidth={22}
        // height={200}
        // width={290}
        // minHeight={3}
        barBorderTopLeftRadius={20}
        barBorderTopRightRadius={20}
        // showGradient
        // spacing={20}
        noOfSections={4}
        yAxisThickness={0}
        xAxisThickness={0}
        xAxisLabelsVerticalShift={2}
        xAxisLabelTextStyle={{ color: "gray", fontSize: 14 }}
        yAxisTextStyle={{ color: "gray" }}
        isAnimated
        animationDuration={300}
        yAxisLabelTexts={yAxisLabels}
      />
    </View>
  );
};

export default SalesChart;
