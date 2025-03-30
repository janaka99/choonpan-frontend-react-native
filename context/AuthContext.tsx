import { useContext, createContext, useState, useEffect } from "react";
import { SafeAreaView, Image } from "react-native";
import * as SecureStore from "expo-secure-store";
import { ReactNode } from "react";
import {
  EmployeeRegisterSchema,
  LoginSchema,
  ManagerSignUpSchema,
  UserSignUpSchema,
} from "@/schemas/user";
import { z } from "zod";
import axiosInstance from "@/utils/axiosInstance";
import images from "../constants/icons";

const AuthContext = createContext<undefined | any>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any | null>(null);
  const [activeProfile, setActiveProfile] = useState(null);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    checkAuth();
  };

  const toggleProfiles = (profileType: "manager" | "employee") => {
    try {
      if (user) {
        const profiles = user.profiles;
        // Find the profile object that contains the specified profileType key
        const profile = profiles.find((p: any) => p[profileType]);
        if (profile) {
          setActiveProfile(profile); // Store the whole object
        }
      }
    } catch (error) {}
  };

  const updateTokenInStore = async (token: any) => {
    await SecureStore.setItemAsync("token", token);
  };

  const checkAuth = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      if (token) {
        const res = await axiosInstance.get("/auth/validate-token");
        if (res.data.error) {
          setUser(null);
        } else {
          updateTokenInStore(res.data.data.token);
          setUser(res.data.data.user);
          setActiveProfile(res.data.data.user.profiles[0]);
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    }
    setLoading(false);
  };

  const signin = async (values: z.infer<typeof LoginSchema>) => {
    try {
      const { success, data } = LoginSchema.safeParse(values);
      if (!success) {
        return {
          error: true,
          message: "Email or password is incorrect",
        };
      }
      const response = await axiosInstance.post(`/auth/login`, {
        email: data.email,
        password: data.password,
      });
      if (response.data.error) {
        return {
          error: true,
          message: response.data.message,
        };
      }
      await updateTokenInStore(response.data.data.token);
      setUser(response.data.data.user);
      setActiveProfile(response.data.data.user.profiles[0]);
      return {
        success: true,
        message: response.data.message,
      };
    } catch (error) {
      console.log(error);
      return {
        error: true,
        message: "Email or password is incorrect",
      };
    }
  };

  const managerSignUpAction = async (
    values: z.infer<typeof ManagerSignUpSchema>
  ) => {
    try {
      const { success, data } = ManagerSignUpSchema.safeParse(values);
      if (!success) {
        return {
          error: true,
          message: "Failed to register. Check the form and try again",
        };
      }
      const response = await axiosInstance.post(`/auth/register-manager`, {
        email: data.email,
        password: data.password,
        name: data.name,
        bakery_name: data.bakery,
        confirmPassword: data.confirmPassword,
      });
      if (response.data.error) {
        return {
          error: true,
          message: response.data.message,
        };
      }
      if (response.data.data.user && response.data.data.token) {
        await updateTokenInStore(response.data.data.token);
        setUser(response.data.data.user);
        setActiveProfile(response.data.data.user.profiles[0]);
      }
      return {
        success: true,
        message: response.data.message,
      };
    } catch (error) {
      return {
        error: true,
        message: "Server error occured, Please try again later",
      };
    }
  };

  const userSignUpAction = async (values: z.infer<typeof UserSignUpSchema>) => {
    try {
      const { success, data } = UserSignUpSchema.safeParse(values);
      if (!success) {
        return {
          error: true,
          message: "Failed to register. Check the form and try again",
        };
      }
      const response = await axiosInstance.post(`/auth/user-sign-up`, {
        email: data.email,
        password: data.password,
        name: data.name,
        confirmPassword: data.confirmPassword,
      });
      if (response.data.error) {
        return {
          error: true,
          message: response.data.message,
        };
      }
      await updateTokenInStore(response.data.data.token);
      setActiveProfile(response.data.data.user.profiles[0]);
      setUser(response.data.data.user);
      return {
        success: true,
        message: response.data.message,
      };
    } catch (error) {
      return {
        error: true,
        message: "Server error occured, Please try again later",
      };
    }
  };

  const registerNewEmployee = async (
    values: z.infer<typeof EmployeeRegisterSchema>
  ) => {
    try {
      const { success, data } = EmployeeRegisterSchema.safeParse(values);
      if (!success) {
        return {
          error: true,
          message: "Failed to register. Check the form and try again",
        };
      }
      const response = await axiosInstance.post(`/auth/register-user`, {
        email: data.email,
        password: data.password,
        name: data.name,
        bakery_id: data.bakery_id,
        confirmPassword: data.confirmPassword,
      });

      if (response.data.error) {
        return {
          error: true,
          message: response.data.message,
        };
      }
      return {
        success: true,
        message: response.data.message,
      };
    } catch (error) {
      return {
        error: true,
        message: "Server error occured, Please try again later",
      };
    }
  };

  const signout = async () => {
    setLoading(true);
    await await SecureStore.deleteItemAsync("token");
    setUser(null);
    setActiveProfile(null);
    setLoading(false);
  };

  const contextData = {
    user,
    signin,
    signout,
    managerSignUpAction,
    checkAuth,
    activeProfile,
    toggleProfiles,
    userSignUpAction,
    registerNewEmployee,
  };
  return (
    <AuthContext.Provider value={contextData}>
      {loading ? (
        <SafeAreaView className="h-full flex justify-center items-center">
          <Image source={images.LogoIcon} />
        </SafeAreaView>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { useAuth, AuthContext, AuthProvider };
