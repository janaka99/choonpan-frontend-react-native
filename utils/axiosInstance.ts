import * as SecureStore from "expo-secure-store";
import axios from "axios";

// Create Axios Instance
const axiosInstance = axios.create({
  baseURL: "http://192.168.49.252:3000/api",
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
