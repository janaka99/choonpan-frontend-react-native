import { View, Text, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import { getRandomLocationsAcross } from "@/utils/getRandomLocationsAcross";
import MapView, { Marker, Polyline } from "react-native-maps";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import polyline from "@mapbox/polyline";
import {
  categorizeOrders,
  getBestRoute,
  getRoute,
} from "@/utils/categorizedOrders";
import { ALL_ORDERS, ROUTE_WITH_ORDERS } from "@/constants/tempory";
import { getRoutes } from "@/constants/maphelp";
import MapHeader from "@/components/MapHeader";
type Props = {};

export const options = {
  headerShown: false, // Hide the header for this screen
};

const selectRoute = (props: Props) => {
  const [locations, setLocations] =
    useState<{ latitude: number; longitude: number }[]>(ALL_ORDERS);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>({
    latitude: 6.924575,
    longitude: 79.987234,
  });
  const [center, setCenter] = useState({
    latitude: 6.924575,
    longitude: 79.987234,
  });
  const [routes, setRoutes] = useState<
    { latitude: number; longitude: number }[]
  >([]);
  const getCenter = (lcs: any) => {
    const c = {
      latitude:
        lcs.reduce((acc: any, c: any) => (acc += c.latitude), 0) / lcs.length,
      longitude:
        lcs.reduce((acc: any, c: any) => (acc += c.longitude), 0) / lcs.length,
    };
    setCenter(c);
  };

  const updateRoutes = async (orders: any, driverLocation: any) => {
    const data = await getRoute(orders, driverLocation);
    if (data.routes.length > 0) {
      // Ensure routes exist
      const encodedPolyline = data.routes[0].overview_polyline.points; // Extract polyline
      const decodedPoints = polyline.decode(encodedPolyline).map((point) => ({
        latitude: point[0],
        longitude: point[1],
      }));

      setRoutes(decodedPoints); // Store route in state
    }
  };

  useEffect(() => {
    if (location && locations) {
      getCenter(locations);
      const blRoutes = getRoutes(location, locations);
      updateRoutes(blRoutes["southToWest"], location);
    }
  }, [location]);
  return (
    <>
      <SafeAreaView className="rounded-xl flex-grow overflow-hidden w-full ">
        <MapHeader title="SELECT ROUTE" />
        <MapView
          style={MapStyles.map}
          region={{
            latitude: location ? location.latitude : center.latitude,
            longitude: location ? location.longitude : center.longitude,
            latitudeDelta: 0.004,
            longitudeDelta: 0.004,
          }}
        >
          {location && location && (
            <Marker coordinate={location}>
              <View style={MapStyles.marker}>
                <FontAwesome name="shopping-basket" color="#fa0000" size={15} />
              </View>
            </Marker>
          )}

          {locations &&
            locations.map((lc, i) => (
              <Marker
                key={i} // unique key based on both route and order indices
                coordinate={{
                  latitude: lc.latitude,
                  longitude: lc.longitude,
                }}
              >
                <View style={MapStyles.marker}>
                  <FontAwesome name="shopping-basket" color="#fff" size={15} />
                </View>
              </Marker>
            ))}

          {routes.length > 1 && (
            <Polyline coordinates={routes} strokeWidth={3} strokeColor="#00f" />
          )}
        </MapView>
      </SafeAreaView>
    </>
  );
};

export default selectRoute;

const MapStyles = StyleSheet.create({
  map: {
    flex: 1,
  },
  marker: {
    width: 30,
    height: 30,
    backgroundColor: "#000",
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
  },
});
