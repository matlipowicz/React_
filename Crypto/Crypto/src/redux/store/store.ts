import { configureStore } from "@reduxjs/toolkit";
import { coinApi } from "../../services/coinApi";
import { newsApi } from "../../services/newsApi";

export const store = configureStore({
    reducer: {
        [coinApi.reducerPath]: coinApi.reducer,
        [newsApi.reducerPath]: newsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(coinApi.middleware).concat(newsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
