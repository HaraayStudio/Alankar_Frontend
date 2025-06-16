// // src/context/DataContext.jsx
// import React, { createContext, useContext, useEffect, useState } from 'react';
// import {login} from '../api/authApi.js';
// import {createOrder,getAllOrders,getOrderById,updateOrder,deleteOrder} from '../api/orderApi.js';
// import {getAllClients} from '../api/clientsApi.js';
// import {createEmployee ,getEmployeeById,updateEmployee,getAllEmployees,deleteEmployee} from '../api/employeeApi.js';
// export const DataContext = createContext();
// export const DataProvider = ({ children }) => {
//   // Example global states
//   const [orders, setOrders] = useState([]);
//   const [clients, setClients] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [user, setUser] = useState([]);
//   const [loading, setLoading] = useState(false);
//  const [authToken, setAuthToken] = useState(''); // ✅ initialize as empty string
//   // Fetching data
//  const fetchAllData = async () => {
//   if (!authToken) return;
//   setLoading(true);
//   try {
//     await handleGetAllOrders();
//     await handleGetAllClients();
//     // Add other fetch calls if needed
//   } catch (error) {
//     console.error('Error fetching data', error);
//   } finally {
//     setLoading(false);
//   }
// };
//   // Add Project Function
// const handleLoginAdmin = async (email, password) => {
//   setLoading(true);
//   try {
//     const response = await login(email, password);
//     const { accessToken, user } = response;
//     // ✅ Store token in localStorage
//     localStorage.setItem('token', accessToken); // ← Fix here
//     // ✅ Set user and auth token
//     setUser(user);
//     setAuthToken(accessToken);
//     setLoading(false);
//     return true;
//   } catch (error) {
//     console.error('Login failed', error);
//     setLoading(false);
//     return false;
//   }
// };
//  const handleGetAllOrders = async () => {
//   if (!authToken) {
//     console.warn("No auth token found!");
//     return;
//   }
//   setLoading(true);
//   try {
//     const response = await getAllOrders(authToken);
//     // Accept backend status: 302 or 200
//     const { status, data, message } = response.data;
//     if (status === 200 || status === 302) {
//       setOrders(data); // ✅ Accept "Orders Found." in 302
//    console.log('Orders fetched successfully:', data);
//     } else {
//       console.warn('Unexpected status:', status, 'Message:', message);
//     }
//   } catch (error) {
//     console.error('Error fetching orders', error);
//   } finally {
//     setLoading(false);
//   }
// };
//   const handleGetAllClients = async () => {
//     setLoading(true);
//     try {
//       // Assuming you have a function to fetch clients
//       const response = await getAllClients(authToken);
//       setClients(response.data.data);
//       console.log('Clients fetched successfully:', response.data.data);
//     } catch (error) {
//       console.error('Error fetching clients', error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   // Auto-fetch on load
//   useEffect(() => {
//   if (authToken) {
//     fetchAllData();
//     //  localStorage.setItem('token', accessToken); // No need to stringify a plain string
//   }
// }, [authToken]);
//   return (
//     <DataContext.Provider
//       value={{
//         orders,
//         setOrders,
//         clients,
//         setClients,
//         employees,
//         setEmployees,
//         user,
//         setUser,
//         loading, setLoading,
//         authToken,
//         setAuthToken,
//         fetchAllData,
//         handleLoginAdmin,handleGetAllOrders
//       }}
//     >
//       {children}
//     </DataContext.Provider>
//   );
// };
// export const useData = () => useContext(DataContext);
// src/context/DataContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { login } from '../api/authApi.js';
import {
  createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder,
} from '../api/orderApi.js';
import { getAllClients } from '../api/clientsApi.js';
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
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [authToken, setAuthToken] = useState('');
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
  // ✅ Fetch All Data
  const fetchAllData = async () => {
    if (!authToken) return;
    setLoading(true);
    try {
      await handleGetAllOrders();
      await handleGetAllClients();
      await handleGetAllEmployees();
      console.log(employees);
    } catch (error) {
      console.error('Error fetching data', error);
    } finally {
      setLoading(false);
    }
  };
  // ✅ Orders
  const handleGetAllOrders = async () => {
    if (!authToken) return;
    setLoading(true);
    try {
      const response = await getAllOrders(authToken);
      const { status, data } = response.data;
      if (status === 200 || status === 302) {
        setOrders(data);
        console.log('Orders fetched:', data);
      }
    } catch (error) {
      console.error('Error fetching orders', error);
    } finally {
      setLoading(false);
    }
  };
  // ✅ Clients
  const handleGetAllClients = async () => {
    setLoading(true);
    try {
      const response = await getAllClients(authToken);
      setClients(response.data.data);
      console.log('Clients fetched:', response.data.data);
    } catch (error) {
      console.error('Error fetching clients', error);
    } finally {
      setLoading(false);
    }
  };
  // ✅ Employees
  const handleCreateEmployee = async (employeeData) => {
    try {
      const response = await createEmployee(employeeData, authToken);
      console.log('Employee created:', response.data.data);
      await handleGetAllEmployees(); // Refresh list
    } catch (error) {
      console.error('Error creating employee', error);
    }
  };
  const handleGetAllEmployees = async () => {
    setLoading(true);
    try {
      const response = await getAllEmployees(authToken);
      setEmployees(response.data.data);
      console.log('Employees fetched:', response.data.data);
    } catch (error) {
      console.error('Error fetching employees', error);
    } finally {
      setLoading(false);
    }
  };
  const handleGetEmployeeById = async (id) => {
    try {
      const response = await getEmployeeById(id, authToken);
      return response.data.data;
    } catch (error) {
      console.error('Error getting employee by ID', error);
      return null;
    }
  };
  const handleUpdateEmployee = async (id, updatedData) => {
    try {
      const response = await updateEmployee(id, updatedData, authToken);
      console.log('Employee updated:', response.data.data);
      await handleGetAllEmployees(); // Refresh list
    } catch (error) {
      console.error('Error updating employee', error);
    }
  };
  const handleDeleteEmployee = async (id) => {
    try {
      const response = await deleteEmployee(id, authToken);
      console.log('Employee deleted:', response.data.message);
      await handleGetAllEmployees(); // Refresh list
    } catch (error) {
      console.error('Error deleting employee', error);
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
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
export const useData = () => useContext(DataContext);
