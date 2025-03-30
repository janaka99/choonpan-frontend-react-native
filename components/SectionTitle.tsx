import { View, Text, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { ChevronLeft } from "lucide-react-native";

type Props = {
  icon: any;
  title: string;
  backLink?: any;
};

const SectionTitle = ({ icon, title, backLink }: Props) => {
  return (
    <View className="rounded-xl bg-white p-4  flex-row  gap-5">
      {backLink && (
        <Link href={backLink} className="">
          <ChevronLeft size={32} color="#000000" />
        </Link>
      )}
      <View className="flex-row items-center gap-3">
        <Image source={icon} className="contain w-6 aspect-square" />
        <Text className="font-Poppins-Bold text-2xl  text-black capitalize w-fit">
          {title}
        </Text>
      </View>
    </View>
  );
};

export default SectionTitle;
