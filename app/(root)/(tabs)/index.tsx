import { Image, ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/icons";
import { Link, Redirect } from "expo-router";
import { useAuth } from "@/context/AuthContext";

export default function Index() {
  const { user } = useAuth();

  if (user) return <Redirect href="/dashboard-landing" />;

  return (
    <SafeAreaView className="bg-accent-200 flex-1 px-10 ">
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <ScrollView contentContainerClassName="h-full flex-1 justify-between">
        <View className="w-full flex justify-center items-center flex-col gap-5 ">
          <Text className="text-3xl font-bold font-Poppins-Regular text-accent-500 pt-20">
            Welcome!
          </Text>
          <View className="flex flex-col justify-center items-center">
            <Text className="text-4xl font-Poppins-ExtraBold leading-snug">
              CHOONPAAN
            </Text>
            <View className="flex flex-row">
              <Text className="text-4xl font-Poppins-ExtraBold leading-snug">
                OPTIM
              </Text>
              <Text className="text-4xl font-Poppins-ExtraBold leading-snug text-accent-500">
                AI
              </Text>
            </View>
          </View>
        </View>
        <View className="flex justify-center items-center ">
          <Image
            source={images.LogoIcon}
            className="w-full "
            resizeMode="contain"
          />
        </View>
        <View className="pb-10 w-full 0">
          <Link
            href="/select-role"
            className="w-full text-center py-6 text-base font-Poppins-Medium bg-accent-500 text-white uppercase rounded-xl "
          >
            Get Started
          </Link>
          {/* <Link
            href="/settings"
            className="w-full text-center py-6 text-base font-Poppins-Medium bg-accent-500 text-white uppercase rounded-xl "
          >
            Settings
          </Link> */}
          {/* <Button onPress={signout}>Log Out</Button> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
