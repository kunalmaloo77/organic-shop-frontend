import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import backendUrl from "../config";
import axios from "axios";
import { getAuth } from "../utils/authUtils.js";
import instance from "../utils/axios.js";

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ loginEmail, loginPassword }, { rejectWithValue }) => {
    try {
      const res = await instance.post(
        "/auth/login",
        { loginEmail, loginPassword },
        { withCredentials: true }
      );
      const accessToken = res.data.accessToken;
      sessionStorage.setItem("access_token", accessToken);
      localStorage.setItem("auth", JSON.stringify(res.data.user));
      console.log(res.data.user, "res data user");
      return res.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Login failed" }
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await instance.post("/auth/logout", {}, { withCredentials: true });
      localStorage.removeItem("auth");
      sessionStorage.removeItem("access_token");
      return null;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Logout failed" }
      );
    }
  }
);

export const signupUser = createAsyncThunk(
  "auth/signup",
  async ({ name, email, password, confirm_password }, { rejectWithValue }) => {
    try {
      const res = await instance.post(
        "/users",
        { name, email, password, confirm_password },
        { withCredentials: true }
      );
      localStorage.setItem("auth", JSON.stringify(res.data.user));
      sessionStorage.setItem("access_token", res.data.user.accessToken);
      return res.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Signup failed" }
      );
    }
  }
);

const storedUser = getAuth();

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: storedUser,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.user = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.user = null;
      state.loading = false;
      state.error = action.payload?.message || "Login Failed";
    });
    // Signup
    builder.addCase(signupUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(signupUser.rejected, (state, action) => {
      state.user = null;
      state.loading = false;
      state.error = action.payload?.message || "Signup Failed";
    });
    // Logout
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.error = null;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.error = action.payload?.message || "Logout failed";
    });
  },
});

export const { clearError } = authSlice.actions;

export default authSlice.reducer;
