// src/api/authApi.js
import React, { useContext } from 'react';
import axios from 'axios';
import { BASE_URL } from './constants';
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
export const login = (email, password) => api.post('/auth/adminlogin',  null, { params: { email, password } });
export const register = (userData) => api.post('/auth/register', userData);
export const logout = () => api.post('/auth/logout');
export const refreshToken = () => api.post('/auth/refresh-token');
