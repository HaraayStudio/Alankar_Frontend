// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { login } from '../api/authApi.js';
// import {
//   getAllPresales,
//   createPresale,
//   updatePresaleStatus,
//   deletePresale
// } from '../api/preSale.js';
// import {
//   createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder,
// } from '../api/orderApi.js';
// import { getAllClients } from '../api/clientsApi.js';
// import {
//   createEmployee, getEmployeeById, updateEmployee,
//   getAllEmployees, deleteEmployee,
// } from '../api/employeeApi.js';
// export const DataContext = createContext();
// export const DataProvider = ({ children }) => {
//   // Global states
//   const [orders, setOrders] = useState([]);
//   const [clients, setClients] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [user, setUser] = useState([]);
//   const [loading, setLoading] = useState(false);
//    const [authToken, setAuthToken] = useState(localStorage.getItem('token') || '');
//   // presale 
//     const [presales, setPresales] = useState([]);
//   const [presalesLoading, setPresalesLoading] = useState(false);
//   const [presalesError, setPresalesError] = useState(null);
//   // 🟡 Login Handler
//   const handleLoginAdmin = async (email, password) => {
//     setLoading(true);
//     try {
//       const response = await login(email, password);
//       const { accessToken, user } = response;
//       setUser(user);
//       setAuthToken(accessToken);
//       setLoading(false);
//       return true;
//     } catch (error) {
//       console.error('Login failed', error);
//       setLoading(false);
//       return false;
//     }
//   };
//   // ✅ Fetch All Data
//   const fetchAllData = async () => {
//     if (!authToken) return;
//     setLoading(true);
//     try {
//       await handleGetAllOrders();
//       await handleGetAllClients();
//       await handleGetAllEmployees();
//         handleGetAllPresales();
//       console.log(employees);
//     } catch (error) {
//       console.error('Error fetching data', error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   // ✅ Orders
//   const handleGetAllOrders = async () => {
//     if (!authToken) return;
//     setLoading(true);
//     try {
//       const response = await getAllOrders(authToken);
//       const { status, data } = response.data;
//       if (status === 200 || status === 302) {
//         setOrders(data);
//         console.log('Orders fetched:', data);
//       }
//     } catch (error) {
//       console.error('Error fetching orders', error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   // ✅ Clients
//   const handleGetAllClients = async () => {
//     setLoading(true);
//     try {
//       const response = await getAllClients(authToken);
//       setClients(response.data.data);
//       console.log('Clients fetched:', response.data.data);
//     } catch (error) {
//       console.error('Error fetching clients', error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   // ✅ Employees
//   const handleCreateEmployee = async (employeeData) => {
//     try {
//       const response = await createEmployee(employeeData, authToken);
//       console.log('Employee created:', response.data.data);
//       await handleGetAllEmployees(); // Refresh list
//     } catch (error) {
//       console.error('Error creating employee', error);
//     }
//   };
//   const handleGetAllEmployees = async () => {
//     setLoading(true);
//     try {
//       const response = await getAllEmployees(authToken);
//       setEmployees(response.data.data);
//       console.log('Employees fetched:', response.data.data);
//     } catch (error) {
//       console.error('Error fetching employees', error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   const handleGetEmployeeById = async (id) => {
//     try {
//       const response = await getEmployeeById(id, authToken);
//       return response.data.data;
//     } catch (error) {
//       console.error('Error getting employee by ID', error);
//       return null;
//     }
//   };
//   const handleUpdateEmployee = async (id, updatedData) => {
//     try {
//       const response = await updateEmployee(id, updatedData, authToken);
//       console.log('Employee updated:', response.data.data);
//       await handleGetAllEmployees(); // Refresh list
//     } catch (error) {
//       console.error('Error updating employee', error);
//     }
//   };
//   const handleDeleteEmployee = async (id) => {
//     try {
//       const response = await deleteEmployee(id, authToken);
//       console.log('Employee deleted:', response.data.message);
//       await handleGetAllEmployees(); // Refresh list
//     } catch (error) {
//       console.error('Error deleting employee', error);
//     }
//   };
//     // --- PreSales Handlers ---
//   const handleGetAllPresales = async () => {
//     if (!authToken) return;
//     setPresalesLoading(true);
//     setPresalesError(null);
//     try {
//       const res = await getAllPresales(authToken);
//       setPresales(res.data?.data || []);
//     } catch (err) {
//       setPresalesError('Failed to fetch presales');
//     } finally {
//       setPresalesLoading(false);
//     }
//   };
//   const handleCreatePresale = async (presale, isOldClient = false) => {
//     setPresalesLoading(true);
//     setPresalesError(null);
//     try {
//       await createPresale(presale, isOldClient, authToken);
//       await handleGetAllPresales();
//       return true;
//     } catch (err) {
//       setPresalesError('Failed to create presale');
//       return false;
//     } finally {
//       setPresalesLoading(false);
//     }
//   };
//   const handleUpdatePresaleStatus = async (srNumber, status) => {
//     setPresalesLoading(true);
//     setPresalesError(null);
//     try {
//       await updatePresaleStatus(srNumber, status, authToken);
//       await handleGetAllPresales();
//       return true;
//     } catch (err) {
//       setPresalesError('Failed to update presale status');
//       return false;
//     } finally {
//       setPresalesLoading(false);
//     }
//   };
//   const handleDeletePresale = async (srNumber) => {
//     setPresalesLoading(true);
//     setPresalesError(null);
//     try {
//       await deletePresale(srNumber, authToken);
//       await handleGetAllPresales();
//       return true;
//     } catch (err) {
//       setPresalesError('Failed to delete presale');
//       return false;
//     } finally {
//       setPresalesLoading(false);
//     }
//   };
//   // 🟢 Auto-fetch on token update
//   useEffect(() => {
//     if (authToken) {
//       fetchAllData();
//        localStorage.setItem('token', authToken);
//     }
//   }, [authToken]);
//   return (
//     <DataContext.Provider
//       value={{
//         orders, setOrders,
//         clients, setClients,
//         employees, setEmployees,
//         user, setUser,
//         loading, setLoading,
//         authToken, setAuthToken,
//         // Auth
//         handleLoginAdmin,
//         // Fetch
//         fetchAllData,
//         handleGetAllOrders,
//         handleGetAllClients,
//         handleGetAllEmployees,
//         // Employee Actions
//         handleCreateEmployee,
//         handleGetEmployeeById,
//         handleUpdateEmployee,
//         handleDeleteEmployee,   presales, presalesLoading, presalesError,
//         handleGetAllPresales,
//         handleCreatePresale,
//         handleUpdatePresaleStatus,
//         handleDeletePresale,
//       }}
//     >
//       {children}
//     </DataContext.Provider>
//   );
// };
// export const useData = () => useContext(DataContext);
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
import { getAllClients } from '../api/clientsApi.js';
import { createQuotation } from "../api/quotationApi";
import {
  createEmployee, getEmployeeById, updateEmployee,
  getAllEmployees, deleteEmployee,
} from '../api/employeeApi.js';
export const DataContext = createContext();
export const DataProvider = ({ children }) => {
  // Global states
  const [orders, setOrders] = useState([]);
  const [clients, setClients] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [user, setUser] = useState(null); // Should be an object, not array!
  const [loading, setLoading] = useState(false);
  const [authToken, setAuthToken] = useState( '');
  // Presale states
  const [presales, setPresales] = useState([]);
  const [presalesLoading, setPresalesLoading] = useState(false);
  const [presalesError, setPresalesError] = useState(null);
    // PostSales states
const [postSales, setPostSales] = useState([]);
const [postSalesLoading, setPostSalesLoading] = useState(false);
const [postSalesError, setPostSalesError] = useState(null);
  // 🟡 Login Handler
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
  // ✅ Fetch All Data (call each fetch, await one after another)
  const fetchAllData = async () => {
    if (!authToken) return;
    setLoading(true);
    try {
      await handleGetAllOrders();
      await handleGetAllClients();
      await handleGetAllEmployees();
      await handleGetAllPresales();
    } catch (error) {
      console.error('Error fetching data', error);
    } finally {
      setLoading(false);
    }
  };
  // Orders
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
  // Clients
  const handleGetAllClients = async () => {
    if (!authToken) return;
    try {
      const response = await getAllClients(authToken);
      setClients(response.data.data);
    } catch (error) {
      console.error('Error fetching clients', error);
    }
  };
  // Employees
  const handleCreateEmployee = async (employeeData) => {
    if (!authToken) return;
    try {
      await createEmployee(employeeData, authToken);
      await handleGetAllEmployees(); // Refresh list
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
  // --- PreSales Handlers ---
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
    setPostSales(res.data?.data || []);
  } catch (err) {
    setPostSalesError('Failed to fetch post sales');
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
const handleAddQuotation = async (presalesSrNumber, quotationObj) => {
    try {
      const response = await createQuotation(presalesSrNumber, quotationObj, authToken);
      if (response?.data?.status === 201 || response?.data?.status === 200) {
        // You may want to refetch quotations here or return the new quotation
        return { success: true, data: response.data.data };
      }
      return { success: false, error: response?.data?.message || "Failed to add quotation" };
    } catch (err) {
      return { success: false, error: err?.message || "Failed to add quotation" };
    }
  };
  // 🟢 Auto-fetch on token update
  useEffect(() => {
    if (authToken) {
      fetchAllData();
      localStorage.setItem('token', authToken);
    }
  }, [authToken]);
  return (
    <DataContext.Provider
      value={{
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
        handleDeletePresale,    postSales, postSalesLoading, postSalesError,
  handleGetAllPostSales, handleCreatePostSale,
  handleUpdatePostSale, handleSendPostSaleMail, handleAddQuotation
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
export const useData = () => useContext(DataContext);
