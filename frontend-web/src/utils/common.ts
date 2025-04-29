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
  