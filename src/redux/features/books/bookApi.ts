import { api } from "../api";

export const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: (params: string) => `/books?${params}`,
    }),
  }),
});

export const { useGetBooksQuery } = productApi;
