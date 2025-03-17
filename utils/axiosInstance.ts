import * as SecureStore from "expo-secure-store";
import { config } from "@/constants/data";
import axios from "axios";

// Create Axios Instance
const axiosInstance = axios.create({
  baseURL: "http://192.168.116.252:3000/api",
  //   withCredentials: true,
});

// Request Interceptor (Attach Token)
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error) // Handle request errors
);

// // Response Interceptor (Handle Errors & Auto Logout)
// axiosInstance.interceptors.response.use(
//   (response) => response, // Pass successful response
//   (error) => {
//     if (error.response) {
//       if (error.response.status === 401) {
//         console.warn("Unauthorized! Logging out...");
//         localStorage.removeItem("token"); // Clear token
//         window.location.href = "/login"; // Redirect to login page
//       } else {
//         console.error("API Error:", error.response.status, error.response.data);
//       }
//     }
export default axiosInstance;
