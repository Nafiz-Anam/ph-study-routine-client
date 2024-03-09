import { configureStore } from "@reduxjs/toolkit";
import { scheduleApi } from "./services/scheduleApi";
import { authApi } from "./services/authApi";
import scheduleReducer from "./features/scheduleSlice";
import authReducer from "./features/authSlice";
import userReducer from "./features/userSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userApi } from "./services/userApi";

export const makeStore = () => {
    const store = configureStore({
        reducer: {
            [scheduleApi.reducerPath]: scheduleApi.reducer,
            [authApi.reducerPath]: authApi.reducer,
            [userApi.reducerPath]: userApi.reducer,
            user: userReducer,
            schedule: scheduleReducer,
            auth: authReducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(scheduleApi.middleware)
                .concat(authApi.middleware)
                .concat(userApi.middleware),
    });

    setupListeners(store.dispatch);

    return store;
};
