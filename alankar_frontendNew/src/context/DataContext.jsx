import React, { createContext, useContext, useEffect, useState } from 'react';
import { login } from '../api/authApi.js';
import {
  getAllPresales,
  createPresale,
  updatePresaleStatus,
  deletePresale
} from '../api/preSale.js';
import {
  getAllPostSales,
  createPostSale,
  updatePostSale,
  sendPostSaleMail
} from '../api/postSale.js';
import {
  createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder,
} from '../api/orderApi.js';
import { getAllClients ,createClient} from '../api/clientsApi.js';
import {
  createQuotation,
  updateQuotationStatus , updateQuotation
} from "../api/quotationApi";
import {
 createInvoice
} from "../api/invoiceApi.js";
import {
  createEmployee, getEmployeeById, updateEmployee,
  getAllEmployees, deleteEmployee,
} from '../api/employeeApi.js';
export const DataContext = createContext();
export const DataProvider = ({ children }) => {
  // --- Global states ---
  const [orders, setOrders] = useState([]);
  const [clients, setClients] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [user, setUser] = useState(null); // Should be object
  const [loading, setLoading] = useState(false);
  const [authToken, setAuthToken] = useState(localStorage.getItem('token') || '');
  // --- Presale states ---
  const [presales, setPresales] = useState([]);
  const [presalesLoading, setPresalesLoading] = useState(false);
  const [presalesError, setPresalesError] = useState(null);
 // ... other states
  const [postSales, setPostSales] = useState([]);
  const [postSalesLoading, setPostSalesLoading] = useState(false);
  const [postSalesError, setPostSalesError] = useState(null);
  // --- Auth ---
  const handleLoginAdmin = async (email, password) => {
    setLoading(true);
    try {
      const response = await login(email, password);
      const { accessToken, user } = response;
      setUser(user);
      setAuthToken(accessToken);
      setLoading(false);
      return true;
    } catch (error) {
      console.error('Login failed', error);
      setLoading(false);
      return false;
    }
  };
  // --- Fetch all data (sequential) ---
  const fetchAllData = async () => {
    if (!authToken) return;
    setLoading(true);
    try {
      await handleGetAllOrders();
      await handleGetAllClients();
      await handleGetAllEmployees();
      await handleGetAllPresales();
    handleGetAllPostSales();
    } catch (error) {
      console.error('Error fetching data', error);
    } finally {
      setLoading(false);
    }
  };
  // --- Orders ---
  const handleGetAllOrders = async () => {
    if (!authToken) return;
    try {
      const response = await getAllOrders(authToken);
      const { status, data } = response.data;
      if (status === 200 || status === 302) {
        setOrders(data);
      }
    } catch (error) {
      console.error('Error fetching orders', error);
    }
  };
  // --- Clients ---
  const handleGetAllClients = async () => {
    if (!authToken) return;
    try {
      const response = await getAllClients(authToken);
      setClients(response.data.data);
    } catch (error) {
      console.error('Error fetching clients', error);
    }
  };
  const handleCreateClient = async (clientData) => {
    if (!authToken) return;
    try {
      await createClient(clientData, authToken);
      await handleGetAllClients();
    } catch (error) {
      console.error('Error creating employee', error);
    }
  };
  // --- Employees ---
  const handleCreateEmployee = async (employeeData) => {
    if (!authToken) return;
    try {
      await createEmployee(employeeData, authToken);
      await handleGetAllEmployees();
    } catch (error) {
      console.error('Error creating employee', error);
    }
  };
  const handleGetAllEmployees = async () => {
    if (!authToken) return;
    try {
      const response = await getAllEmployees(authToken);
      setEmployees(response.data.data);
    } catch (error) {
      console.error('Error fetching employees', error);
    }
  };
  const handleGetEmployeeById = async (id) => {
    if (!authToken) return null;
    try {
      const response = await getEmployeeById(id, authToken);
      return response.data.data;
    } catch (error) {
      console.error('Error getting employee by ID', error);
      return null;
    }
  };
  const handleUpdateEmployee = async (id, updatedData) => {
    if (!authToken) return;
    try {
      await updateEmployee(id, updatedData, authToken);
      await handleGetAllEmployees();
    } catch (error) {
      console.error('Error updating employee', error);
    }
  };
  const handleDeleteEmployee = async (id) => {
    if (!authToken) return;
    try {
      await deleteEmployee(id, authToken);
      await handleGetAllEmployees();
    } catch (error) {
      console.error('Error deleting employee', error);
    }
  };
  // --- PreSales ---
  const handleGetAllPresales = async () => {
    if (!authToken) return;
    setPresalesLoading(true);
    setPresalesError(null);
    try {
      const res = await getAllPresales(authToken);
      setPresales(res.data?.data || []);
    } catch (err) {
      setPresalesError('Failed to fetch presales');
    } finally {
      setPresalesLoading(false);
    }
  };
  const handleCreatePresale = async (presale, isOldClient = false) => {
    if (!authToken) return false;
    setPresalesLoading(true);
    setPresalesError(null);
    try {
      await createPresale(presale, isOldClient, authToken);
      await handleGetAllPresales();
      return true;
    } catch (err) {
      setPresalesError('Failed to create presale');
      return false;
    } finally {
      setPresalesLoading(false);
    }
  };
  const handleUpdatePresaleStatus = async (srNumber, status) => {
    if (!authToken) return false;
    setPresalesLoading(true);
    setPresalesError(null);
    try {
      await updatePresaleStatus(srNumber, status, authToken);
      await handleGetAllPresales();
      return true;
    } catch (err) {
      setPresalesError('Failed to update presale status');
      return false;
    } finally {
      setPresalesLoading(false);
    }
  };
  const handleDeletePresale = async (srNumber) => {
    if (!authToken) return false;
    setPresalesLoading(true);
    setPresalesError(null);
    try {
      await deletePresale(srNumber, authToken);
      await handleGetAllPresales();
      return true;
    } catch (err) {
      setPresalesError('Failed to delete presale');
      return false;
    } finally {
      setPresalesLoading(false);
    }
  };
   // --- PostSales Handlers ---
  const handleGetAllPostSales = async () => {
    if (!authToken) return;
    setPostSalesLoading(true);
    setPostSalesError(null);
    try {
      const res = await getAllPostSales(authToken);
      // Handles: data as array or {data: array}
      setPostSales(
        Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data.data)
            ? res.data.data
            : []
      );
    } catch (err) {
      setPostSalesError('Failed to fetch post sales');
      setPostSales([]);
    } finally {
      setPostSalesLoading(false);
    }
  };
  const handleCreatePostSale = async (postSale, isOldClient = false) => {
    setPostSalesLoading(true);
    setPostSalesError(null);
    try {
      await createPostSale(postSale, isOldClient, authToken);
      await handleGetAllPostSales();
      return true;
    } catch (err) {
      setPostSalesError('Failed to create post sale');
      return false;
    } finally {
      setPostSalesLoading(false);
    }
  };
  const handleUpdatePostSale = async (postSale) => {
    setPostSalesLoading(true);
    setPostSalesError(null);
    try {
      await updatePostSale(postSale, authToken);
      await handleGetAllPostSales();
      return true;
    } catch (err) {
      setPostSalesError('Failed to update post sale');
      return false;
    } finally {
      setPostSalesLoading(false);
    }
  };
  const handleSendPostSaleMail = async (srNumber) => {
    setPostSalesLoading(true);
    setPostSalesError(null);
    try {
      await sendPostSaleMail(srNumber, authToken);
      return true;
    } catch (err) {
      setPostSalesError('Failed to send mail');
      return false;
    } finally {
      setPostSalesLoading(false);
    }
  };
  // --- Quotations ---
  const handleAddQuotation = async (presalesSrNumber, quotationObj) => {
    try {
      const response = await createQuotation(presalesSrNumber, quotationObj, authToken);
      if (response?.data?.status === 201 || response?.data?.status === 200) {
        return { success: true, data: response.data.data };
      }
      return { success: false, error: response?.data?.message || "Failed to add quotation" };
    } catch (err) {
      return { success: false, error: err?.message || "Failed to add quotation" };
    }
  };
  // --- Update Quotation Status (NEW) ---
  const handleUpdateQuotationStatus = async (quotationNumber, isAccepted) => {
    try {
      const response = await updateQuotationStatus(quotationNumber, isAccepted, authToken);
      if (response?.data?.status === 200) {
        // Optionally refresh presales/quotations here if needed
        await handleGetAllPresales();
        return { success: true };
      }
      return { success: false, error: response?.data?.message || "Failed to update status" };
    } catch (err) {
      return { success: false, error: err?.message || "Failed to update status" };
    }
  };
  const handleUpdateQuotation = async (quotationObj, quotationNumber) => {
  try {
    const res = await updateQuotation(quotationObj, quotationNumber, authToken);
    if (res?.data?.status === 200) {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res?.data?.message || "Failed to update quotation" };
  } catch (err) {
    return { success: false, error: err?.message || "Failed to update quotation" };
  }
};
  // --- Invoice ---
  const handleAddInvoice = async ( invoiceData) => {
    try {
      const response = await createInvoice(invoiceData, authToken);
      if (response?.data?.status === 201 || response?.data?.status === 200) {
        return { success: true, data: response.data.data };
      }
      return { success: false, error: response?.data?.message || "Failed to add quotation" };
    } catch (err) {
      return { success: false, error: err?.message || "Failed to add quotation" };
    }
  };
  // --- Auto-fetch on token update ---
  useEffect(() => {
    if (authToken) {
      fetchAllData();
      localStorage.setItem('token', authToken);
    }
  }, [authToken]);
  // --- Provider ---
  return (
    <DataContext.Provider
      value={{
        // States
        orders, setOrders,
        clients, setClients,
        employees, setEmployees,
        user, setUser,
        loading, setLoading,
        authToken, setAuthToken,
        // Auth
        handleLoginAdmin,
        // Fetch
        fetchAllData,
        handleGetAllOrders,
        handleGetAllClients,
        handleGetAllEmployees,
        // Clients
        handleCreateClient,
        // Employee Actions
        handleCreateEmployee,
        handleGetEmployeeById,
        handleUpdateEmployee,
        handleDeleteEmployee,
        // Presales
        presales, presalesLoading, presalesError,
        handleGetAllPresales,
        handleCreatePresale,
        handleUpdatePresaleStatus,
        handleDeletePresale,
        // PostSales
        postSales, postSalesLoading, postSalesError,
        handleGetAllPostSales,
        handleCreatePostSale,
        handleUpdatePostSale,
        handleSendPostSaleMail,
        // Quotations
        handleAddQuotation, handleUpdateQuotation,
        handleUpdateQuotationStatus // <-- Expose this handler!
        // Invoice
        , handleAddInvoice
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
// --- Custom Hook ---
export const useData = () => useContext(DataContext);
