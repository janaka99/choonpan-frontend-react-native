import { View, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import images from "@/constants/icons";
import { useOrderContext } from "@/context/order/OrderContext";

type Props = {};

const MapViewComponent = () => {
  const {
    currentLocation,
    availableRoutes,
    orders,
    routeInformationLoding,
    currentLocationUpdating,
    selectedRoute,
    setSelectedRoute,
  } = useOrderContext();

  const onMarkerClick = (rt: any) => {
    setSelectedRoute(rt);
  };

  if (routeInformationLoding || currentLocationUpdating) {
    return <View className="w-full h-full bg-gray-50"></View>;
  }

  return (
    <MapView
      style={MapStyles.map}
      region={{
        latitude: Number(currentLocation.latitude),
        longitude: Number(currentLocation.longitude),
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
      }}
    >
      {currentLocation && (
        <Marker
          coordinate={{
            latitude: Number(currentLocation.latitude),
            longitude: Number(currentLocation.longitude),
          }}
        >
          <View style={MapStyles.person}>
            <Image
              source={images.DriversIcon}
              className="w-full object-contain "
            />
          </View>
        </Marker>
      )}
      {orders &&
        orders.map((lc: any, i: any) => (
          <Marker
            key={i}
            coordinate={{
              latitude: Number(lc.latitude),
              longitude: Number(lc.longitude),
            }}
          >
            <View style={MapStyles.marker}>
              <FontAwesome name="shopping-basket" color="#fff" size={15} />
            </View>
          </Marker>
        ))}

      {availableRoutes.length >= 1 &&
        availableRoutes.map((rt: any, i: any) => {
          return (
            <Polyline
              key={i}
              coordinates={rt.route}
              strokeWidth={5}
              strokeColor={
                selectedRoute
                  ? selectedRoute.id == rt.id
                    ? "#00f"
                    : "#bebebe"
                  : "#bebebe"
              }
              onPress={() => onMarkerClick(rt)}
              tappable
            />
          );
        })}
    </MapView>
  );
};

export default MapViewComponent;

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
  person: {
    width: 40,
    height: 40,
  },
});
