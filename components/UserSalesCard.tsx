import { View, Text, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import { MoveUpRight } from "lucide-react-native";
import images from "@/constants/icons";
import axiosInstance from "@/utils/axiosInstance";
import Toast from "react-native-toast-message";
import { formatNumber } from "@/utils/formatPrice";

type Props = {};

const UserSalesCard = (props: Props) => {
  const [totalSales, setTotalSales] = useState<null | string>(null);
  const [totalRevenue, setTotalRevenue] = useState<null | number>(null);
  const [SalesLoading, setSalesLoading] = useState(true);

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
      setTotalSales(formatNumber(res.data.sales.totalSales));
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
    <View className="bg-white rounded-xl">
      <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
        <View className="flex-row gap-2 p-5">
          <CustomButton
            text="Total Sales"
            varient="small_accent"
            width="w-fit"
          />
          <CustomButton
            text="Stock Levels"
            varient="small_white"
            width="w-fit"
          />
          <CustomButton
            text="Financial Summary"
            varient="small_accent_light"
            width="w-fit"
          />
        </View>
      </ScrollView>

      <View className="p-5 flex-row items-end justify-between">
        <View className="flex-grow mb-4">
          <Text className="text-gray-100  text-2xl  font-Poppins-Bold  mb-2">
            Total Sales
          </Text>
          {SalesLoading ? (
            <View className="w-28 h-9 bg-gray-50"></View>
          ) : (
            <Text className="text-black text-3xl  font-Poppins-Bold  ">
              LKR {totalSales}
            </Text>
          )}
        </View>
        <View className="  items-center gap-3">
          <View className="flex-row gap-2 px-2 py-[6px] rounded-2xl border-2 border-gray-50 w-24 inline-block justify-center items-center">
            <Text className="text-2xl  font-Poppins-Medium text-green-500">
              0%
            </Text>
            <MoveUpRight
              color="#32d46d"
              strokeWidth={3}
              className="text-green-500"
              size={20}
            />
          </View>
          <Image source={images.CHartIcon} className="contain" />
        </View>
      </View>
    </View>
  );
};

export default UserSalesCard;
