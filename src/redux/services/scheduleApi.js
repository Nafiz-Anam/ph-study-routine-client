import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:5000";

export const scheduleApi = createApi({
    reducerPath: "scheduleApi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
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
