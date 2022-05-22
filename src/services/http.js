import axios from "axios";
import store from "@/store";

export const http = axios.create({
  baseURL: process.env.VUE_APP_API,
  headers: {
    Token: `${localStorage.getItem("access_token")}`,
  },
});

http.interceptors.request.use((config) => {
  config.headers["Token"] = `${localStorage.getItem("access_token")}`;
  return config;
});

http.interceptors.response.use(
  function (config) {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401) {
      try {
        await store.dispatch("auth/getToken");
        return http.request(originalRequest);
      } catch (e) {
        console.log(e);
      }
    }
    return Promise.reject(error);
  }
);
