import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import SingleUserRow from "./SingleUserRow";
import { Link, useRouter } from "expo-router";

export default function EmployeesList({ employees, isLoading }: any) {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (employees && employees.length > 0) {
      setSelectedUserId(employees[0].id);
    }
  }, [employees]);

  const pushUser = () => {
    if (selectedUserId) {
      router.push(`/employee/${selectedUserId}`);
    }
  };

  return (
    <View className="p-5 rounded-xl bg-white gap-4 ">
      <View className="flex-row justify-between items-center pl-2 h-10">
        <Text className="font-Poppins-Bold text-3xl  text-black capitalize w-fit">
          Employees
        </Text>
        {selectedUserId && (
          <TouchableOpacity onPress={pushUser}>
            <Icon name="arrow-right" color="#000000" size={36} />
          </TouchableOpacity>
        )}
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
              employees.map((user: any, i: any) => (
                <SingleUserRow
                  user={user}
                  key={i}
                  setSelectedUserId={setSelectedUserId}
                  selectedUserId={selectedUserId}
                />
              ))}
          </View>
        </>
      )}
    </View>
  );
}
