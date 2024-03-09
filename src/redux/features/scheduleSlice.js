import { createSlice } from "@reduxjs/toolkit";

export const scheduleSlice = createSlice({
    name: "schedule",
    initialState: {
        weeklySchedule: [],
        loading: false,
        error: null,
    },
    reducers: {
        setWeeklySchedule: (state, action) => {
            state.weeklySchedule = action.payload;
        },
        clearWeeklySchedule: (state) => {
            state.weeklySchedule = [];
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setWeeklySchedule, clearWeeklySchedule, setLoading, setError } =
    scheduleSlice.actions;

export default scheduleSlice.reducer;
