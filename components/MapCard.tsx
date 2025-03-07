import React, { useEffect, useState } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import Card from "./Card";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import FeatherIcon from "react-native-vector-icons/Feather";
import Icon from "react-native-vector-icons/MaterialIcons";
import { ChevronRight } from "lucide-react-native";
import { getRandomLocationsAcross } from "@/utils/getRandomLocationsAcross";
import { Link, Redirect } from "expo-router";

type Props = {
  location: any;
};

export default function MapCard({ location }: Props) {
  const [locations, setLocations] = useState<
    { latitude: number; longitude: number }[]
  >([]);
  const [center, setCenter] = useState(location);
  console.log(location);
  const getCenter = (lcs: any) => {
    const c = {
      latitude:
        lcs.reduce((acc: any, c: any) => (acc += c.latitude), 0) / lcs.length,
      longitude:
        lcs.reduce((acc: any, c: any) => (acc += c.longitude), 0) / lcs.length,
    };
    setCenter(c);
  };

  useEffect(() => {
    if (location) {
      const lcs = getRandomLocationsAcross(
        location.latitude,
        location.longitude,
        20
      );
      getCenter(lcs);
      setLocations(lcs);
    }
  }, [location]);

  return (
    <Card className=" w-full  ">
      <View className="flex-row justify-between items-center pl-2 mb-5">
        <Text className="font-Poppins-Bold text-3xl  text-gray-100 capitalize w-fit">
          ROUTES
        </Text>
        <Link
          href="/selectRoute"
          className="w-14 aspect-square bg-accent-500 rounded-full justify-center items-center pl-1 "
        >
          <View className="h-full w-full flex justify-center items-center">
            <ChevronRight size={32} color="#ffffff" />
          </View>
        </Link>
      </View>
      <View className="rounded-xl overflow-hidden w-full aspect-square">
        <MapView
          style={MapStyles.map}
          initialRegion={{
            // latitude: center.latitude - 0.015, // 0.015 accounts for the bottom sheet height (372px)
            latitude: center.latitude - 0.015, // 0.015 accounts for the bottom sheet height (372px)
            longitude: center.longitude,
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
              <Marker coordinate={lc} key={i}>
                <View style={MapStyles.marker}>
                  <FontAwesome name="shopping-basket" color="#fff" size={15} />
                </View>
              </Marker>
            ))}

          {/* <Polyline
            coordinates={coordinates}
            strokeColor="#000"
            strokeWidth={3}
          /> */}
        </MapView>
      </View>
    </Card>
  );
}

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
