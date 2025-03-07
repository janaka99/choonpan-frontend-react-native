import { Account, Avatars, Client, Databases } from "react-native-appwrite";
export const config = {
  platform: "com.choonpaan.restate",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  bakeryCollectionId: process.env.EXPO_PUBLIC_BAKERY_COLLECTION_ID,
  managerCollectionId: process.env.EXPO_PUBLIC_MANAGER_COLLECTION_ID,
  employeeCollectionId: process.env.EXPO_PUBLIC_EMPLOYEE_COLLECTION_ID,
};

export const client = new Client();

client
  .setEndpoint(config.endpoint!)
  .setProject(config.projectId!)
  .setPlatform(config.platform);

export const avatar = new Avatars(client);
export const account = new Account(client);
export const databases = new Databases(client);
