import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

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
