import { View, Text, ScrollView, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import images from "@/constants/icons";
import { SafeAreaView } from "react-native-safe-area-context";
import SectionTitle from "@/components/SectionTitle";
import axiosInstance from "@/utils/axiosInstance";
import { Link, Redirect, useLocalSearchParams, useRouter } from "expo-router";
import EmployeeSalesCard from "@/components/EmployeeSalesCard";
import { ChevronLeft, Loader2 } from "lucide-react-native";
import EmployeeSalesChart from "@/components/EmployeeSalesChart";
import EmployeeBestSelling from "@/components/EmployeeBestSelling";

const Analytics = () => {
  interface User {
    name: string;
    id: string;
  }

  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const { userid } = useLocalSearchParams();

  if (!userid) return <Redirect href="/dashboard-landing" />;

  // this function used to get the employee
  const getEmployeeById = async () => {
    try {
      setUser(null);
      setUserLoading(true);
      const res = await axiosInstance.get(`/employee/details/${userid}`);

      if (res.data.error) {
        router.push("/dashboard-landing");
      } else {
        setUser(res.data.user);
        setUserLoading(false);
      }
    } catch (error) {
      router.push("/dashboard-landing");
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getEmployeeById();
    setRefreshing(false);
  };

  useEffect(() => {
    getEmployeeById();
  }, [userid]);

  if (userLoading) {
    return (
      <View className="h-full flex justify-center items-center">
        <View className="animate-spin">
          <Loader2 color="#F1720C" size={40} />
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView className="h-full pb-[30px]">
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
            <View className="flex-row items-center gap-3">
              <Link href="/dashboard-landing" className="">
                <ChevronLeft size={32} color="#000000" />
              </Link>
              <Text className="text-center text-2xl text-gray-300 font-Poppins-Bold">
                FINANCIAL SUMMARY
              </Text>
            </View>
            <View className="flex-row justify-between items-center gap-2 ">
              <View className="pt-1 flex-row gap-2">
                <Text className="font-Poppins-Regular text-2xl text-gray-300 ">
                  Employee -
                </Text>
                <Text className="font-Poppins-Regular text-2xl  text-gray-300 capitalize w-fit">
                  {user?.name}
                </Text>
              </View>
            </View>
            <SectionTitle title="Overview" icon={images.GridIcon} />
            <EmployeeSalesCard userid={userid as string} />
          </View>
          <View className="px-7 gap-4">
            <SectionTitle title="Analytics" icon={images.AnalyticsIcon} />
            <EmployeeSalesChart userid={userid as string} />
          </View>
          <View className="px-7 gap-4">
            <EmployeeBestSelling userid={userid as string} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Analytics;
