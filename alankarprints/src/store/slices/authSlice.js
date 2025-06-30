// store/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../../api/authApi";

// Thunk for login
export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await login(email, password);
      return response.data; // { accessToken, refreshToken }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

const tokenFromStorage = localStorage.getItem("token");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: tokenFromStorage || "",
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.token = "";
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        const { accessToken, refreshToken, user } = action.payload || {};
        state.token = accessToken || "";
        state.user = user || null;
        state.loading = false;
        state.error = null;
        if (accessToken) localStorage.setItem("token", accessToken);
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      });
  },
});

export const { setToken, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
