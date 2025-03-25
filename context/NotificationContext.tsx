import { useContext, createContext, useState, useEffect } from "react";
import { ReactNode } from "react";
import * as Location from "expo-location";
import axiosInstance from "@/utils/axiosInstance";

const NotificationContext = createContext<undefined | any>(undefined);

const notificationSamples = [
  {
    title: "Low Stock",
    description: "Item one, two and three low on stock",
    isRead: false,
    id: 1,
  },
  {
    title: "Low Stock",
    description: "Item one, two and three low on stock",
    isRead: true,
    id: 2,
  },
  {
    title: "Low Stock",
    description: "Item one, two and three low on stock",
    isRead: false,
    id: 3,
  },
  {
    title: "Low Stock",
    description: "Item one, two and three low on stock",
    isRead: false,
    id: 3,
  },
  {
    title: "Low Stock",
    description: "Item one, two and three low on stock",
    isRead: false,
    id: 3,
  },
  {
    title: "Low Stock",
    description: "Item one, two and three low on stock",
    isRead: false,
    id: 3,
  },
  {
    title: "Low Stock",
    description: "Item one, two and three low on stock",
    isRead: false,
    id: 3,
  },
  {
    title: "Low Stock",
    description: "Item one, two and three low on stock",
    isRead: false,
    id: 3,
  },
  //   {
  //     title: "Low Stock",
  //     description: "Item one, two and three low on stock",
  //     isRead: false,
  //     id: 3,
  //   },
  //   {
  //     title: "Low Stock",
  //     description: "Item one, two and three low on stock",
  //     isRead: false,
  //     id: 3,
  //   },
];

const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const [unreadCount, setUnreadCount] = useState<null | number>(0);

  const getAllNotifications = async () => {
    try {
      setError(null);
      const res = await axiosInstance.get("/employee/notifications/get");
      if (res.data.error) {
        setError(res.data.message);
      } else if (res.data.notifications) {
        const notififications = JSON.parse(res.data.notifications);
        setNotifications(notififications);
      }
    } catch (error) {
      setError("Failed to load notifications");
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (id: number) => {
    try {
      setError(null);
      const res = await axiosInstance.post(
        `/employee/notifications/${id}/mark-as-read`
      );
      if (res.data.error) {
        return;
      }
      if (!res.data.error) {
        const noti = JSON.parse(res.data.notifications);
        setNotifications(noti);
      }
      getUnreadNotificationCount();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const markAllAsRead = async () => {
    try {
      setError(null);
      const res = await axiosInstance.post(
        `/employee/notifications/mark-all-read`
      );
      if (res.data.error) {
        return;
      }
      if (!res.data.notifications) {
        setUnreadCount(0);
        const noti = JSON.parse(res.data.notifications);
        setNotifications(noti);
        getUnreadNotificationCount();
        getAllNotifications();
      }
      getUnreadNotificationCount();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const getUnreadNotificationCount = async () => {
    try {
      const res = await axiosInstance.get(
        `/employee/notifications/unread-count`
      );
      if (res.data.count) {
        const count = Number(res.data.count);
        if (!isNaN(count) && count > 0) {
          setUnreadCount(count);
        } else {
          setUnreadCount(0);
        }
      }
    } catch (error) {
      setUnreadCount(0);
    }
  };

  const reloadNotification = async () => {
    try {
      setIsLoading(true);
      await getAllNotifications();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    reloadNotification();
    getUnreadNotificationCount();
  }, []);

  const contextData = {
    notifications,
    getAllNotifications,
    reloadNotification,
    markAsRead,
    isLoading,
    error,
    getUnreadNotificationCount,
    unreadCount,
    markAllAsRead,
  };
  return (
    <NotificationContext.Provider value={contextData}>
      {children}
    </NotificationContext.Provider>
  );
};

const useNotificationContext = () => {
  return useContext(NotificationContext);
};

export { useNotificationContext, NotificationContext, NotificationProvider };
