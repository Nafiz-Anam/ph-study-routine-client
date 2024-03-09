import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "./features/postsSlice";
import { scheduleApi } from "./services/scheduleApi";
import scheduleReducer from "./features/schedules/scheduleSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            posts: postsSlice,
            [scheduleApi.reducerPath]: scheduleApi.reducer,
            schedule: scheduleReducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(scheduleApi.middleware),
    });
};
