import ManagerDashboard from "@/components/ManagerDashboard";
import UserDashboard from "@/components/UserDashboard";
import { useAuth } from "@/context/AuthContext";
import React from "react";
import { View } from "react-native";

type Props = {};

export default function DashboardLanding({}: Props) {
  const { user, activeProfile, setac } = useAuth();

  if (activeProfile["employee"]) {
    return <UserDashboard />;
  }
  return <ManagerDashboard />;
}
