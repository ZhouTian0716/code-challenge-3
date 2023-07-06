import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ITransaction } from "../../api/transactions";

const apiUrl = import.meta.env.VITE_BACKEND_SERVER_API

export const convertApiSlice = createApi({
  reducerPath: "convertApi",
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl}),
  tagTypes: ["Transactions"],
  endpoints: (builder) => ({
    getTransactions: builder.query<ITransaction[], void>({
      query: () => "/transactions",
      providesTags: ["Transactions"],
    }),
  }),
});

export const { useGetTransactionsQuery } = convertApiSlice;
