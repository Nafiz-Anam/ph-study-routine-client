import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:5000/api/v1";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (userCredentials) => ({
                url: "/auth/register",
                method: "POST",
                body: userCredentials,
            }),
        }),
        loginUser: builder.mutation({
            query: (userCredentials) => ({
                url: "/auth/login",
                method: "POST",
                body: userCredentials,
            }),
        }),
    }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = authApi;
