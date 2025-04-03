import * as SecureStore from "expo-secure-store";
import axios from "axios";

const PUBLIC_URL =
  process.env.EXPO_PUBLIC_BASE_URL || "http://192.168.175.252:3000/api";

console.log(PUBLIC_URL);
// Create Axios Instance
const axiosInstance = axios.create({
  baseURL: "http://192.168.191.32:3000/api",
  // baseURL: `${PUBLIC_URL}/api`,
  //   withCredentials: true,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
