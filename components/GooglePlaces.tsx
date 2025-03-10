import { JOHNS_BAKERY_LOCATION } from "@/constants/data";
import { useOrderContext } from "@/context/order/OrderContext";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

const GooglePlaces = ({ setLocationSearchingOn }: any) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const { updateCurrentLocation } = useOrderContext();

  // Replace with your own Google Places API Key
  const GOOGLE_PLACES_API_KEY = "AIzaSyC1b4-xnb7a8Wfigq8yZGZ8IqkOshrEQ9c";

  // Function to fetch place suggestions
  const fetchPlaceSuggestions = async (query: string) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    setLoading(true);

    const endpoint = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&key=${GOOGLE_PLACES_API_KEY}`;

    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      setSuggestions(data.predictions); // Save the suggestions into the state
    } catch (error) {
      console.error("Error fetching place suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPlaceDetails = async (place_id: string) => {
    const endpoint = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${GOOGLE_PLACES_API_KEY}`;

    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      console.log();
      const location = data.result.geometry.location;
      updateCurrentLocation(location.lat, location.lng, data.result.name);
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
  };

  // Handle input change
  const handleSearchQueryChange = (query: string) => {
    setSearchQuery(query);
    fetchPlaceSuggestions(query); // Fetch suggestions on input change
  };

  const handle = () => {
    setLocationSearchingOn(false);
    updateCurrentLocation(
      JOHNS_BAKERY_LOCATION.latitude,
      JOHNS_BAKERY_LOCATION.longitude,
      JOHNS_BAKERY_LOCATION.name
    );
  };

  return (
    <View className="w-full p-2 z-40 px-8   absolute top-20 ">
      <View className="w-full bg-white ">
        <TextInput
          value={searchQuery}
          onChangeText={handleSearchQueryChange}
          placeholder="Search for a place"
          style={{
            borderWidth: 1,
            borderColor: "gray",
            padding: 10,
            marginVertical: 10,
            borderRadius: 5,
          }}
        />

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={{ marginTop: 20 }}
          />
        ) : (
          <>
            <TouchableOpacity onPress={handle}>
              <View
                style={{
                  padding: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: "gray",
                }}
              >
                <Text style={{ fontSize: 18 }}>
                  {JOHNS_BAKERY_LOCATION.name}
                </Text>
              </View>
            </TouchableOpacity>
            {suggestions.map((item: any, key: any) => (
              <TouchableOpacity
                key={key}
                onPress={() => fetchPlaceDetails(item.place_id)}
              >
                <View
                  style={{
                    padding: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: "gray",
                  }}
                >
                  <Text style={{ fontSize: 18 }}>{item.description}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </>
        )}
      </View>
    </View>
  );
};

export default GooglePlaces;
