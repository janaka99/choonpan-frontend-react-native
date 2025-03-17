import React from "react";
import { Redirect, Slot } from "expo-router";
import { useAuth } from "@/context/AuthContext";

const ProtectedLayout = () => {
  const { user } = useAuth();

  if (!user) return <Redirect href="/sign-in" />;

  return <Slot />;
};

export default ProtectedLayout;
