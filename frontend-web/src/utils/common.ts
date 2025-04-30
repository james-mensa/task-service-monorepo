import { Status } from "./types";

export function isFormFilled<T extends Record<string, any>>(
    form: T,
    requiredFields?: (keyof T)[],
    excludeFields?: (keyof T)[]
  ): boolean {
    const fieldsToCheck = requiredFields ?? (Object.keys(form) as (keyof T)[]);
    
    return fieldsToCheck.every((fieldKey) => {
      if (excludeFields?.includes(fieldKey)) {
        return true;
      }
      const input_value = form[fieldKey];
      const value = typeof input_value === "string" ? input_value.trim() : input_value;
      return value !== "" ;
    });
  }
  
  export const buildQuery=(queryParams?: Record<string, any>): string => {
    if (!queryParams) return '';
  
    const queryParts: string[] = [];
  
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined && value !== null) {
        queryParts.push(`${key}=${encodeURIComponent(value)}`);
      }
    }
    return queryParts.length > 0 ? `?${queryParts.join('&')}` : '';
  };


  
  export const passwordhasError= (password: string): string | null => {
    if (password.length < 6) return "Password must be at least 6 characters.";
    if (!/[A-Z]/.test(password)) return "Password must include an uppercase letter.";
    if (!/[a-z]/.test(password)) return "Password must include a lowercase letter.";
    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(password)) return "Password must include a symbol.";
    return null;
  };
  
  export const isValidEmail = (email: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  
  /**
 * Converts a status code to a human-readable label.
 * @param value The status value ("0", "1", "2",)
 * @returns The corresponding label (e.g., "Pending", "In Progress", "Completed")
 */
export const getStatusLabel = (value?: number | string): string => {
  console.log({value})
  switch (value) {
    case 0:
      return "Pending";
    case 1:
      return "In Progress";
    case 2:
      return "Completed";
    case "":
      return "All";
    default:
      return "Unknown";
  }
};

export const getStatusValue = (value: string): number => {

  switch (value as Status) {
    case  Status.Pending:
      return 0;
    case Status.InProgress:
      return 1;
    case Status.Completed:
      return 2;
    default:
      return 0;
  }
};