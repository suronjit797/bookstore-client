import { IBook } from "../../../interface/bookInterface";
import { IError } from "../../../interface/globalInterface";
import { api } from "../api";

type TYear = {
  message: string;
  statusCode: number;
} & (
  | {
      data: string[];
      success: true;
      meta?: {
        page?: number;
        limit?: number;
        total?: number;
      };
    }
  | IError
);
export type TBook = {
  message: string;
  statusCode: number;
} & (
  | {
      data: IBook[];
      success: true;
      meta?: {
        page?: number;
        limit?: number;
        total?: number;
      };
    }
  | IError
);
export type TBookSingle = {
  message: string;
  statusCode: number;
} & (
  | {
      data: IBook;
      success: true;
      meta?: {
        page?: number;
        limit?: number;
        total?: number;
      };
    }
  | IError
);

export const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query<TBook, string>({
      query: (params: string) => `/books?${params}`,
      providesTags: ["books"],
    }),
    getSingleBooks: builder.query<TBookSingle, string>({
      query: (id: string) => `/books/${id}`,
      providesTags: ["books"],
    }),
    getYears: builder.query<TYear, string>({
      query: (params: string) => `/books/year?${params}`,
    }),
    updateBooks: builder.mutation({
      query: ({ id, data }: { id: string; data: IBook }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        body: data,
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["books"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetYearsQuery,
  useUpdateBooksMutation,
  useGetSingleBooksQuery,
} = productApi;
