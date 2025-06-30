// store/slices/clientSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllClients, createClient } from "../../api/clientsApi";

// Thunks
export const fetchClients = createAsyncThunk(
  "clients/fetchAll",
  async (token) => {
    const response = await getAllClients(token);
    return response.data.data;
  }
);

export const addClient = createAsyncThunk(
  "clients/add",
  async ({ clientData, token }) => {
    const response = await createClient(clientData, token);
    return response.data.data;
  }
);

const clientSlice = createSlice({
  name: "clients",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.list = action.payload || [];
        state.loading = false;
      })
      .addCase(fetchClients.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load clients";
      })
      .addCase(addClient.fulfilled, (state, action) => {
        if (action.payload) state.list.unshift(action.payload);
      });
  },
});

export default clientSlice.reducer;
