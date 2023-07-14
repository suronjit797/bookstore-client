export type IErrorPayload = {
    success: boolean;
    message: string;
    errorMessages: [];
    stack?: unknown;
    statusCode?: number;
  };
  