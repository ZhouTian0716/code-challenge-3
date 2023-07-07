import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ITransaction } from "../../api/transactions";
import { CurrencyOption, Rates } from "../../utils/constants";

const apiUrl = import.meta.env.VITE_BACKEND_SERVER_API;

export const convertApiSlice = createApi({
  reducerPath: "convertApi",
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
  tagTypes: ["Transactions", "Rates"],
  endpoints: (builder) => ({
    getTransactions: builder.query<ITransaction[], void>({
      query: () => "/transactions",
      providesTags: ["Transactions"],
    }),
    getConvertRates: builder.query<Rates, CurrencyOption>({
      query: (srcISOCode) => `/rates/${srcISOCode}`,
      providesTags: ["Rates"],
    }),
  }),
});

export const { useGetTransactionsQuery, useGetConvertRatesQuery } = convertApiSlice;
