import Axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

export const axios = Axios.create({
  baseURL: "http://192.168.1.5:5000/api",
  timeout: 5000,
});

const getAuthToken = async () => {
  const token = await AsyncStorage.getItem("token");

  return token;
};

axios.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");

    config.headers["Content-type"] = "application/json";
    config.headers.Authorization = token;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
