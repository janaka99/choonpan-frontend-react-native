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
import { LoginSchema } from "@/schemas/user";
import { z } from "zod";
import Toast from "react-native-toast-message";

const SignIn = () => {
  const { user, signin } = useAuth();
  if (user) return <Redirect href="/" />;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    try {
      const res = await signin(data);
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
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Server error occured, Please try again later",
      });
    }
  };

  return (
    <Container logo={false}>
      <PublicHeader title="Sign In" pathToSignUp={false}>
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
            <CustomButton
              disabled={!isValid || isSubmitting}
              text="SIGN IN"
              onClick={handleSubmit(onSubmit)}
            />
          </View>
        </ScrollView>
      </PublicHeader>
    </Container>
  );
};

export default SignIn;
