import { View, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import images from "@/constants/icons";
import { useOrderContext } from "@/context/order/OrderContext";
import { useLocationContext } from "@/context/liveLocationContext";

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
    otherDrivers,
    currentJourney,
    remainingRoute,
  } = useOrderContext();

  const { liveLocation } = useLocationContext();

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
      {liveLocation && (
        <Marker
          coordinate={{
            latitude: Number(liveLocation.latitude),
            longitude: Number(liveLocation.longitude),
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
      {otherDrivers &&
        otherDrivers.map((lc: any, i: any) => (
          <Marker
            key={i}
            coordinate={{
              latitude: Number(lc.latitude),
              longitude: Number(lc.longitude),
            }}
          >
            <View className="w-10 h-10">
              <Image source={images.OtherDriver} className="w-full  h-full " />
            </View>
          </Marker>
        ))}
      {currentJourney
        ? currentJourney.route && (
            <Polyline
              coordinates={currentJourney.route}
              strokeWidth={5}
              strokeColor={"#F1720C"}
              tappable
            />
          )
        : availableRoutes.length >= 1 &&
          availableRoutes.map((rt: any, i: any) => {
            return (
              <Polyline
                key={i}
                coordinates={rt.route}
                strokeWidth={5}
                strokeColor={
                  selectedRoute
                    ? selectedRoute.id == rt.id
                      ? "#F1720C"
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
    backgroundColor: "#169CE8",
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
  },
  person: {
    width: 40,
    height: 40,
  },
  driver: {
    width: 50,
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
