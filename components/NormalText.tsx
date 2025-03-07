import React, { ReactNode } from "react";
import { Text } from "react-native";

type Props = {
  color?: string;
  className?: string;
  children: ReactNode;
};

export default function NormalText({
  color = "text-gray-400",
  className = "",
  children,
}: Props) {
  return (
    <Text className={` ${color} ${className} text-xl font-Poppins-Medium`}>
      {children}
    </Text>
  );
}
