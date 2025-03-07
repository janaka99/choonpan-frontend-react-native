import { account } from "@/lib/appwrite";
import { supabase } from "@/lib/supabase";
import { LoginSchema, ManagerSignUpSchema } from "@/schemas/user";
import { AuthTokenResponse } from "@supabase/supabase-js";
import {
  useContext,
  createContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Text } from "react-native";
import { ID, Models } from "react-native-appwrite";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";
import { Session } from "@supabase/supabase-js";

export const AuthContext = createContext<undefined | any>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfiles, setUserProfiles] = useState([]);
  const [user, setUser] = useState(null);
  // useEffect(() => {
  //   init();
  // }, []);

  const getProfiles = async (userid: string) => {
    try {
      const { data, error, status } = await supabase
        .from("manager")
        .select("*")
        .eq("userid", userid)
        .single();
      if (error) {
        throw error;
      }
      setUserProfiles(data.profiles);
    } catch (error) {
      console.log(error);
    }
  };

  const checkAuth = async () => {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) {
        throw error;
      }
      console.log("Session us ", session);
      setSession(session);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  // const init = async () => {
  //   checkAuth();
  // };

  const signIn = async (values: z.infer<typeof LoginSchema>) => {
    try {
      const { success, data } = LoginSchema.safeParse(values);
      if (!success) {
        return {
          error: true,
          message: "Email or password invalid",
        };
      }
      const res = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (res.error) {
        return {
          error: true,
          message: "Email or password invalid",
        };
      }
      console.log("Sign in response ", res.data);
    } catch (error) {
      return {
        error: true,
        message: "Email or password invalid",
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
          message: "Failed to register",
        };
      }

      // check if the user already signUp if yes

      const res = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });
      if (res.error || !res.data.user) {
        return {
          error: true,
          message: "Failed to register 3",
        };
      }

      const { data: result, error } = await supabase.rpc(
        "create_manager_account_and_bakery",
        {
          userid: res.data?.user.id,
          name: data.name,
          bakery_name: data.bakery,
        }
      );
      if (error) {
        await supabase.auth.admin.deleteUser(res.data.user.id);

        return {
          error: true,
          message: "Failed to register 2",
        };
      }
      return {
        error: false,
        message: "User has been created successfully",
      };
    } catch (error) {
      console.log(error);
      return {
        error: true,
        message: "Email or password invalid",
      };
    }
  };

  const signOut = async () => {
    setLoading(true);
    await account.deleteSession("current");
    setSession(null);
    // setUser(null);
    setLoading(false);
  };

  const contextData = { session, user, signIn, signOut };

  return (
    <AuthContext.Provider value={contextData}>
      {/* {loading ? (
        <SafeAreaView>
          <Text>Loading...</Text>
        </SafeAreaView>
      ) : ( */}
      {children}
      {/* )} */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
