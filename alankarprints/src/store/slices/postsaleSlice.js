// store/slices/postsaleSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllPostSales,
  createPostSale,
  updatePostSale,
  sendPostSaleMail
} from "../../api/postSale";

// Thunks
export const fetchPostSales = createAsyncThunk(
  "postsales/fetchAll",
  async (token) => {
    const res = await getAllPostSales(token);
    return Array.isArray(res.data)
      ? res.data
      : Array.isArray(res.data.data)
        ? res.data.data
        : [];
  }
);

export const addPostSale = createAsyncThunk(
  "postsales/add",
  async ({ postSalesObj, isOldClient, token }) => {
    const res = await createPostSale(postSalesObj, isOldClient, token);
    return res.data.data;
  }
);

export const updatePostSaleThunk = createAsyncThunk(
  "postsales/update",
  async ({ postSale, token }) => {
    const res = await updatePostSale(postSale, token);
    return res.data.data;
  }
);

export const sendPostSaleMailThunk = createAsyncThunk(
  "postsales/sendMail",
  async ({ srNumber, token }) => {
    await sendPostSaleMail(srNumber, token);
    return srNumber;
  }
);

const postsaleSlice = createSlice({
  name: "postsales",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostSales.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPostSales.fulfilled, (state, action) => {
        state.list = action.payload || [];
        state.loading = false;
      })
      .addCase(fetchPostSales.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load postsales";
      })
      .addCase(addPostSale.fulfilled, (state, action) => {
        if (action.payload) state.list.unshift(action.payload);
      })
      .addCase(updatePostSaleThunk.fulfilled, (state, action) => {
        state.list = state.list.map(ps =>
          ps.id === action.payload.id ? action.payload : ps
        );
      });
      // sendPostSaleMailThunk can update status/message if you want
  },
});

export default postsaleSlice.reducer;
