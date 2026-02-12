import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../Apis/auth.Api";

const authSlice = createSlice({
    name: "authSlice",
    initialState: {
        admin: JSON.parse(localStorage.getItem("admin")) || null,
    },
    reducers: {
        adminLogout: (state) => {
            localStorage.removeItem("admin");
            state.admin = null;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            authApi.endpoints.loginApi.matchFulfilled,
            (state, { payload }) => {
                state.admin = payload;
                localStorage.setItem("admin", JSON.stringify(payload));
            }
        );
    },
});

export const { adminLogout } = authSlice.actions;
export default authSlice.reducer;
