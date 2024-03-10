import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

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
    tagTypes: ["StudyPlan"],
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
            invalidatesTags: ["StudyPlan"],
        }),
    }),
});

export const { useGetInitialScheduleQuery, useAddInitialScheduleMutation } =
    scheduleApi;
