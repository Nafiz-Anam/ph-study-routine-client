import { createSlice } from "@reduxjs/toolkit";

export const scheduleSlice = createSlice({
    name: "schedule",
    initialState: {
        loading: false,
        // Define other local state as needed
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        // Add other reducers as necessary
    },
});

export const { setLoading } = scheduleSlice.actions;

export default scheduleSlice.reducer;
