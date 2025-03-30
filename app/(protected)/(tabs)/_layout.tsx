import { View, Text } from "react-native";
import React from "react";
import { Redirect, Tabs } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { ChartColumn, House, Plus } from "lucide-react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/Fontisto";
import { useNotificationContext } from "@/context/NotificationContext";
import { PROFILES } from "@/constants/data";

const ProtectedLayout = () => {
  const { user, activeProfile } = useAuth();
  const { unreadCount } = useNotificationContext();
  if (!user) return <Redirect href="/sign-in" />;

  const isManager = activeProfile[PROFILES.manager] ? true : false;

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
      {isManager ? (
        <Tabs.Screen
          name="new-employee"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View className="flex-1 flex-col mt-1 items-center">
                <View className="w-16 aspect-square rounded-full  bg-accent-500 items-center justify-center">
                  <Plus color={"#ffffff"} size={26} />
                </View>
              </View>
            ),
          }}
        />
      ) : (
        <Tabs.Screen
          name="new-employee"
          options={{
            href: null,
            headerShown: false,
          }}
        />
      )}
      <Tabs.Screen
        name="notifications"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View className="flex-1 flex-col mt-1 items-center">
              <View className="w-16 aspect-square rounded-full   items-center justify-center realtive">
                <Icon2
                  name="bell-alt"
                  color={focused ? "#F1720C" : "#737375"}
                  size={26}
                />
                <View className="absolute top-0 right-0">
                  <Text className="text-accent-500 font-Poppins-Bold text-lg">
                    {unreadCount == 0 ? "" : unreadCount.toString()}
                  </Text>
                </View>
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
      <Tabs.Screen
        name="products"
        options={{
          href: null,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="updateStock"
        options={{
          href: null,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="selectRoute"
        options={{
          href: null,
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
      />
      <Tabs.Screen
        name="employee/[userid]"
        options={{
          href: null,
          headerShown: false,
        }}
      />
    </Tabs>
  );
};

export default ProtectedLayout;
