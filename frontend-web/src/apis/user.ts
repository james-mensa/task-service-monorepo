
import LocalStorageService from "@store/LocalStorage";
import { apiService } from "./api.service";
import { User } from "@utils/types";
import { appConfig } from "@config/config";

const createUser = async (user: User) => {
  return await apiService.apiRequest<User>("post", `Auth/register`, user);
};
const login = async (user:User) => {

  const res= await apiService.apiRequest<{token:string}>("post", 'Auth/login',user);
 
  if(res.success){
    const token=res.data?.token
    LocalStorageService.setItem(appConfig.auth_token,token??'')
    console.log({DD:LocalStorageService.getItem(appConfig.auth_token)})
  }
  console.log("kkkkkkkkkkkkkkkkkkkkkkk",{res})
  return res
};

 

export const userApi = {
    createUser,
    login
};