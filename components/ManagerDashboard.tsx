import {
  View,
  Text,
  ScrollView,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { useAuth } from "@/context/AuthContext";
type Props = {};
import Icon from "react-native-vector-icons/Ionicons";
import images from "@/constants/icons";
import { SafeAreaView } from "react-native-safe-area-context";
import SalesComponent from "@/components/SalesComponent";
import SectionTitle from "@/components/SectionTitle";
import SalesChart from "@/components/SalesChart";
import EmployeesList from "@/components/EmployeesList";

const ManagerDashboard = (props: Props) => {
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
            <View className="flex-row justify-between items-center gap-2 ">
              <View className="pt-1">
                <Text className="font-Poppins-Bold text-2xl text-gray-300 ">
                  Hi,
                </Text>
                <Text className="font-Poppins-Bold text-2xl  text-gray-300 capitalize w-fit">
                  Janaka
                </Text>
              </View>
              <TouchableOpacity className="py-3 px-4  uppercase bg-black rounded-xl w-fit">
                <Text className="text-lg font-Poppins-Bold text-white uppercase ">
                  SWITCH to user
                </Text>
              </TouchableOpacity>
            </View>
            <SectionTitle title="Overview" icon={images.GridIcon} />
            <SalesComponent
              title="Sales"
              sales="150, 320.00"
              background="bg-accent-50"
              icon={images.CartIconAccent}
            />
            <SalesComponent
              title="Total Revenue"
              sales="80, 566.01"
              background="bg-custom-blue-50"
              icon={images.DollarIconBlue}
            />
          </View>
          <View className="px-7 gap-4">
            <SectionTitle title="Analytics" icon={images.AnalyticsIcon} />
            <SalesChart />
          </View>
          <View className="px-7 gap-4">
            <EmployeesList />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ManagerDashboard;
