
import React, { createContext, useContext, useEffect, useState } from 'react';
import { login } from '../api/authApi.js';
import {
  getAllPresales, createPresale, updatePresaleStatus, deletePresale
} from '../api/preSale.js';
import {
  getAllPostSales, createPostSale, updatePostSale, sendPostSaleMail
} from '../api/postSale.js';
import {
  createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder,
} from '../api/orderApi.js';
import { getAllClients, createClient } from '../api/clientsApi.js';
import {
  createQuotation, updateQuotationStatus, updateQuotation
} from "../api/quotationApi";
import { createInvoice, sendInvoiceMail, getAllInvoices } from "../api/invoiceApi.js";
import {
  createEmployee, getEmployeeById, updateEmployee,
  getAllEmployees, deleteEmployee,
} from '../api/employeeApi.js';

export const DataContext = createContext();
export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  // --- Global states ---
  const [orders, setOrders] = useState([]);
  const [clients, setClients] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [user, setUser] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [authToken, setAuthToken] = useState(localStorage.getItem('token') || '');

  // --- Presale states ---
  const [presales, setPresales] = useState([]);
  const [presalesLoading, setPresalesLoading] = useState(false);
  const [presalesError, setPresalesError] = useState(null);

  // --- PostSales states ---
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

  // --- Fetch all data (parallel) ---
  const fetchAllData = async () => {
    if (!authToken) return;
    setLoading(true);
    try {
      await Promise.all([
        handleGetAllOrders(true),
        handleGetAllClients(true),
        handleGetAllEmployees(true),
        handleGetAllPresales(true),
        handleGetAllPostSales(true),
        handleGetAllInvoices(true)
      ]);
    } catch (error) {
      console.error('Error fetching all data', error);
    } finally {
      setLoading(false);
    }
  };

  // --- Orders ---
  const handleGetAllOrders = async (silent = false) => {
    if (!authToken) return;
    if (!silent) setLoading(true);
    try {
      const response = await getAllOrders(authToken);
      const { status, data } = response.data;
      if (status === 200 || status === 302) setOrders(data);
    } catch (error) {
      console.error('Error fetching orders', error);
    } finally {
      if (!silent) setLoading(false);
    }
  };

  // --- Clients ---
  const handleGetAllClients = async (silent = false) => {
    if (!authToken) return;
    if (!silent) setLoading(true);
    try {
      const response = await getAllClients(authToken);
      setClients(response.data.data);
    } catch (error) {
      console.error('Error fetching clients', error);
    } finally {
      if (!silent) setLoading(false);
    }
  };

  const handleCreateClient = async (clientData) => {
    if (!authToken) return;
    setLoading(true);
    try {
      const response = await createClient(clientData, authToken);
      setClients(prev =>
        response?.data?.data
          ? [response.data.data, ...prev]
          : prev
      );
      // Optionally force a page reload:
      // window.location.reload();
    } catch (error) {
      console.error('Error creating client', error);
    } finally {
      setLoading(false);
    }
  };

  // --- Employees ---
  const handleCreateEmployee = async (employeeData) => {
    if (!authToken) return;
    setLoading(true);
    try {
      const response = await createEmployee(employeeData, authToken);
      setEmployees(prev =>
        response?.data?.data
          ? [response.data.data, ...prev]
          : prev
      );
      // Optionally: window.location.reload();
    } catch (error) {
      console.error('Error creating employee', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetAllEmployees = async (silent = false) => {
    if (!authToken) return;
    if (!silent) setLoading(true);
    try {
      const response = await getAllEmployees(authToken);
      setEmployees(response.data.data);
    } catch (error) {
      console.error('Error fetching employees', error);
    } finally {
      if (!silent) setLoading(false);
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
    setLoading(true);
    try {
      const response = await updateEmployee(id, updatedData, authToken);
      setEmployees(prev =>
        prev.map(emp => (emp.id === id ? response.data.data : emp))
      );
      // Optionally: window.location.reload();
    } catch (error) {
      console.error('Error updating employee', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEmployee = async (id) => {
    if (!authToken) return;
    setLoading(true);
    try {
      await deleteEmployee(id, authToken);
      setEmployees(prev => prev.filter(emp => emp.id !== id));
      // Optionally: window.location.reload();
    } catch (error) {
      console.error('Error deleting employee', error);
    } finally {
      setLoading(false);
    }
  };

  // --- Presales ---
  const handleGetAllPresales = async (silent = false) => {
    if (!authToken) return;
    if (!silent) setPresalesLoading(true);
    setPresalesError(null);
    try {
      const res = await getAllPresales(authToken);
      setPresales(res.data?.data || []);
    } catch (err) {
      setPresalesError('Failed to fetch presales');
    } finally {
      if (!silent) setPresalesLoading(false);
    }
  };

  const handleCreatePresale = async (presale, isOldClient = false) => {
    if (!authToken) return false;
    setPresalesLoading(true);
    setPresalesError(null);
    try {
      const response = await createPresale(presale, isOldClient, authToken);
      setPresales(prev =>
        response?.data?.data
          ? [response.data.data, ...prev]
          : prev
      );
      // Optionally: window.location.reload();
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
      const response = await updatePresaleStatus(srNumber, status, authToken);
      setPresales(prev =>
        prev.map(ps =>
          ps.srNumber === srNumber
            ? { ...ps, status }
            : ps
        )
      );
      // Optionally: window.location.reload();
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
      setPresales(prev => prev.filter(ps => ps.srNumber !== srNumber));
      // Optionally: window.location.reload();
      return true;
    } catch (err) {
      setPresalesError('Failed to delete presale');
      return false;
    } finally {
      setPresalesLoading(false);
    }
  };

  // --- PostSales Handlers ---
  const handleGetAllPostSales = async (silent = false) => {
    if (!authToken) return;
    if (!silent) setPostSalesLoading(true);
    setPostSalesError(null);
    try {
      const res = await getAllPostSales(authToken);
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
      if (!silent) setPostSalesLoading(false);
    }
  };

const handleCreatePostSale = async (postSalesObj, isOldClient = false) => {
  setPostSalesLoading(true);
  setPostSalesError(null);
  try {
    const response = await createPostSale(postSalesObj, isOldClient, authToken);
    setPostSales(prev =>
      response?.data?.data
        ? [response.data.data, ...prev]
        : prev
    );
    // Optionally: window.location.reload();
    return true;
  } catch (err) {
    setPostSalesError("Failed to create post sale");
    return false;
  } finally {
    setPostSalesLoading(false);
  }
};

  const handleUpdatePostSale = async (postSale) => {
    setPostSalesLoading(true);
    setPostSalesError(null);
    try {
      const response = await updatePostSale(postSale, authToken);
      setPostSales(prev =>
        prev.map(p =>
          p.id === postSale.id
            ? response.data.data
            : p
        )
      );
      // Optionally: window.location.reload();
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
      await sendInvoiceMail(srNumber, authToken);
      return true;
    } catch (err) {
      setPostSalesError('Failed to send mail');
      return false;
    } finally {
      alert("Mail sent successfully");
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

  const handleUpdateQuotationStatus = async (quotationNumber, isAccepted) => {
    try {
      const response = await updateQuotationStatus(quotationNumber, isAccepted, authToken);
      if (response?.data?.status === 200) {
        return { success: true };

      }
      return { success: false, error: response?.data?.message || "Failed to update status" };
    } catch (err) {
      return { success: false, error: err?.message || "Failed to update status" };
    }
    finally{

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
const handleAddInvoice = async (invoiceData) => {
  try {
    const response = await createInvoice(invoiceData, authToken);
    if (response?.data?.status === 201 || response?.data?.status === 200) {
      setInvoices(prev =>
        response?.data?.data
          ? [response.data.data, ...prev]
          : prev
      );
      // Refresh page after success
      window.location.reload();
      return { success: true, data: response.data.data };
    }
    return { success: false, error: response?.data?.message || "Failed to add invoice" };
  } catch (err) {
    return { success: false, error: err?.message || "Failed to add invoice" };
  }
};

  const handleGetAllInvoices = async (silent = false) => {
    if (!authToken) return;
    try {
      const response = await getAllInvoices(authToken);
      setInvoices(
        Array.isArray(response?.data?.data)
          ? response.data.data
          : []
      );
    } catch (error) {
      console.error('Error fetching invoices', error);
    }
  };

  // --- Auto-fetch on token update ---
  useEffect(() => {
    if (authToken) {
      fetchAllData();
      localStorage.setItem('token', authToken);
    }
  }, [authToken]);

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
        handleUpdateQuotationStatus,
        // Invoice
        handleAddInvoice, invoices
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
