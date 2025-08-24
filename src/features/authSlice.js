import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import backendUrl from "../config";
import axios from "axios";

export const checkAuthStatus = createAsyncThunk(
  "auth/checkStatus",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${backendUrl}/auth/getCurrentUser`, {
        withCredentials: true,
      });
      return res.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Authentication check failed" }
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ loginEmail, loginPassword }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${backendUrl}/auth/login`,
        { loginEmail, loginPassword },
        { withCredentials: true }
      );
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
      await axios.post(
        `${backendUrl}/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
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
      const res = await axios.post(
        `${backendUrl}/users`,
        { name, email, password, confirm_password },
        { withCredentials: true }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Signup failed" }
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: true,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // check Auth
    builder.addCase(checkAuthStatus.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(checkAuthStatus.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(checkAuthStatus.rejected, (state) => {
      state.user = null;
      state.loading = false;
    });
    // Login
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
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
    // logout
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.error = null;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.error = action.payload?.message || "Logout failed";
    });
  },
});

export const { cleanError } = authSlice.actions;

export default authSlice.reducer;
