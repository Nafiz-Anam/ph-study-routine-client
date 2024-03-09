import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:5000/api/v1";

const getToken = () => localStorage.getItem("token");

export const scheduleApi = createApi({
    reducerPath: "scheduleApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers) => {
            const token = getToken();
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getInitialSchedule: builder.query({
            query: () => "/schedule/initial",
        }),
        addInitialSchedule: builder.mutation({
            query: (initialSchedule) => ({
                url: "/schedule/initial",
                method: "POST",
                body: initialSchedule,
            }),
        }),
    }),
});

export const { useGetInitialScheduleQuery, useAddInitialScheduleMutation } =
    scheduleApi;
