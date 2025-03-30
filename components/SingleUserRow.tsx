import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Checkbox } from "react-native-paper";
import { Check } from "lucide-react-native";

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
    <TouchableOpacity
      className="flex-row items-center gap-2 mb-2"
      onPress={handleClick}
    >
      <View
        style={{
          borderWidth: 1,
          borderColor: "#000",
          borderRadius: 5,
          backgroundColor: `${checked == "checked" ? "#000" : "#fff"}`,
          width: 20,
          height: 20,
        }}
      >
        {/* <Checkbox status={checked} color="#ffffff" onPress={handleClick} /> */}
        {checked == "checked" && <Check color="#fff" size={18} />}
      </View>
      <View className="flex-grow bg-gray-50 flex-row px-4 py-3 rounded-2xl items-center ">
        <Text className="text-xl font-Poppins-Medium text-gray-400 w-10">
          {user.user.id}
        </Text>
        <Text className="text-xl font-Poppins-Medium text-gray-400">
          {user.user.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SingleUserRow;
