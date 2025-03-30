import { useContext, createContext, useState, useEffect } from "react";
import { ReactNode } from "react";
import * as Location from "expo-location";

const LocationContext = createContext<undefined | any>(undefined);

const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [liveLocation, setLiveLocation] = useState<{
    latitude: string | number;
    longitude: string | number;
  } | null>(null);

  const getLiveLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLiveLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
    } catch (error) {
      console.log("Live location error ", error);
    }
  };

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

  const contextData = {
    liveLocation,
    getLiveLocation,
  };
  return (
    <LocationContext.Provider value={contextData}>
      {children}
    </LocationContext.Provider>
  );
};

const useLocationContext = () => {
  return useContext(LocationContext);
};

export { useLocationContext, LocationContext, LocationProvider };
