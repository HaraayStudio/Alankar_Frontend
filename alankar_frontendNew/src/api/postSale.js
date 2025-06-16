// src/api/postSale.js
import axios from 'axios';
const BASE_URL = 'http://localhost:8080/api';
export const getAllPostSales = (token) =>
  axios.get(`${BASE_URL}/postsales/getallpostsales`, {
    headers: { Authorization: `Bearer ${token}` }
  });
export const createPostSale = (postSale, isOldClient, token) =>
  axios.post(`${BASE_URL}/postsales/createpostsales`, postSale, {
    params: { isOldClient },
    headers: { Authorization: `Bearer ${token}` }
  });
export const updatePostSale = (postSale, token) =>
  axios.put(`${BASE_URL}/postsales/updatepostsales`, postSale, {
    headers: { Authorization: `Bearer ${token}` }
  });
export const sendPostSaleMail = (srNumber, token) =>
  axios.post(`${BASE_URL}/postsales/sendpostsalecompletemail`, null, {
    params: { srNumber },
    headers: { Authorization: `Bearer ${token}` }
  });
