import { useContext, createContext, useState, useEffect } from "react";
import { ReactNode } from "react";
import axiosInstance from "@/utils/axiosInstance";
import Toast from "react-native-toast-message";
import { updateRoutes } from "@/utils/maphelp";
import { Try } from "expo-router/build/views/Try";

const OrderContext = createContext<undefined | any>(undefined);

const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [currentLocationUpdating, setCurrentLocationUpdating] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: string | number;
    longitude: string | number;
    name: string;
  } | null>({
    latitude: 6.924575,
    longitude: 79.987234,
    name: "",
  });
  const [otherDrivers, setOtherDrivers] = useState<{
    latitude: string | number;
    longitude: string | number;
  } | null>(null);

  const [routeInformationLoding, setRouteInformationLoding] = useState(true);
  const [demandItems, setDemandItems] = useState([]);
  const [journeyStarted, setJourneyStarted] = useState(false);
  const [orders, setOrders] = useState([]);
  const [availableRoutes, setAvailableRoutes] = useState<
    {
      id: number;
      route: { latitude: number; longitude: number }[];
    }[]
  >([]);

  const [selectedRoute, setSelectedRoute] = useState<{
    id: number;
    route: { latitude: number; longitude: number }[];
    orderInsights: any;
  } | null>(null);

  const updateCurrentLocation = async (
    latitude: string,
    longitude: string,
    name: string
  ) => {
    try {
      setCurrentLocationUpdating(true);
      const res = await axiosInstance.post(
        "/employee/location/update-current-location",
        {
          latitude,
          longitude,
          name,
        }
      );

      if (res.data.error) {
        Toast.show({
          type: "error",
          text1: res.data.message,
        });
        return;
      }
      setCurrentLocation(JSON.parse(res.data.location));
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Something Went wrong",
      });
    } finally {
      setCurrentLocationUpdating(false);
    }
  };

  const getCurrentLocation = async () => {
    try {
      setRouteInformationLoding(true);
      const res = await axiosInstance.get(
        "/employee/location/get-current-location"
      );
      if (res.data.error) {
        return null;
      }
      setCurrentLocation(JSON.parse(res.data.location));
    } catch (error) {
      return null;
    } finally {
      setRouteInformationLoding(false);
    }
  };

  const getLocationAndRouteInformation = async () => {
    try {
      setRouteInformationLoding(true);
      const res = await axiosInstance.get("/employee/route");
      if (res.data.error) {
        return null;
      }
      setDemandItems(JSON.parse(res.data.demandItems));
      setOrders(JSON.parse(res.data.orders));
      setOtherDrivers(JSON.parse(res.data.otherDrivers));
      const pr = JSON.parse(res.data.possibleRoutes);

      if (pr) {
        const possibleRoutes = await updateRoutes(pr);
        if (possibleRoutes) {
          setSelectedRoute(possibleRoutes[0]);
          setAvailableRoutes(possibleRoutes);
        } else {
          setSelectedRoute(null);
        }
      } else {
        setSelectedRoute(null);
      }
    } catch (error) {
      return null;
    } finally {
      setRouteInformationLoding(false);
    }
  };

  useEffect(() => {
    getLocationAndRouteInformation();
  }, [currentLocation]);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const contextData = {
    currentLocation,
    availableRoutes,
    demandItems,
    orders,
    updateCurrentLocation,
    getLocationAndRouteInformation,
    routeInformationLoding,
    currentLocationUpdating,
    selectedRoute,
    setSelectedRoute,
    journeyStarted,
    setJourneyStarted,
    otherDrivers,
  };
  return (
    <OrderContext.Provider value={contextData}>
      {children}
    </OrderContext.Provider>
  );
};

const useOrderContext = () => {
  return useContext(OrderContext);
};

export { useOrderContext, OrderContext, OrderProvider };
