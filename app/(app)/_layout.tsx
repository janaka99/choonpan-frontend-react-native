import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Redirect, Slot } from "expo-router";

const NormalLayout = () => {
  const { user } = useAuth();
  return user ? <Redirect href="/" /> : <Slot />;
};

export default NormalLayout;
