import { View, Text, ScrollView } from "react-native";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Redirect } from "expo-router";
import Container from "@/components/Container";
import PublicHeader from "@/components/PublicHeader";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ManagerSignUpSchema } from "@/schemas/user";
import { z } from "zod";
import Toast from "react-native-toast-message";

const ManagerSignUp = () => {
  const { session, managerSignUpAction } = useAuth();

  // if (session) return <Redirect href="/" />;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(ManagerSignUpSchema),
    defaultValues: {
      name: "janaka",
      email: "chamith88@gmail.com",
      bakery: "Swiss bakery",
      password: "$123chamith",
      confirmPassword: "$123chamith",
    },
  });

  const onSubmit = async (data: z.infer<typeof ManagerSignUpSchema>) => {
    const res = await managerSignUpAction(data);
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
    }
  };

  return (
    <Container logo={false}>
      <PublicHeader title="Sign Up" pathToSignUp={true}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flexGrow: 1, // Ensures the content can grow within the ScrollView
            paddingBottom: 20, // Add padding to the bottom for a smooth scroll
          }}
        >
          <View className="px-10 flex flex-col  gap-10 pb-5">
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
                    placeholder="Manager"
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
                    placeholder="manager@gmail.com"
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
              name="bakery"
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <CustomInput
                    disabled={isSubmitting}
                    value={value}
                    onChange={onChange}
                    title="Bakery"
                    placeholder="Bakerstown, Rajagiriya"
                  />
                  {errors.bakery && (
                    <Text className="text-red-400 self-end">
                      {errors.bakery.message}
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
              text="SIGN up"
              onClick={handleSubmit(onSubmit)}
            />
          </View>
        </ScrollView>
      </PublicHeader>
    </Container>
  );
};

export default ManagerSignUp;
