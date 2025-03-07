import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { ReactNode, useState } from "react";
import images from "@/constants/icons"; // Update with your image icon path
import { Eye, EyeOff } from "lucide-react-native";

type Props = {
  value: string;
  onChange: (value: string) => void;
  title: string;
  placeholder: string;
  secureTextEntry?: boolean;
  externalLink?: ReactNode;
  disabled?: boolean;
  type?: string;
};

const CustomInput = ({
  value,
  onChange,
  title,
  placeholder,
  secureTextEntry = false,
  externalLink,
  disabled = false,
  type = "text",
}: Props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View className="gap-2">
      <View className="flex-row justify-between">
        <Text className="uppercase text-lg text-black-400 ">{title}</Text>
        {externalLink}
      </View>
      <View className="relative">
        <TextInput
          editable={!disabled}
          placeholder={placeholder}
          value={value}
          onChangeText={(text) => onChange(text)}
          secureTextEntry={secureTextEntry && !isPasswordVisible} // Use the visibility toggle
          className="w-full py-6 text-lg px-4 font-Poppins-Medium bg-accent-200 text-black-400 rounded-xl"
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            className="absolute right-4 top-1/2 transform -translate-y-1/2"
          >
            {isPasswordVisible ? (
              <Eye color="#9E988B" className="w-6 h-6" />
            ) : (
              <EyeOff color="#9E988B" className="w-6 h-6" />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomInput;
