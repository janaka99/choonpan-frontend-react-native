import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { BarChart, barDataItem } from "react-native-gifted-charts";
import { BAR_DATA, formattedBarData, yAxisLabels } from "@/constants/tempory";
import NormalText from "./NormalText";
import H2Text from "./H2Text";
import ColoredSmallText from "./ColoredSmallText";
import { ChevronDown, ChevronUp } from "lucide-react-native";
import { useOrderContext } from "@/context/order/OrderContext";
import axiosInstance from "@/utils/axiosInstance";
import Toast from "react-native-toast-message";
import { isLoading } from "expo-font";
import { formatNumber } from "@/utils/formatPrice";

type Props = {};

enum Period {
  week = "week",
  month = "month",
  year = "year",
}

const SalesChart = (props: Props) => {
  const [barData, setBarData] = React.useState<barDataItem[]>(formattedBarData);
  const [chartKey, setChartKey] = React.useState(0);
  const [SalesLoading, setSalesLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("This Week");
  const [totalValue, setTotalValue] = useState<string | null>(null);

  const options = ["This Week", "Last 30 Days", "Last Year"];

  const handleSelect = (option: string) => {
    setSelectedFilter(option);
    setIsOpen(false);
  };

  const calculateTotal = (data: any) => {
    if (!data || data.length === 0) {
      return 0;
    }
    const total = data.reduce(
      (acc: any, item: any) => acc + (item.value || 0),
      0
    );
    return total;
  };

  const fetchSalesData = async () => {
    setSalesLoading(true);
    try {
      let res;
      if (selectedFilter == "This Week") {
        res = await axiosInstance.get("/employee/sales/lastweek");
      } else if (selectedFilter == "Last 30 Days") {
        res = await axiosInstance.get("/employee/sales/lastmonth");
      } else if (selectedFilter == "Last Year") {
        res = await axiosInstance.get("/employee/sales/lastyear");
      } else {
        res = await axiosInstance.get("/employee/sales/lastweek");
      }
      if (!res) {
        return;
      }
      if (res.data.error) {
        Toast.show({
          type: "error",
          text1: res.data.message,
        });
        return;
      }

      setBarData(res.data.sales);
      const totalValue = calculateTotal(res.data.sales);
      setTotalValue(formatNumber(totalValue));
      setSalesLoading(false);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Internal server error",
      });
    }
  };

  useEffect(() => {
    fetchSalesData();
  }, [selectedFilter]);

  return (
    <View className="p-5 rounded-xl bg-white gap-4 w-full">
      <View className="flex-row items-start justify-between">
        <View>
          <NormalText>Income</NormalText>
          <View className="flex-row items-center gap-3">
            {SalesLoading ? (
              <View className="w-28 h-10 bg-gray-50 rounded-md"></View>
            ) : (
              <>
                <H2Text className="mt-2" color="text-[#0F172A]">
                  {totalValue}
                </H2Text>
                <ColoredSmallText color="text-[#ED4F9D]">-20%</ColoredSmallText>
              </>
            )}
          </View>
        </View>
        <View>
          <TouchableOpacity
            className="flex items-center px-3 py-2 flex-row gap-3 border border-[#eeeeee] rounded-md bg-white z-50"
            onPress={() => setIsOpen(!isOpen)}
          >
            <Text className="text-gray-700">{selectedFilter}</Text>
            {isOpen ? (
              <ChevronUp size={26} color="#64748B" />
            ) : (
              <ChevronDown size={26} color="#64748B" />
            )}
          </TouchableOpacity>
          {isOpen && (
            <View className="absolute top-12 left-0 w-full bg-white rounded-md shadow-md z-50">
              {options.map((option) => (
                <TouchableOpacity
                  key={option}
                  className={`px-3 py-2 ${
                    selectedFilter === option ? "bg-gray-200" : "bg-white"
                  }`}
                  onPress={() => handleSelect(option)}
                >
                  <Text className="text-gray-700">{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>
      {SalesLoading ? (
        <View className="w-full aspect-video bg-gray-50 rounded-xl"></View>
      ) : (
        <BarChart
          key={chartKey}
          data={barData}
          barWidth={22}
          barBorderTopLeftRadius={20}
          barBorderTopRightRadius={20}
          noOfSections={4}
          yAxisThickness={0}
          xAxisThickness={0}
          xAxisLabelsVerticalShift={2}
          xAxisLabelTextStyle={{ color: "gray", fontSize: 14 }}
          yAxisTextStyle={{ color: "gray" }}
          isAnimated
          animationDuration={300}
          yAxisLabelTexts={yAxisLabels}
          frontColor="#DBEAFE"
        />
      )}
    </View>
  );
};

export default SalesChart;
