// store/slices/presaleSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllPresales,
  createPresale,
  updatePresaleStatus,
  deletePresale,
} from "../../api/preSale";

// Thunks
export const fetchPresales = createAsyncThunk(
  "presales/fetchAll",
  async (token) => {
    const res = await getAllPresales(token);
    return res.data?.data || [];
  }
);

export const addPresale = createAsyncThunk(
  "presales/add",
  async ({ presale, isOldClient, token }) => {
    const res = await createPresale(presale, isOldClient, token);
    return res.data.data;
  }
);

export const updatePresale = createAsyncThunk(
  "presales/update",
  async ({ srNumber, status, token }) => {
    await updatePresaleStatus(srNumber, status, token);
    return { srNumber, status };
  }
);

export const deletePresaleThunk = createAsyncThunk(
  "presales/delete",
  async ({ srNumber, token }) => {
    await deletePresale(srNumber, token);
    return srNumber;
  }
);

const presaleSlice = createSlice({
  name: "presales",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPresales.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPresales.fulfilled, (state, action) => {
        state.list = action.payload || [];
        state.loading = false;
      })
      .addCase(fetchPresales.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load presales";
      })
      .addCase(addPresale.fulfilled, (state, action) => {
        if (action.payload) state.list.unshift(action.payload);
      })
      .addCase(updatePresale.fulfilled, (state, action) => {
        state.list = state.list.map(ps =>
          ps.srNumber === action.payload.srNumber
            ? { ...ps, status: action.payload.status }
            : ps
        );
      })
      .addCase(deletePresaleThunk.fulfilled, (state, action) => {
        state.list = state.list.filter(ps => ps.srNumber !== action.payload);
      });
  },
});

export default presaleSlice.reducer;
