import { appConfig } from "@config/config";
import axios from "axios";

const ApiClient = axios.create({
  baseURL: appConfig.backendUrl,
  withCredentials: true,
});


export { ApiClient };
