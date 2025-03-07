import React, { ReactNode } from "react";
import { Text } from "react-native";

type Props = {
  children: ReactNode;
  color?: string;
  className?: string;
};

export default function ColoredSmallText({
  children,
  color = "bg-green-500",
  className = "",
}: Props) {
  return (
    <Text className={`${color} ${className} text-xl font-Poppins-Medium `}>
      {children}
    </Text>
  );
}
