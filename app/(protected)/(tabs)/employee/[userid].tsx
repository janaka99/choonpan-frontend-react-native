import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
type Props = {};
import images from "@/constants/icons";
import { SafeAreaView } from "react-native-safe-area-context";
import SectionTitle from "@/components/SectionTitle";
import SalesChart from "@/components/SalesChart";
import axiosInstance from "@/utils/axiosInstance";
import Toast from "react-native-toast-message";
import { Redirect, useLocalSearchParams, useRouter } from "expo-router";
import BestSelling from "@/components/BestSelling";
import EmployeeSalesCard from "@/components/EmployeeSalesCard";
import { Loader2 } from "lucide-react-native";
import EmployeeSalesChart from "@/components/EmployeeSalesChart";
import EmployeeBestSelling from "@/components/EmployeeBestSelling";

const Analytics = (props: Props) => {
  interface User {
    name: string;
    id: string;
  }

  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(true);
  const router = useRouter();

  const { userid } = useLocalSearchParams();

  if (!userid) return <Redirect href="/dashboard-landing" />;

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
