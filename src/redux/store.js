import { configureStore } from "@reduxjs/toolkit";
import { scheduleApi } from "./services/scheduleApi";
import { authApi } from "./services/authApi";
import scheduleReducer from "./features/scheduleSlice";
import authReducer from "./features/authSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

export const makeStore = () => {
    const store = configureStore({
        reducer: {
            [scheduleApi.reducerPath]: scheduleApi.reducer,
            [authApi.reducerPath]: authApi.reducer,
            schedule: scheduleReducer,
            auth: authReducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(scheduleApi.middleware)
                .concat(authApi.middleware),
    });

    setupListeners(store.dispatch);

    return store;
};
