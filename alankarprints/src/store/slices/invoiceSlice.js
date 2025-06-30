// store/slices/invoiceSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createInvoice,
  sendInvoiceMail,
  getAllInvoices,
} from "../../api/invoiceApi";

// Thunks
export const fetchInvoices = createAsyncThunk(
  "invoices/fetchAll",
  async (token) => {
    const response = await getAllInvoices(token);
    return Array.isArray(response?.data?.data)
      ? response.data.data
      : [];
  }
);

export const addInvoice = createAsyncThunk(
  "invoices/add",
  async ({ postSaleSrNumber, token }) => {
    const response = await createInvoice(postSaleSrNumber, token);
    return response.data.data;
  }
);

export const sendInvoiceMailThunk = createAsyncThunk(
  "invoices/sendMail",
  async ({ srNumber, token }) => {
    await sendInvoiceMail(srNumber, token);
    return srNumber;
  }
);

const invoiceSlice = createSlice({
  name: "invoices",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.list = action.payload || [];
        state.loading = false;
      })
      .addCase(fetchInvoices.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load invoices";
      })
      .addCase(addInvoice.fulfilled, (state, action) => {
        if (action.payload) state.list.unshift(action.payload);
      });
    // sendInvoiceMailThunk can be used for notification, or you can set a flag/message if needed
  },
});

export default invoiceSlice.reducer;
