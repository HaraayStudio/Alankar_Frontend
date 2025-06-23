// src/api/quotationApi.js
import axios from 'axios';
import { BASE_URL } from './constants';
const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  validateStatus: status => status >= 200 && status < 400
});
export const createInvoice = (invoiceData ,token) =>
  api.post(
    '/invoice/createinvoice',
    invoiceData,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
