import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Checkbox } from "react-native-paper";
import SingleUserRow from "./SingleUserRow";
import axiosInstance from "@/utils/axiosInstance";
import Toast from "react-native-toast-message";
type Props = {};

export default function EmployeesList({}: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [employees, setEmployees] = useState([]);

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

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <View className="p-5 rounded-xl bg-white gap-4 ">
      <View className="flex-row justify-between items-center pl-2">
        <Text className="font-Poppins-Bold text-3xl  text-black capitalize w-fit">
          Employees
        </Text>
        <Icon name="arrow-right" color="#000000" size={36} />
      </View>
      {isLoading ? (
        <View className="w-full gap-4">
          <View className="w-full bg-gray-50 animate-pulse h-10 rounded-3xl"></View>
          <View className="w-full bg-gray-50 animate-pulse h-10 rounded-3xl"></View>
          <View className="w-full bg-gray-50 animate-pulse h-10 rounded-3xl"></View>
          <View className="w-full bg-gray-50 animate-pulse h-10 rounded-3xl"></View>
        </View>
      ) : (
        <>
          <View className="pl-12">
            <View className="bg-gray-200 flex-row px-4 py-3 rounded-2xl items-center ">
              <Text className="text-xl font-Poppins-Bold text-gray-400 w-10">
                ID
              </Text>
              <Text className="text-xl font-Poppins-Bold text-gray-400 sd">
                Name
              </Text>
            </View>
          </View>
          <View className="w-full">
            {employees &&
              employees.map((user, i) => <SingleUserRow user={user} key={i} />)}
          </View>
        </>
      )}
    </View>
  );
}
