import React, { useEffect, useState } from "react";
import SalesComponent from "./SalesComponent";
import { formatNumber } from "@/utils/formatPrice";
import images from "@/constants/icons";
import Toast from "react-native-toast-message";
import axiosInstance from "@/utils/axiosInstance";

export default function EmployeeSalesCard({
  userid,
}: {
  userid: string | number;
}) {
  const [totalSales, setTotalSales] = useState<null | number>(null);
  const [totalRevenue, setTotalRevenue] = useState<null | number>(null);
  const [SalesLoading, setSalesLoading] = useState(true);

  const fetchSalesData = async () => {
    setSalesLoading(true);
    try {
      const res = await axiosInstance.get(`/employee/stats/${userid}/sales`);
      if (res.data.error) {
        Toast.show({
          type: "error",
          text1: res.data.message,
        });
        return;
      }
      setTotalSales(res.data.sales.totalSales);
      setTotalRevenue(res.data.sales.totalRevenue);
      setSalesLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    fetchSalesData();
  }, [userid]);

  return (
    <>
      <SalesComponent
        title="Sales"
        sales={formatNumber(totalSales)}
        upby="12%"
        background="bg-accent-50"
        icon={images.CartIconAccent}
        loading={SalesLoading}
      />
      <SalesComponent
        title="Total Revenue"
        sales={formatNumber(totalRevenue)}
        upby="14%"
        background="bg-custom-blue-50"
        icon={images.DollarIconBlue}
        loading={SalesLoading}
      />
    </>
  );
}
