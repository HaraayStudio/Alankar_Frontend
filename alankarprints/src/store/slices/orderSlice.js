import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllOrders, createOrder, getOrderById, updateOrder, deleteOrder
} from "../../api/orderApi";

// ---- Thunks ----
export const fetchOrders = createAsyncThunk(
  "orders/fetchAll",
  async (token) => {
    const response = await getAllOrders(token);
    return response.data.data;
  }
);

export const addOrder = createAsyncThunk(
  "orders/add",
  async ({ order, token }) => {
    const response = await createOrder(order, token);
    return response.data.data;
  }
);

export const updateOrderThunk = createAsyncThunk(
  "orders/update",
  async ({ orderId, orderData, token }) => {
    const response = await updateOrder(orderId, orderData, token);
    return response.data.data;
  }
);

export const deleteOrderThunk = createAsyncThunk(
  "orders/delete",
  async ({ orderId, token }) => {
    await deleteOrder(orderId, token);
    return orderId;
  }
);

// ---- Slice ----
const orderSlice = createSlice({
  name: "orders",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchOrders.pending, (state) => { state.loading = true; })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.list = action.payload || [];
        state.loading = false;
      })
      .addCase(fetchOrders.rejected, (state) => { state.loading = false; })
      // Add
      .addCase(addOrder.fulfilled, (state, action) => {
        if (action.payload) state.list.unshift(action.payload);
      })
      // Update
      .addCase(updateOrderThunk.fulfilled, (state, action) => {
        state.list = state.list.map(o =>
          o.id === action.payload.id ? action.payload : o
        );
      })
      // Delete
      .addCase(deleteOrderThunk.fulfilled, (state, action) => {
        state.list = state.list.filter(o => o.id !== action.payload);
      });
  }
});

export default orderSlice.reducer;
