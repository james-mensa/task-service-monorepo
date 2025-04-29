

import { buildQuery } from "@utils/common";
import { apiService } from "./api.service";
import { Task } from "@utils/types";

const createTask = async (data: Task) => {
  return apiService.apiRequest<Task>("post", `Tasks`, {
    "title": "string",
    "description": "string",
    "dueDate": "2025-04-29T22:27:40.609Z",
    "status": 0
  });
};
const getTasks = async (queryParams?:any) => {
 
  return apiService.apiRequest<Task[]>("get", `Tasks`);
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