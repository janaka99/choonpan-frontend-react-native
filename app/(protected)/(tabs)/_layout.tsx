import { View, Text } from "react-native";
import React from "react";
import { Redirect, Slot, Tabs } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { ChartColumn, House, Plus } from "lucide-react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/Fontisto";
import { SafeAreaView } from "react-native-safe-area-context";

const ProtectedLayout = () => {
  const { user } = useAuth();

  if (!user) return <Redirect href="/sign-in" />;

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          position: "absolute",
          borderTopColor: "#AAAAAA",
          borderTopWidth: 1,
          height: 75,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <Tabs.Screen
        name="dashboard-landing"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View className="flex-1 flex-col mt-1 items-center">
              <View className="w-16 aspect-square rounded-full  bg-[#EDF1FF] items-center justify-center">
                <House
                  className="h-4 text-accent-500"
                  color={focused ? "#737375" : "#BDBDBD"}
                  size={26}
                />
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="selectRoute"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View className="flex-1 flex-col mt-1 items-center">
              <View className="w-16 aspect-square rounded-full  bg-[#EDF1FF] items-center justify-center">
                <House
                  className="h-4 text-accent-500"
                  color={focused ? "#737375" : "#BDBDBD"}
                  size={26}
                />
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View className="flex-1 flex-col mt-1 items-center">
              <View className="w-16 aspect-square rounded-full   items-center justify-center">
                <ChartColumn
                  color={focused ? "#F1720C" : "#737375"}
                  size={26}
                  strokeWidth={3}
                />
              </View>
            </View>
          ),
        }}
      />

      {/* <Tabs.Screen
        name="selectRoute"
        options={{
          headerShown: false,
          tabBarIcon: () => null,
        }}
      /> */}
      <Tabs.Screen
        name="updateStock"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View className="flex-1 flex-col mt-1 items-center">
              <View className="w-16 aspect-square rounded-full   items-center justify-center">
                <Icon2
                  name="bell-alt"
                  color={focused ? "#F1720C" : "#737375"}
                  size={26}
                />
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View className="flex-1 flex-col mt-1 items-center">
              <View className="w-16 aspect-square rounded-full   items-center justify-center">
                <Icon
                  name="settings-sharp"
                  color={focused ? "#F1720C" : "#737375"}
                  size={26}
                />
              </View>
            </View>
          ),
        }}
      />
    </Tabs>
  );
};

export default ProtectedLayout;
