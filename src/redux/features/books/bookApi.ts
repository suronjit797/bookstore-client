import { IBook } from "../../../interface/bookInterface";
import { IError } from "../../../interface/globalInterface";
import { api } from "../api";

// type TBooks = {
//   data: string[];
//   message: string;
//   statusCode: number;
//   success: true;
//   meta?: {
//     page?: number;
//     limit?: number;
//     total?: number;
//   };
// };

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
type TBook = {
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

export const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query<TBook, string>({
      query: (params: string) => `/books?${params}`,
    }),
    getYears: builder.query<TYear, string>({
      query: (params: string) => `/books/year?${params}`,
    }),
  }),
});

export const { useGetBooksQuery, useGetYearsQuery } = productApi;
