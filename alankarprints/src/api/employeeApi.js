// src/api/employeeApi.js
import axios from 'axios';
import { BASE_URL } from './constants';
// ✅ Create configured axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  maxRedirects: 1,
  validateStatus: (status) => (status >= 200 && status < 303) || status === 302,
  headers: {
    'Content-Type': 'application/json',
  },
});
// ✅ API functions
// Create a new employee
export const createEmployee = (userData, token) =>
  axiosInstance.post('/employees/createemployee', userData, {
    headers: { Authorization: `Bearer ${token}` },
  });
// Get employee by ID
export const getEmployeeById = (id, token) =>
  axiosInstance.get(`/employees/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
// Update employee
export const updateEmployee = (id, userData, token) =>
  axiosInstance.put(`/employees/${id}`, userData, {
    headers: { Authorization: `Bearer ${token}` },
  });
// Delete employee
export const deleteEmployee = (id, token) =>
  axiosInstance.delete(`/employees/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
// Get all employees
export const getAllEmployees = (token) =>
  axiosInstance.get('/employees/getallemployees', {
    headers: { Authorization: `Bearer ${token}` },
  });
