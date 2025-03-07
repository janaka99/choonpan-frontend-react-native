import React, { useState } from "react";
import Card from "./Card";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import CustomButton from "./CustomButton";
import { Link, Redirect } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductSchema } from "@/schemas/product";
import { z } from "zod";
import CustomInput from "./CustomInput";
import axiosInstance from "@/utils/axiosInstance";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import SectionTitle from "./SectionTitle";
import NormalText from "./NormalText";

type Props = {
  update?: boolean;
  product?: any;
};

export default function AddStockCard({ update = false, product }: Props) {
  const [name, setName] = useState("");
  const [stock, setStock] = useState(0);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: product ? product.name : "",
      price: product ? product.price : 0.0,
      stock: product ? product.stock : 0,
      id: product ? product.id : null,
    },
  });

  const onSubmit = async (data: z.infer<typeof ProductSchema>) => {
    try {
      let action = update
        ? axiosInstance.post(`/products/update/${data.id}`, data)
        : axiosInstance.post(`/products/add`, data);
      const response = await action;
      if (response.data.error) {
        Toast.show({
          type: "error",
          text1: response.data.message,
        });
      } else {
        Toast.show({
          type: "success",
          text1: response.data.message,
        });
        reset({
          name: "",
          price: 0.0,
          stock: 0,
        });
        if (update) {
          return;
        }
        router.push("/products");
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Server error occured. Please try again later",
      });
    }
  };

  return (
    <Card>
      {update ? (
        <View>
          <View className="space-y-4 gap-5">
            <Text className="text-3xl text-black-400  font-Poppins-Medium">
              {product.name}
            </Text>
            {/* Product Name */}
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <CustomInput
                    disabled={isSubmitting}
                    value={value}
                    onChange={onChange}
                    title="Name"
                    placeholder="Bread"
                  />
                  {errors.name && (
                    <Text className="text-red-400 self-end">
                      {errors.name.message}
                    </Text>
                  )}
                </View>
              )}
            />
            {/* Price */}
            <Controller
              control={control}
              name="price"
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <CustomInput
                    disabled={isSubmitting}
                    value={value.toString()}
                    onChange={(text) => {
                      const formatted = text.replace(/[^0-9.]/g, ""); // Allow only numbers and dot
                      if (/^\d*\.?\d{0,2}$/.test(formatted)) {
                        onChange(formatted);
                      }
                    }}
                    title="Price (LKR)"
                    placeholder=""
                  />
                  {errors.price && (
                    <Text className="text-red-400 self-end">
                      {errors.price.message}
                    </Text>
                  )}
                </View>
              )}
            />

            {/* Stock */}
            <Controller
              control={control}
              name="stock"
              render={({ field: { onChange, value } }) => (
                <View className="flex-row items-center justify-center rounded-lg bg-white p-2">
                  {/* Minus Button */}
                  <TouchableOpacity
                    disabled={isSubmitting || value <= 0}
                    onPress={() => onChange(Math.max(0, value - 1))}
                    className="bg-gray-200 w-16 aspect-square rounded-full justify-center items-center"
                  >
                    <Text className="text-5xl font-bold">-</Text>
                  </TouchableOpacity>

                  {/* Stock Value */}

                  <Text className="px-10 text-2xl font-Poppins-Bold">
                    {value.toString()}
                  </Text>

                  {/* Plus Button */}
                  <TouchableOpacity
                    disabled={isSubmitting}
                    onPress={() => onChange(value + 1)}
                    className=" bg-accent-500 w-16 aspect-square rounded-full justify-center items-center "
                  >
                    <Text className="text-5xl font-bold text-white pt-2">
                      +
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            />

            {/* Submit Button */}
            <CustomButton
              text="Update Product"
              onClick={handleSubmit(onSubmit)}
              disabled={!isValid || isSubmitting}
              varient="small_accent"
            />
          </View>
        </View>
      ) : (
        <>
          <View className="flex-row justify-between items-center pl-2 mb-5">
            <Text className="font-Poppins-Bold text-3xl  text-gray-100 capitalize w-fit">
              Products
            </Text>
            <Link
              href="/products"
              className="w-14 aspect-square bg-accent-500 rounded-full justify-center items-center pl-1 "
            >
              <View className="h-full w-full flex justify-center items-center">
                <ChevronRight size={32} color="#ffffff" />
              </View>
            </Link>
          </View>

          <View className="space-y-4 gap-5">
            {/* Product Name */}
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <CustomInput
                    disabled={isSubmitting}
                    value={value}
                    onChange={onChange}
                    title="Name"
                    placeholder="Bread"
                  />
                  {errors.name && (
                    <Text className="text-red-400 self-end">
                      {errors.name.message}
                    </Text>
                  )}
                </View>
              )}
            />
            {/* Price */}
            <Controller
              control={control}
              name="price"
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <CustomInput
                    disabled={isSubmitting}
                    value={value.toString()}
                    onChange={(text) => {
                      const formatted = text.replace(/[^0-9.]/g, ""); // Allow only numbers and dot
                      if (/^\d*\.?\d{0,2}$/.test(formatted)) {
                        onChange(formatted);
                      }
                    }}
                    title="Price (LKR)"
                    placeholder=""
                  />
                  {errors.price && (
                    <Text className="text-red-400 self-end">
                      {errors.price.message}
                    </Text>
                  )}
                </View>
              )}
            />

            {/* Stock */}
            <Controller
              control={control}
              name="stock"
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <CustomInput
                    disabled={isSubmitting}
                    value={value.toString()}
                    onChange={(text) => {
                      const formatted = text.replace(/\D/g, ""); // Allow only numbers
                      onChange(formatted);
                    }}
                    title="Stock"
                    placeholder=""
                  />
                  {errors.price && (
                    <Text className="text-red-400 self-end">
                      {errors.price.message}
                    </Text>
                  )}
                </View>
              )}
            />

            {/* Submit Button */}
            <CustomButton
              text="Add Product"
              onClick={handleSubmit(onSubmit)}
              disabled={!isValid || isSubmitting}
            />
          </View>
        </>
      )}
    </Card>
  );
}
