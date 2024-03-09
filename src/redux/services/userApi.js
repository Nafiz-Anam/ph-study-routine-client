import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:5000/api/v1";

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
        }),
        getStudyPlan: builder.query({
            query: () => "/user/study-plan",
        }),
    }),
});

export const {
    useGetUserProfileQuery,
    useUpdateUserProfileMutation,
    useAddUserNeedsMutation,
    useGetStudyPlanQuery,
} = userApi;
