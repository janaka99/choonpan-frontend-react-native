import { View, Text } from "react-native";
import React from "react";
import { Checkbox } from "react-native-paper";

type Props = {
  user: any;
};

const SingleUserRow = ({ user }: Props) => {
  return (
    <View className="flex-row gap-2 mb-2">
      <View className="">
        <Checkbox status={"checked"} color="#000000" />
      </View>
      <View className="flex-grow bg-gray-50 flex-row px-4 py-3 rounded-2xl items-center ">
        <Text className="text-xl font-Poppins-Medium text-gray-400 w-10">
          {user.id}
        </Text>
        <Text className="text-xl font-Poppins-Medium text-gray-400">
          {user.name}
        </Text>
      </View>
    </View>
  );
};

export default SingleUserRow;
