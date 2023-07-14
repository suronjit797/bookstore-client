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

export const registerApi = api.injectEndpoints({
  endpoints: (builder) => ({
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

export const { usePostRegisterMutation, usePostLoginMutation } = registerApi;
