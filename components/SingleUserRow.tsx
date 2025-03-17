import { View, Text } from "react-native";
import React from "react";
import { Checkbox } from "react-native-paper";

type Props = {
  user: any;
  selectedUserId: any;
  setSelectedUserId: any;
};

const SingleUserRow = ({ user, selectedUserId, setSelectedUserId }: Props) => {
  const checked = selectedUserId == user.id ? "checked" : "unchecked";

  const handleClick = () => {
    if (selectedUserId == user.id) {
      setSelectedUserId(null);
    } else {
      setSelectedUserId(user.id);
    }
  };
  return (
    <View className="flex-row gap-2 mb-2">
      <View className="">
        <Checkbox status={checked} color="#000000" onPress={handleClick} />
      </View>
      <View className="flex-grow bg-gray-50 flex-row px-4 py-3 rounded-2xl items-center ">
        <Text className="text-xl font-Poppins-Medium text-gray-400 w-10">
          {user.user.id}
        </Text>
        <Text className="text-xl font-Poppins-Medium text-gray-400">
          {user.user.name}
        </Text>
      </View>
    </View>
  );
};

export default SingleUserRow;
