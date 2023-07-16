import { TUser } from "../../../interface/authInterface";
import { IError } from "../../../interface/globalInterface";
import { api } from "../api";

type TRegister = {
  name: string;
  email: string;
  password: string;
};
type TLogin = {
  email: string;
  password: string;
};

export type TUserResponse = {
  message: string;
  statusCode: number;
} & (
  | {
      data: TUser;
      success: true;
      meta?: {
        page?: number;
        limit?: number;
        total?: number;
      };
    }
  | IError
);

export const registerApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMyData: builder.query<TUserResponse, undefined>({
      query: () => `/users/me`,
      transformErrorResponse: (response) => response.data,
    }),
    postRegister: builder.mutation({
      query: (data: TRegister) => ({
        url: `/users/signup`,
        method: "POST",
        body: data,
      }),
      transformErrorResponse: (response) => response.data,
    }),
    postLogin: builder.mutation({
      query: (data: TLogin) => ({
        url: `/users/login`,
        method: "POST",
        body: data,
      }),
      transformErrorResponse: (response) => response.data,
    }),
  }),
});

export const {
  useGetMyDataQuery,
  usePostRegisterMutation,
  usePostLoginMutation,
} = registerApi;
