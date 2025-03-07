import React, { ReactNode } from "react";
import { View } from "react-native";

type Props = {
  className?: string;
  children: ReactNode;
};

export default function Card({ className, children }: Props) {
  return (
    <View className={`p-5 rounded-xl bg-white ${className}`}>{children}</View>
  );
}
