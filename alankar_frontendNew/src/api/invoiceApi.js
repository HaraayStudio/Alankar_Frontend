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
export const sendInvoiceMail = (invoiceNumber, token) =>
  axios.post(
    `${BASE_URL}/invoice/sendinvoice`,
    null,
    {
      params: { invoiceNumber },
      headers: { Authorization: `Bearer ${token}` }
    }
  );

export const getAllInvoices = (token) =>
  api.get('/invoice/getallinvoices', {
    headers: { Authorization: `Bearer ${token}` }
  });