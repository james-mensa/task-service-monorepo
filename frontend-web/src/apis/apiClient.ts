import { appConfig } from "@config/config";
import LocalStorageService from "@store/LocalStorage";
import axios from "axios";

const ApiClient = axios.create({
  baseURL: appConfig.backendUrl,
  withCredentials: true,
});


ApiClient.interceptors.request.use(
  async (config: any) => {
    const accessToken = LocalStorageService.getItem(appConfig.auth_token);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

ApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      LocalStorageService.removeItem(appConfig.auth_token);
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);
export { ApiClient };

