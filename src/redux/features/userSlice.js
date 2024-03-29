import { createSlice } from "@reduxjs/toolkit";
import { userApi } from "../services/userApi";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        profile: null,
        studyPlan: null,
        loading: false,
        error: null,
    },
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addMatcher(
                userApi.endpoints.getUserProfile.matchFulfilled,
                (state, { payload }) => {
                    state.profile = payload.data;
                }
            )
            .addMatcher(
                userApi.endpoints.getStudyPlan.matchFulfilled,
                (state, { payload }) => {
                    state.studyPlan = payload.studyPlan;
                }
            );
    },
});

export default userSlice.reducer;
