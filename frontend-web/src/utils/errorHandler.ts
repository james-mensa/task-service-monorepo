interface ErrorResponse {
    message: string;
    statusCode: number;
    details?: string; 
  }
  
  export const handleError = (error: any): ErrorResponse => {
    let errorMessage = 'An unexpected error occurred. Please try again later.';
    let statusCode = 500;
  
    if (error.response) {
      if (error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      } else if (error.response.data && error.response.data.details) {
        errorMessage = error.response.data.details;
      }
      statusCode = error.response.status || 500; 
    } else if (error.message) {
      errorMessage = error.message;
    }
  
    return {
      message: errorMessage,
      statusCode,
      details: error.response?.data?.details || undefined,
    };
  };
  
  