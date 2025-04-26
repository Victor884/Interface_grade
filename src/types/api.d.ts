declare module '@/services/api' {
    interface LoginResponse {
      token?: string;
      user: {
        id: string;
        name: string;
        email: string;
      };
    }
  
    interface ErrorResponse {
      message: string;
      statusCode: number;
    }
  }