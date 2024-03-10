import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

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
            Cookies.set("token", token, { expires: 7 });
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            localStorage.removeItem("token");
            Cookies.remove("token");
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
