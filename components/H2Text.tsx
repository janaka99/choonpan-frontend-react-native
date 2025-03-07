import { View, Text } from "react-native";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  color?: string;
  className?: string;
};

const H2Text = ({ children, color = "text-black", className = "" }: Props) => {
  return (
    <Text className={`text-4xl  font-Poppins-Bold  ${color} ${className}`}>
      {children}
    </Text>
  );
};

export default H2Text;
