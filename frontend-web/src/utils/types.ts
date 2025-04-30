export interface RequestResponse<T = unknown> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
  }
  
  export interface SelectOption {
    value: string;
    label: string;
  }
  
  export enum Status {
    Pending = 'Pending',
    InProgress = "InProgress",
    Completed = "Completed"
  }
  

  export interface User{
    userName?:string;
    email:string;
    password:string
    confirmPassword?:""
  }


  export interface Task {
    title: string;
    description?: string;
    dueDate: string; 
    status?: Status |number;
    id?:string
  }
  

  export interface PromptDialogProps {
    title: string;
    subtitle: string;
    leftButton?: {
      onClick: () => void;
      label?: string;
    };
    rightButton?: {
      onClick: () => void;
      label?: string;
    };
    open: boolean;
    isProcessing?:boolean
  }

  export interface Pagination {
    total_records: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  }

  export interface FilterProps {
    status?: number; dueDate?: string 
  }
  
  export interface FilterCardProps {
    onChange: (filters: FilterProps) => void;
  }
  