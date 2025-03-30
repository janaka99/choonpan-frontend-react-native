import { View, Text, ScrollView, RefreshControl } from "react-native";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Redirect, router } from "expo-router";
import Container from "@/components/Container";
import PublicHeader from "@/components/PublicHeader";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmployeeRegisterSchema, VendorSignUpSchema } from "@/schemas/user";
import { z } from "zod";
import Toast from "react-native-toast-message";
import { PROFILES } from "@/constants/data";
import { SafeAreaView } from "react-native-safe-area-context";
import SectionTitle from "@/components/SectionTitle";
import images from "@/constants/icons";

const NewEmployee = () => {
  const { user, activeProfile, registerNewEmployee } = useAuth();

  if (!user) return <Redirect href="/" />;
  const isManager = activeProfile[PROFILES.manager] || null;

  if (!isManager) {
    return <Redirect href="/" />;
  }

  if (!isManager.bakery?.id) {
    return <Redirect href="/" />;
  }

  const [refreshing, setRefreshing] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, dirtyFields, defaultValues },
  } = useForm({
    resolver: zodResolver(EmployeeRegisterSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      bakery_id: isManager.bakery.id.toString(),
    },
  });
  console.log(errors, dirtyFields);
  const onSubmit = async (data: z.infer<typeof EmployeeRegisterSchema>) => {
    const res = await registerNewEmployee(data);
    if (res.error) {
      Toast.show({
        type: "error",
        text1: res.message,
      });
    } else {
      Toast.show({
        type: "success",
        text1: res.message,
      });
      router.push("/");
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <SafeAreaView className="h-full pb-[75px] ">
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flexGrow: 1, // Ensures the content can grow within the ScrollView
          paddingBottom: 20, // Add padding to the bottom for a smooth scroll
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="px-8 pt-5 ">
          <SectionTitle title="New employee" icon={images.PersonIcon} />
        </View>
        <View className="p-8 rounded-3xl">
          <View className="p-5 flex flex-col  gap-10 pb-5  bg-white rounded-2xl">
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
                    placeholder="Samantha Perera"
                  />
                  {errors.name && (
                    <Text className="text-red-400 self-end">
                      {errors.name.message}
                    </Text>
                  )}
                </View>
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <CustomInput
                    disabled={isSubmitting}
                    value={value}
                    onChange={onChange}
                    title="Email"
                    placeholder="samantha@gmail.com"
                  />
                  {errors.email && (
                    <Text className="text-red-400 self-end">
                      {errors.email.message}
                    </Text>
                  )}
                </View>
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <CustomInput
                    disabled={isSubmitting}
                    value={value}
                    onChange={onChange}
                    title="password"
                    placeholder="* * * * * *"
                    secureTextEntry={true}
                  />
                  {errors.password && (
                    <Text className="text-red-400 self-end">
                      {errors.password.message}
                    </Text>
                  )}
                </View>
              )}
            />
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <CustomInput
                    disabled={isSubmitting}
                    value={value}
                    onChange={onChange}
                    title="re-type password"
                    placeholder="* * * * * *"
                    secureTextEntry={true}
                  />
                  {errors.confirmPassword && (
                    <Text className="text-red-400 self-end">
                      {errors.confirmPassword.message}
                    </Text>
                  )}
                </View>
              )}
            />
            <CustomButton
              disabled={!isValid || isSubmitting}
              text="Register"
              onClick={handleSubmit(onSubmit)}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewEmployee;
