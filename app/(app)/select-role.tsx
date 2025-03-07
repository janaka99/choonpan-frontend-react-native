import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Link, Redirect } from "expo-router";
import PublicHeader from "@/components/PublicHeader";
import ContainerWithoutScrollView from "@/components/ContainerWithoutScrollView";
import images from "@/constants/icons";
import Container from "@/components/Container";

const SignIn = () => {
  // const { session, signIn } = useAuth();

  // if (session) return <Redirect href="/" />;

  const [open, setOpen] = useState(false);

  const handlePress = () => {
    setOpen(!open);
  };

  return (
    <Container logo={true}>
      <PublicHeader pathToSignUp={true} logoTitle={true}>
        <View className="px-10 flex flex-col  gap-3 pb-5 relative">
          <View className="z-50">
            <TouchableOpacity
              onPress={handlePress}
              className={`w-full text-center py-6 px-8 font-Poppins-Bold  bg-accent-500  rounded-xl flex flex-row justify-between items-center  `}
            >
              <Text className="text-lg text-white uppercase text-center font-Poppins-Bold">
                Select role
              </Text>
              <Image source={images.DownWhiteIcon} className="" />
            </TouchableOpacity>
          </View>
          {open && (
            <View className="gap-3">
              <Link
                href="/vendor-sign-up"
                className={`w-full py-6 px-8 font-Poppins-Bold  bg-brown-200  rounded-xl`}
              >
                <View className="w-full flex flex-row justify-between items-center">
                  <Text className="text-lg text-black font-Poppins-Bold uppercase text-start ">
                    vendor
                  </Text>
                  <Image source={images.RightBlackIcon} className="" />
                </View>
              </Link>
              <Link
                href="/manager-sign-up"
                className={`w-full py-6 px-8   bg-brown-200  rounded-xl`}
              >
                <View className="w-full flex flex-row justify-between items-center">
                  <Text className="text-lg text-black font-Poppins-Bold uppercase text-start">
                    bakery manager
                  </Text>
                  <Image source={images.RightBlackIcon} className="" />
                </View>
              </Link>
            </View>
          )}
        </View>
      </PublicHeader>
    </Container>
  );
};

export default SignIn;

{
  /* <TextInput
    placeholder="Email"
    value={email}
    onChangeText={(text) => setEmail(text)}
    />
    <TextInput
    placeholder="Password"
    value={password}
    onChangeText={(text) => setPassword(text)}
    secureTextEntry
    />
    <TouchableOpacity onPress={handleSubmit}>
    <Text>Login</Text>
    </TouchableOpacity> */
}
