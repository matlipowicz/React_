import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CoinDataTypes, RootObject, Data, RootHistory } from "./types";

const cryptoHeaders = {
    "X-RapidAPI-Key": "3467572494mshba02a5032e24b90p1715eajsn7205b51bd707",
    "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
};

const makeRequest = (url: string) => ({ url, headers: cryptoHeaders });

export const coinApi = createApi({
    reducerPath: "coinApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://coinranking1.p.rapidapi.com" }),
    endpoints: (builder) => ({
        getCoinsData: builder.query<CoinDataTypes, number>({
            query: (count) => makeRequest(`/coins?limit=${count}`),
        }),
        getCoinDetails: builder.query<RootObject, string>({
            query: (id) => makeRequest(`/coin/${id}`),
        }),
        getCoinPriceHistory: builder.query<RootHistory, { id: string; timePeriod: string }>({
            query: ({ id, timePeriod }) => makeRequest(`coin/${id}/history?timePeriod=${timePeriod}`),
        }),
    }),
});

export const { useGetCoinsDataQuery } = coinApi;
export const { useGetCoinDetailsQuery } = coinApi;
export const { useGetCoinPriceHistoryQuery } = coinApi;
