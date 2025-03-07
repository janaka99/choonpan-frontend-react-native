import { View, Text, Image } from "react-native";
import React from "react";

type Props = {
  icon: any;
  title: string;
};

const SectionTitle = ({ icon, title }: Props) => {
  return (
    <View className="rounded-xl bg-white p-4 flex-row items-center gap-3">
      <Image source={icon} className="contain w-6 aspect-square" />
      <Text className="font-Poppins-Bold text-2xl  text-black capitalize w-fit">
        {title}
      </Text>
    </View>
  );
};

export default SectionTitle;
