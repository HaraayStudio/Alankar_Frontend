// store/slices/employeeSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createEmployee,
  getEmployeeById,
  updateEmployee,
  getAllEmployees,
  deleteEmployee,
} from "../../api/employeeApi";

// Thunks
export const fetchEmployees = createAsyncThunk(
  "employees/fetchAll",
  async (token) => {
    const response = await getAllEmployees(token);
    return response.data.data;
  }
);

export const addEmployee = createAsyncThunk(
  "employees/add",
  async ({ employeeData, token }) => {
    const response = await createEmployee(employeeData, token);
    return response.data.data;
  }
);

export const updateEmployeeThunk = createAsyncThunk(
  "employees/update",
  async ({ id, updatedData, token }) => {
    const response = await updateEmployee(id, updatedData, token);
    return response.data.data;
  }
);

export const deleteEmployeeThunk = createAsyncThunk(
  "employees/delete",
  async ({ id, token }) => {
    await deleteEmployee(id, token);
    return id;
  }
);

const employeeSlice = createSlice({
  name: "employees",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.list = action.payload || [];
        state.loading = false;
      })
      .addCase(fetchEmployees.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load employees";
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        if (action.payload) state.list.unshift(action.payload);
      })
      .addCase(updateEmployeeThunk.fulfilled, (state, action) => {
        state.list = state.list.map(emp =>
          emp.id === action.payload.id ? action.payload : emp
        );
      })
      .addCase(deleteEmployeeThunk.fulfilled, (state, action) => {
        state.list = state.list.filter(emp => emp.id !== action.payload);
      });
  },
});

export default employeeSlice.reducer;
