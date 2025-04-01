import { useContext, createContext, useState, useEffect } from "react";
import { ReactNode } from "react";
import axiosInstance from "@/utils/axiosInstance";
import Toast from "react-native-toast-message";
import { updateRoutes } from "@/utils/maphelp";
import * as Location from "expo-location";
import { findNearestPoint } from "@/utils/findNearestPoint";

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
  // const [demandItems, setDemandItems] = useState([]);
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

  const [liveLocation, setLiveLocation] = useState<{
    latitude: string | number;
    longitude: string | number;
  } | null>(null);

  const [currentJourneyUpdating, setCurrentJourneyUpdating] = useState(false);
  const [currentJourneyEnding, setCurrentJourneyEnding] = useState(false);
  const [currentJourney, setCurrentJourney] = useState<any>(null);
  const [remainingRoute, setRemainingRoute] = useState<any>(null);

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
      // setDemandItems(JSON.parse(res.data.demandItems));
      setOrders(JSON.parse(res.data.orders));
      setOtherDrivers(JSON.parse(res.data.otherDrivers));
      if (res.data.journey) {
        setCurrentJourney(JSON.parse(res.data.journey));
      }
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

  // {langitude: number, longitude:number}[]
  const startJourney = async (journey: any) => {
    try {
      setCurrentJourneyUpdating(true);
      const res = await axiosInstance.post("/employee/journey/start", {
        journey: JSON.stringify(journey),
      });

      if (res.data.error == false) {
        setCurrentJourney(JSON.parse(res.data.journey));
      }
      if (res.data.message) {
        Toast.show({
          text1: res.data.message,
        });
      }
      return null;
    } catch (error) {
      console.log("Journey start error ", error);
      return null;
    } finally {
      setCurrentJourneyUpdating(false);
    }
  };

  const endJourney = async (journeyId: any) => {
    try {
      setCurrentJourneyEnding(true);
      const res = await axiosInstance.post("/employee/journey/end", {
        id: journeyId,
      });

      if (res.data.error == false) {
        // getLocationAndRouteInformation();
        setCurrentJourney(null);
      }
      if (res.data.message) {
        Toast.show({
          text1: res.data.message,
        });
      }
      return null;
    } catch (error) {
      console.log(error);
      Toast.show({
        text1: "Something Went Wrong. Try  again.",
      });
      return null;
    } finally {
      setCurrentJourneyEnding(false);
    }
  };

  // const getLiveLocation = async () => {
  //   try {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       return;
  //     }

  //     let loc = await Location.getCurrentPositionAsync({});
  //     setLiveLocation({
  //       latitude: loc.coords.latitude,
  //       longitude: loc.coords.longitude,
  //     });
  //   } catch (error) {
  //     console.log("Live location error ", error);
  //   }
  // };

  useEffect(() => {
    (async () => {
      // Request location permissions
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }
      try {
        // Start watching location updates
        const subscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 2000,
            distanceInterval: 5,
          },
          (newLocation) => {
            setLiveLocation({
              latitude: newLocation.coords.latitude,
              longitude: newLocation.coords.longitude,
            });
          }
        );

        return () => subscription.remove(); // Cleanup on unmount
      } catch (error) {
        setLiveLocation(null);
      }
    })();
  }, []);

  useEffect(() => {
    if (currentJourney && liveLocation && currentLocation) {
      const fetchCurrentLocation = async () => {
        // Find nearest point in the route
        const nearestIndex = findNearestPoint(
          liveLocation,
          currentJourney.route
        );
        // Extract the remaining route from the nearest point onward
        const remainingRouteFromNearest =
          currentJourney.route.slice(nearestIndex);
        // Ensure live location is at the start of the remaining route
        const updatedRemainingRoute = [
          {
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          },
          ...remainingRouteFromNearest,
        ];

        setRemainingRoute(updatedRemainingRoute);
      };

      fetchCurrentLocation();
    }
  }, []);

  useEffect(() => {
    getLocationAndRouteInformation();
  }, [currentLocation]);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const contextData = {
    currentLocation,
    availableRoutes,
    // demandItems,
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
    currentJourney,
    remainingRoute,
    currentJourneyUpdating,
    startJourney,
    currentJourneyEnding,
    endJourney,
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
