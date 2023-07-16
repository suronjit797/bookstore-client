export type IErrorPayload = {
  success: boolean;
  message: string;
  errorMessages: [];
  stack?: unknown;
  statusCode?: number;
};

export type TUser = {
  _id: string;
  name: string;
  email: string;
};
