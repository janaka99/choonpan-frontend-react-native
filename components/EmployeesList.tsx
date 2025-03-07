import React, { useState } from "react";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Checkbox } from "react-native-paper";
import SingleUserRow from "./SingleUserRow";
type Props = {};

export default function EmployeesList({}: Props) {
  const [isLoading, setIsLoading] = useState(true);

  const emps = [
    { id: 1, name: "Samantha perara" },
    { id: 2, name: "Bernard Rodrigo" },
    { id: 3, name: "John Charles" },
    { id: 4, name: "Peter Doe" },
    { id: 5, name: "Kendrick Lamar" },
    { id: 6, name: "Snoop" },
  ];

  const [employees, setEmployees] = useState(emps);

  if (isLoading) {
    return (
      <View className="p-5 rounded-xl bg-white gap-4 ">
        <View className="flex-row justify-between items-center pl-2">
          <Text className="font-Poppins-Bold text-3xl  text-black capitalize w-fit">
            Employees
          </Text>
          <Icon name="arrow-right" color="#000000" size={36} />
        </View>
        <View className="">
          <View className="pl-12">
            <View className="bg-gray-200 flex-row px-4 py-3 rounded-2xl items-center mb-4 ">
              <Text className="text-xl font-Poppins-Bold text-gray-400 w-10">
                ID
              </Text>
              <Text className="text-xl font-Poppins-Bold text-gray-400">
                Name
              </Text>
            </View>
          </View>
          <View>
            {employees.map((user, i) => (
              <SingleUserRow user={user} key={i} />
            ))}
          </View>
        </View>
      </View>
    );
  }

  return <View></View>;
}
