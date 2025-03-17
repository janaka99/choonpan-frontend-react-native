import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
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
import { PROFILES } from "@/constants/data";
import { router } from "expo-router";

const ManagerDashboard = (props: Props) => {
  const { toggleProfiles, user } = useAuth();
  const [totalSales, setTotalSales] = useState<null | number>(null);
  const [totalRevenue, setTotalRevenue] = useState<null | number>(null);
  const [SalesLoading, setSalesLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [employees, setEmployees] = useState([]);

  const fetchSalesData = async () => {
    setSalesLoading(true);
    try {
      const res = await axiosInstance.get("/manager/sales/totalsales");
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

  const fetchEmployees = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get("/manager/employee/all");
      if (res.data.error) {
        Toast.show({
          type: "error",
          text1: res.data.message,
        });
        return;
      }
      setEmployees(res.data.employees);
      setIsLoading(false);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Internal server error",
      });
    }
  };

  const handlePress = () => {
    toggleProfiles(PROFILES.employee);
    router.replace("/dashboard-landing");
  };

  const onRefresh = async () => {
    if (refreshing) return;
    setRefreshing(true);
    fetchSalesData();
    fetchEmployees();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchSalesData();
    fetchEmployees();
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="gap-10 mb-4">
          <View className="px-7 pt-5 gap-4 ">
            <View className="flex-row justify-between items-center gap-2 ">
              <View className="pt-1">
                <Text className="font-Poppins-Bold text-2xl text-gray-300 ">
                  Hi,
                </Text>
                <Text className="font-Poppins-Bold text-2xl  text-gray-300 capitalize w-fit">
                  {user.name}
                </Text>
              </View>
              <TouchableOpacity
                onPress={handlePress}
                className="py-3 px-4  uppercase bg-black rounded-xl w-fit"
              >
                <Text className="text-lg font-Poppins-Bold text-white uppercase ">
                  SWITCH to user
                </Text>
              </TouchableOpacity>
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
            <EmployeesList employees={employees} isLoading={isLoading} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ManagerDashboard;
