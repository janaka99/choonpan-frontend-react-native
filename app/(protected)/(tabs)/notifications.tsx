import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SectionTitle from "@/components/SectionTitle";
import images from "@/constants/icons";
import { useNotificationContext } from "@/context/NotificationContext";
import { Loader2 } from "lucide-react-native";
import CustomButton from "@/components/CustomButton";
import { formatPostgresDateTime } from "@/utils/formatDateTimePostGres";

type Props = {};

const Notifications = (props: Props) => {
  const [refreshing, setRefreshing] = useState(false);
  const {
    notifications,
    markAllAsRead,
    reloadNotification,
    isLoading,
    error,
    markAsRead,
    unreadCount,
  } = useNotificationContext();

  const onRefresh = async () => {
    setRefreshing(true);
    await reloadNotification();
    setRefreshing(false);
  };

  if (isLoading) {
    return (
      <View className="h-full flex justify-center items-center bg-transparent">
        <View className="animate-spin">
          <Loader2 color="#F1720C" size={40} />
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView className="h-full  pb-[75px] bg-[#f7f7f7]">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          gap: 6,
          marginBottom: 80,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="">
          <View className="px-8 pt-5">
            <SectionTitle title="Notifications" icon={images.ProductsIcon} />
          </View>
          {error ? (
            <View className="w-full flex-grow justify-center items-center gap-2">
              <Text className="text-lg">{`${error}`}</Text>
              <CustomButton
                text="Refresh"
                onClick={reloadNotification}
                width="w-fit"
                varient="small_accent"
              />
            </View>
          ) : (
            <View className="px-8 mt-6 gap-3">
              {unreadCount ? (
                unreadCount > 0 ? (
                  <CustomButton
                    varient="small_accent"
                    onClick={markAllAsRead}
                    text="Mark all as read"
                  />
                ) : null
              ) : null}
              {notifications.map((notification: any, i: any) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => markAsRead(notification.id)}
                  className={`w-full p-4 rounded-md bg-white ${
                    notification.isRead
                      ? "border border-white"
                      : "border border-accent-500"
                  }`}
                >
                  <Text className="font-Poppins-Black">
                    {notification.title}
                  </Text>
                  <Text>{notification.description}</Text>
                  <View className="flex-row justify-between">
                    <Text className="mt-2 text-sm text-right text-gray-700">
                      {formatPostgresDateTime(notification.updatedAt)}
                    </Text>
                    <Text className="mt-2 text-sm text-right text-red-400">
                      Mark as read
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notifications;
