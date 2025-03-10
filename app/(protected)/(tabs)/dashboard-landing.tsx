import ManagerDashboard from "@/components/ManagerDashboard";
import UserDashboard from "@/components/UserDashboard";
import { useAuth } from "@/context/AuthContext";
import { Redirect } from "expo-router";
import React from "react";
import { View } from "react-native";

type Props = {};

export default function DashboardLanding({}: Props) {
  const { user, activeProfile } = useAuth();
  console.log(activeProfile);
  if (!user) return <Redirect href="/" />;

  if (activeProfile["employee"]) {
    return <UserDashboard />;
  }
  return <ManagerDashboard />;
}
