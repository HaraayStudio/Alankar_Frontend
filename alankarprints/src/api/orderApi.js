// // src/api/ordersApi.js
// import axios from 'axios';
// import { BASE_URL } from './constants';
// const api = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },validateStatus: function (status) {
//     return status >= 200 && status < 400; 
//   },
// });
// // ✅ Functions that accept token
// export const createOrder = (order, isOldClient, token) =>
//   api.post('/orders/createorder', order, {
//     params: { isOldClient },
//     headers: { Authorization: `Bearer ${token}` }
//   });
// export const getOrderById = (id, token) =>
//   api.get(`/orders/${id}`, {
//     headers: { Authorization: `Bearer ${token}` }
//   });
// export const getAllOrders = (token) => {
//   console.log("Sending request with token:", token);
//   return api.get('/orders/getallorders', {
//     headers: { Authorization: `Bearer ${token}` }
//   });
// };
// export const updateOrder = (id, data, token) =>
//   api.put(`/orders/updateorder/${id}`, data, {
//     headers: { Authorization: `Bearer ${token}` }
//   });
// export const deleteOrder = (id, token) =>
//   api.delete(`/orders/deleteorder/${id}`, {
//     headers: { Authorization: `Bearer ${token}` }
//   });
// src/api/ordersApi.js
import axios from 'axios'; 
import React, { useState, useContext } from 'react';
import { DataContext } from './../context/DataContext';
import { BASE_URL } from './constants';
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  maxRedirects: 1,
  validateStatus: (status) => (status >= 200 && status < 303) || status === 302,
});
// export const createOrder = (order, isOldClient, token) =>
//   axiosInstance.post('/orders/createorder', order, {
//     params: { isOldClient },
//     headers: {  'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
//   });
export const createOrder = (order, isOldClient, token, images = []) => {
  const formData = new FormData();
  // Append order as JSON blob
  formData.append('order', new Blob([JSON.stringify(order)], { type: 'application/json' }));
  // Append images if present
  if (images.length > 0) {
    images.forEach((image) => {
      formData.append('images', image);
    });
  }
  return axiosInstance.post('/presales/createpresales', formData, {
    params: { isOldClient },
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getOrderById = (id, token) =>
  axiosInstance.get(`/orders/${id}`, {
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
  });
export const getAllOrders = (token) => {
  console.log("Sending request with token:", token);
  return axiosInstance.get('/orders/getallorders', {
    headers: {  Authorization: `Bearer ${token}` }
  });
};
export const updateOrder = (id, data, token) =>
  axiosInstance.put(`/orders/updateorder/${id}`, data, {
    headers: {  'Content-Type': 'application/json',Authorization: `Bearer ${token}` }
  });
export const deleteOrder = (id, token) =>
  axiosInstance.delete(`/orders/deleteorder/${id}`, {
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
  });
