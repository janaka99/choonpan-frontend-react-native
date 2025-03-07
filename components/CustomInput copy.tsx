import { View, Text, TextInput } from "react-native";
import React, { ReactNode } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  title: string;
  placeholder: string;
  secureTextEntry?: boolean;
  externalLink?: ReactNode;
};

const CustomInput = ({
  value,
  onChange,
  title,
  placeholder,
  secureTextEntry = false,
  externalLink,
}: Props) => {
  return (
    <View className="gap-2">
      <View className="flex-row justify-between">
        <Text className="uppercase text-lg text-black-400 ">{title}</Text>
        {externalLink}
      </View>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={(text) => onChange(text)}
        secureTextEntry={secureTextEntry}
        className="w-full py-6 text-lg px-4 font-Poppins-Medium bg-accent-200 text-black-400 rounded-xl"
      />
    </View>
  );
};

export default CustomInput;
