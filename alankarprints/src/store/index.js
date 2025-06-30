import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import orderReducer from "./slices/orderSlice";
import clientReducer from "./slices/clientSlice";
import employeeReducer from "./slices/employeeSlice";
import presaleReducer from "./slices/presaleSlice";
import postsaleReducer from "./slices/postsaleSlice";
import quotationReducer from "./slices/quotationSlice";
import invoiceReducer from "./slices/invoiceSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    orders: orderReducer,
    clients: clientReducer,
    employees: employeeReducer,
    presales: presaleReducer,
    postsales: postsaleReducer,
    quotations: quotationReducer,
    invoices: invoiceReducer,
  },
});

export default store;
