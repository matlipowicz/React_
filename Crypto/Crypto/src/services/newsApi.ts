import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootObject } from "./types";

const newsHeaders = {
    "X-BingApis-SDK": "true",
    "X-RapidAPI-Key": "3467572494mshba02a5032e24b90p1715eajsn7205b51bd707",
    "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
};

const makeRequest = (url: string) => ({ url, headers: newsHeaders });

export const newsApi = createApi({
    reducerPath: "newsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://bing-news-search1.p.rapidapi.com" }),
    endpoints: (builder) => ({
        getNewsData: builder.query<RootObject, { newsCategory: string; count: number }>({
            query: ({ newsCategory, count }) =>
                makeRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
        }),
    }),
});

export const { useGetNewsDataQuery } = newsApi;
