export function isFormFilled<T extends Record<string, any>>(
    form: T,
    requiredFields?: (keyof T)[],
    excludeFields?: (keyof T)[]
  ): boolean {
    const fieldsToCheck = requiredFields ?? (Object.keys(form) as (keyof T)[]);
    console.log({fieldsToCheck})
    
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