import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: false,
        user: null,
        token: null,
        error: null,
    },
    reducers: {
        setCredentials: (state, action) => {
            const { id, email, token } = action.payload;
            state.isAuthenticated = true;
            state.user = { id, email };
            state.token = token;
            localStorage.setItem("token", token);
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            localStorage.removeItem("token");
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
