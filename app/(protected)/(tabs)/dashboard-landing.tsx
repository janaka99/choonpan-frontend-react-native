import ManagerDashboard from "@/components/ManagerDashboard";
import UserDashboard from "@/components/UserDashboard";
import { useAuth } from "@/context/AuthContext";
import { Redirect } from "expo-router";
import React from "react";

type Props = {};

export default function DashboardLanding({}: Props) {
  const { user, activeProfile } = useAuth();
  if (!user) return <Redirect href="/" />;

  if (activeProfile["employee"]) {
    return <UserDashboard />;
  }
  return <ManagerDashboard />;
}
