import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const prepareHeaders = (headers, { getState }) => {
    const token = getState().auth.token || localStorage.getItem("token");
    if (token) {
        headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
};

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders,
    }),
    tagTypes: ["StudyPlan"],
    endpoints: (builder) => ({
        getUserProfile: builder.query({
            query: () => "/user/profile",
        }),
        updateUserProfile: builder.mutation({
            query: (profileData) => ({
                url: "/user/update",
                method: "PUT",
                body: profileData,
            }),
        }),
        addUserNeeds: builder.mutation({
            query: (needsData) => ({
                url: "/user/needs",
                method: "POST",
                body: needsData,
            }),
            invalidatesTags: ["StudyPlan"],
        }),
        getUserNeeds: builder.query({
            query: () => "/user/needs",
        }),
        getStudyPlan: builder.query({
            query: () => "/user/study-plan",
            providesTags: ["StudyPlan"],
        }),
    }),
});

export const {
    useGetUserProfileQuery,
    useUpdateUserProfileMutation,
    useAddUserNeedsMutation,
    useGetUserNeedsQuery,
    useGetStudyPlanQuery,
} = userApi;
