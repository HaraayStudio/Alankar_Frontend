import React, { createContext, useContext,useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchClients, addClient
} from "../store/slices/clientSlice";
import {
  fetchEmployees, addEmployee, updateEmployeeThunk, deleteEmployeeThunk
} from "../store/slices/employeeSlice";
import {
  fetchPresales, addPresale, updatePresale, deletePresaleThunk
} from "../store/slices/presaleSlice";
import {
  fetchPostSales, addPostSale, updatePostSaleThunk, sendPostSaleMailThunk
} from "../store/slices/postsaleSlice";
import {
  addQuotation, updateQuotationStatusThunk, updateQuotationThunk
} from "../store/slices/quotationSlice";
import {
  fetchInvoices, addInvoice, sendInvoiceMailThunk
} from "../store/slices/invoiceSlice";
import {
  loginThunk, setToken, setUser, logout
} from "../store/slices/authSlice";

export const DataContext = createContext();
export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  // Redux hooks
  const dispatch = useDispatch();

  // Selectors
  const authToken = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) =>
    state.clients.loading ||
    state.employees.loading ||
    state.presales.loading ||
    state.postsales.loading ||
    state.invoices.loading
  );

  const clients = useSelector((state) => state.clients.list);
  const employees = useSelector((state) => state.employees.list);
  const presales = useSelector((state) => state.presales.list);
  const postSales = useSelector((state) => state.postsales.list);
  const invoices = useSelector((state) => state.invoices.list);
  const [addPreSalePopup , setAddPreSalePopup] = useState(false);
  // Add similar for quotations, orders, etc.

  // ---- Auth ----
  const handleLoginAdmin = async (email, password) => {
     dispatch(loginThunk({ email, password }));
    // returns a Promise, can be awaited for result
  };

  // ---- Client ----
  const handleGetAllClients = async () => dispatch(fetchClients(authToken));
  const handleCreateClient = async (clientData) => dispatch(addClient({ clientData, token: authToken }));

  // ---- Employee ----
  const handleGetAllEmployees = async () => {dispatch(fetchEmployees(authToken) )} ;
  const handleCreateEmployee = async (employeeData) => dispatch(addEmployee({ employeeData, token: authToken }));
  const handleUpdateEmployee = async (id, updatedData) => dispatch(updateEmployeeThunk({ id, updatedData, token: authToken }));
  const handleDeleteEmployee = async (id) => dispatch(deleteEmployeeThunk({ id, token: authToken }));

  // ---- Presale ----
  const handleGetAllPresales = async () => dispatch(fetchPresales(authToken));
  const handleCreatePresale = async (presale, isOldClient = false) =>
    dispatch(addPresale({ presale, isOldClient, token: authToken }));
  const handleUpdatePresaleStatus = async (srNumber, status) =>
    dispatch(updatePresale({ srNumber, status, token: authToken }));
  const handleDeletePresale = async (srNumber) =>
    dispatch(deletePresaleThunk({ srNumber, token: authToken }));

  // ---- PostSale ----
  const handleGetAllPostSales = async () => dispatch(fetchPostSales(authToken));
  const handleCreatePostSale = async (postSalesObj, isOldClient = false) =>
    dispatch(addPostSale({ postSalesObj, isOldClient, token: authToken }));
  const handleUpdatePostSale = async (postSale) =>
    dispatch(updatePostSaleThunk({ postSale, token: authToken }));
  const handleSendPostSaleMail = async (srNumber) =>
    dispatch(sendPostSaleMailThunk({ srNumber, token: authToken }));

  // ---- Quotation ----
  const handleAddQuotation = async (presalesSrNumber, quotationObj) =>
    dispatch(addQuotation({ presalesSrNumber, quotationObj, token: authToken })


);
  const handleUpdateQuotationStatus = async (quotationNumber, isAccepted) =>
    dispatch(updateQuotationStatusThunk({ quotationNumber, isAccepted, token: authToken }));
  const handleUpdateQuotation = async (quotationObj, quotationNumber) =>
    dispatch(updateQuotationThunk({ quotationObj, quotationNumber, token: authToken }));

  // ---- Invoice ----
  const handleGetAllInvoices = async () => dispatch(fetchInvoices(authToken));
  // Pass only srNumber
const handleAddInvoice = async (postSaleSrNumber) =>
  dispatch(addInvoice({ postSaleSrNumber, token: authToken }));

  const handleSendInvoiceMail = async (srNumber) =>
    dispatch(sendInvoiceMailThunk({ srNumber, token: authToken }));

  // ---- Fetch all data (example) ----
  const fetchAllData = async () => {
    await Promise.all([
      handleGetAllClients(),
      handleGetAllEmployees(),
      handleGetAllPresales(),
      handleGetAllPostSales(),
      handleGetAllInvoices(),
      console.log("user" ,user),
      console.log("postSales" ,postSales)
      
      // Add other fetches as needed
    ]);
  };
  // --- Auto-fetch on token update ---
useEffect(() => {
  if (authToken) {
    dispatch(fetchClients(authToken));
    dispatch(fetchEmployees(authToken));
    dispatch(fetchPresales(authToken));
    dispatch(fetchPostSales(authToken));
    dispatch(fetchInvoices(authToken));
    // ...add other dispatches for other slices
    localStorage.setItem('token', authToken);
  }
}, [authToken, dispatch]);


    useEffect(() => {
    if (authToken) {
      fetchAllData();
    }
    // eslint-disable-next-line
  }, []);
 
  
  // ---- Context value ----
  return (
    <DataContext.Provider
      value={{
        // Auth
        authToken, user, loading,
        handleLoginAdmin,
        setToken: (t) => dispatch(setToken(t)),
        setUser: (u) => dispatch(setUser(u)),
        logout: () => dispatch(logout()),

        // Clients
        clients, handleGetAllClients, handleCreateClient,

        // Employees
        employees, handleGetAllEmployees, handleCreateEmployee, handleUpdateEmployee, handleDeleteEmployee,

        // Presales
        presales, handleGetAllPresales, handleCreatePresale, handleUpdatePresaleStatus, handleDeletePresale,

        // PostSales
        postSales, handleGetAllPostSales, handleCreatePostSale, handleUpdatePostSale, handleSendPostSaleMail,

        // Quotations
        handleAddQuotation, handleUpdateQuotationStatus, handleUpdateQuotation,

        // Invoices
        invoices, handleGetAllInvoices, handleAddInvoice, handleSendInvoiceMail,

        // All at once
        fetchAllData,addPreSalePopup ,setAddPreSalePopup
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
