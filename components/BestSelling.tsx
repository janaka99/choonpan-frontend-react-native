import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SingleUserRow from "./SingleUserRow";
import axiosInstance from "@/utils/axiosInstance";
import Toast from "react-native-toast-message";
import { Calendar } from "react-native-calendars";
import { CalendarDays } from "lucide-react-native";

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function BestSelling() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(today.getDate() - 30);

  const [selectedRange, setSelectedRange] = useState({
    start: formatDate(thirtyDaysAgo),
    end: formatDate(yesterday),
  });

  const [title, setTitle] = useState(
    `${formatDate(thirtyDaysAgo)} - ${formatDate(yesterday)}`
  );

  const fetchEmployees = async () => {
    setIsLoading(true);
    try {
      const params = {
        startDate: selectedRange.start,
        endDate: selectedRange.end,
      };
      const res = await axiosInstance.get("/employee/products/best-selling", {
        params,
      });
      if (res.data.error) {
        Toast.show({
          type: "error",
          text1: res.data.message,
        });
        return;
      }
      setProducts(res.data.products);
      setTitle(res.data.range);
      setIsLoading(false);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Internal server error",
      });
    }
  };

  const getDataFrom = (startDate: any, endDate: any) => {
    setSelectedRange({
      start: startDate,
      end: endDate,
    });
  };

  useEffect(() => {
    fetchEmployees();
  }, [selectedRange]);

  return (
    <View className="p-5 rounded-xl bg-white gap-4 ">
      <TouchableOpacity onPress={fetchEmployees}>
        <Text>Fetch fuckers</Text>
      </TouchableOpacity>
      <View className="flex-row justify-between items-center pl-2">
        <Text className="font-Poppins-Bold text-3xl  text-black capitalize w-fit">
          Employees
        </Text>
        <View>
          <DateRangePicker getDataFrom={getDataFrom} title={title} />
        </View>
      </View>
      {isLoading ? (
        <View className="w-full gap-4">
          <View className="w-full bg-gray-50 animate-pulse h-10 rounded-3xl"></View>
          <View className="w-full bg-gray-50 animate-pulse h-10 rounded-3xl"></View>
          <View className="w-full bg-gray-50 animate-pulse h-10 rounded-3xl"></View>
          <View className="w-full bg-gray-50 animate-pulse h-10 rounded-3xl"></View>
        </View>
      ) : (
        <>
          <View className="w-full bg-gray-200 flex-row px-4 py-3 rounded-2xl items-center ">
            <Text className="text-base font-Poppins-Bold text-gray-400 w-8/12">
              Product Name
            </Text>
            <Text className="text-base text-center  font-Poppins-Bold text-gray-400 w-2/12">
              Stock
            </Text>
            <Text className="text-base  text-center  bg-red-300font-Poppins-Bold text-gray-400 w-2/12">
              Sale
            </Text>
          </View>
          <View className="w-full">
            {products &&
              products.map((prd: any, i) => (
                <View
                  key={i}
                  className="bg-gray-200/50 flex-row px-4 py-3 rounded-2xl items-center mt-1 "
                >
                  <Text className="text-base font-Poppins-Bold text-gray-400 w-8/12">
                    {prd.name}
                  </Text>
                  <Text className="text-base text-center  font-Poppins-Bold text-gray-400  w-2/12">
                    {prd.totalSoldUnits}
                  </Text>
                  <Text className="text-base  text-center font-Poppins-Bold text-gray-400  w-2/12">
                    {prd.sales}
                  </Text>
                </View>
              ))}
          </View>
        </>
      )}
    </View>
  );
}

const DateRangePicker = ({ getDataFrom, title }: any) => {
  const [selectedStartDate, setSelectedStartDate] = useState<any>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<any>(null);
  const [dateRangeLabel, setDateRangeLabel] = useState("Select Date Range");
  const [modalVisible, setModalVisible] = useState(false);

  // Handle date selection
  const handleDateSelect = (date: any) => {
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
      setDateRangeLabel(`Start Date: ${date}`);
    } else {
      setSelectedEndDate(date);
      setDateRangeLabel(`From ${selectedStartDate} to ${date}`);
    }
  };

  // Set the marked dates for the calendar
  const getMarkedDates = () => {
    let markedDates: { [key: string]: any } = {};
    if (selectedStartDate && selectedEndDate) {
      markedDates = {
        [selectedStartDate]: {
          selected: true,
          marked: true,
          selectedColor: "blue",
          selectedTextColor: "white",
        },
        [selectedEndDate]: {
          selected: true,
          marked: true,
          selectedColor: "blue",
          selectedTextColor: "white",
        },
        ...getDatesInRange(selectedStartDate, selectedEndDate),
      };
    } else if (selectedStartDate) {
      markedDates[selectedStartDate] = {
        selected: true,
        marked: true,
        selectedColor: "blue",
      };
    }
    return markedDates;
  };

  // Utility function to get all dates between two selected dates
  const getDatesInRange = (startDate: any, endDate: any) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dates: { [key: string]: any } = {};
    let currentDate = start;

    while (currentDate <= end) {
      const dateString = currentDate.toISOString().split("T")[0];
      dates[dateString] = {
        selected: true,
        marked: true,
        selectedColor: "blue",
      };
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  const handleSelect = () => {
    if (selectedStartDate && selectedEndDate) {
      getDataFrom(selectedStartDate, selectedEndDate); // Pass dates to the function
      setModalVisible(false); // Close the modal after selection
    } else {
      alert("Please select a date range");
    }
  };

  return (
    <View className="flex-1 justify-center items-center p-5">
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="bg-gray-50/50 px-4 py-3 rounded-xl text-gray-300"
      >
        <View className="flex-row gap-2 items-center">
          <Text>{title}</Text>
          <CalendarDays color="#616165" />
        </View>
      </TouchableOpacity>
      {/* Modal for Calendar */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-gray-50/60 bg-opacity-50">
          <View className="bg-white p-5 rounded-lg w-4/5 max-w-lg">
            <Calendar
              markedDates={getMarkedDates()}
              onDayPress={(day: any) => handleDateSelect(day.dateString)}
              markingType={"period"} // Use period marking to show a range
              monthFormat={"yyyy MM"}
              hideExtraDays={true} // Hide days of the previous/next month
              firstDay={1} // Start the week on Monday
            />

            <View className="flex-row justify-between">
              <TouchableOpacity
                className="mt-5 bg-primary py-3 px-5 rounded-md"
                onPress={() => setModalVisible(false)}
              >
                <Text className="text-black text-center">Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="mt-5 bg-primary py-3 px-5 rounded-md"
                onPress={handleSelect}
              >
                <Text className="text-black text-center">Select</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
