

import { buildQuery } from "@utils/common";
import { apiService } from "./api.service";
import { Task } from "@utils/types";

const createTask = async (data: Task) => {
  return apiService.apiRequest<Task>("post", `Tasks`, data);
};
const getTasks = async (queryParams?:any) => {
  const query = buildQuery(queryParams);
  return apiService.apiRequest<Task[]>("get", `Tasks${query}`);
};

const getTaskByID = async (id:string) => {

    return apiService.apiRequest<Task[]>("get", `Tasks/${id}`);
  };
  
 const updateTask= async (id:string,data:Partial<Task>)=> {
    return  apiService.apiRequest<Task>('put',`Tasks/${id}`,data)
 };
 
 const deleteTask = async (id:string)=> {
    return  apiService.apiRequest<null>('delete',`tokens/${id}`)
 };
 

export const taskApi = {
    createTask,
    getTaskByID,
    getTasks,
    updateTask,
    deleteTask
};