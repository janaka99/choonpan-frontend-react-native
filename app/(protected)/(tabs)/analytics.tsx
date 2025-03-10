import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
type Props = {};
import images from "@/constants/icons";
import { SafeAreaView } from "react-native-safe-area-context";
import SalesComponent from "@/components/SalesComponent";
import SectionTitle from "@/components/SectionTitle";
import SalesChart from "@/components/SalesChart";
import EmployeesList from "@/components/EmployeesList";
import axiosInstance from "@/utils/axiosInstance";
import Toast from "react-native-toast-message";
import { formatNumber } from "@/utils/formatPrice";
import { useAuth } from "@/context/AuthContext";
import { Redirect } from "expo-router";
import BestSelling from "@/components/BestSelling";

const Analytics = (props: Props) => {
  const { user } = useAuth();
  const [totalSales, setTotalSales] = useState<null | number>(null);
  const [totalRevenue, setTotalRevenue] = useState<null | number>(null);
  const [SalesLoading, setSalesLoading] = useState(true);

  if (!user) return <Redirect href="/sign-in" />;

  const fetchSalesData = async () => {
    setSalesLoading(true);
    try {
      const res = await axiosInstance.get("/employee/sales/totalsales");
      if (res.data.error) {
        Toast.show({
          type: "error",
          text1: res.data.message,
        });
        return;
      }

      setTotalSales(res.data.sales.totalSales);
      setTotalRevenue(res.data.sales.totalRevenue);
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
  }, []);

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
        <View className="gap-10 mb-4">
          <View className="px-7 pt-5 gap-4 ">
            <Text className="text-center text-2xl text-gray-300 font-Poppins-Bold">
              FINANCIAL SUMMARY
            </Text>
            <View className="flex-row justify-between items-center gap-2 ">
              <View className="pt-1 flex-row gap-2">
                <Text className="font-Poppins-Regular text-2xl text-gray-300 ">
                  Employee -
                </Text>
                <Text className="font-Poppins-Regular text-2xl  text-gray-300 capitalize w-fit">
                  {user.name}
                </Text>
              </View>
            </View>
            <SectionTitle title="Overview" icon={images.GridIcon} />
            <SalesComponent
              title="Sales"
              sales={formatNumber(totalSales)}
              upby="12%"
              background="bg-accent-50"
              icon={images.CartIconAccent}
              loading={SalesLoading}
            />
            <SalesComponent
              title="Total Revenue"
              sales={formatNumber(totalRevenue)}
              upby="14%"
              background="bg-custom-blue-50"
              icon={images.DollarIconBlue}
              loading={SalesLoading}
            />
          </View>
          <View className="px-7 gap-4">
            <SectionTitle title="Analytics" icon={images.AnalyticsIcon} />
            <SalesChart />
          </View>
          <View className="px-7 gap-4">
            <BestSelling />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Analytics;
