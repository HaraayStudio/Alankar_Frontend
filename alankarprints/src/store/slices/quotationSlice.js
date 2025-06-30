// store/slices/quotationSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createQuotation,
  updateQuotationStatus,
  updateQuotation,
} from "../../api/quotationApi";

// Thunks
export const addQuotation = createAsyncThunk(
  "quotations/add",
  async ({ presalesSrNumber, quotationObj, token }) => {
    const response = await createQuotation(presalesSrNumber, quotationObj, token);
    return response.data.data;
  }
);

export const updateQuotationStatusThunk = createAsyncThunk(
  "quotations/updateStatus",
  async ({ quotationNumber, isAccepted, token }) => {
    await updateQuotationStatus(quotationNumber, isAccepted, token);
    return { quotationNumber, isAccepted };
  }
);

export const updateQuotationThunk = createAsyncThunk(
  "quotations/update",
  async ({ quotationObj, quotationNumber, token }) => {
    const res = await updateQuotation(quotationObj, quotationNumber, token);
    return res.data.data;
  }
);

const quotationSlice = createSlice({
  name: "quotations",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addQuotation.fulfilled, (state, action) => {
        if (action.payload) state.list.unshift(action.payload);
      })
      .addCase(updateQuotationStatusThunk.fulfilled, (state, action) => {
        state.list = state.list.map(q =>
          q.quotationNumber === action.payload.quotationNumber
            ? { ...q, isAccepted: action.payload.isAccepted }
            : q
        );
      })
      .addCase(updateQuotationThunk.fulfilled, (state, action) => {
        state.list = state.list.map(q =>
          q.quotationNumber === action.payload.quotationNumber
            ? action.payload
            : q
        );
      });
  },
});

export default quotationSlice.reducer;
