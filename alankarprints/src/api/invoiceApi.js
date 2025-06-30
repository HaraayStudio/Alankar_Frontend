// src/api/quotationApi.js
import axios from 'axios';
import { BASE_URL } from './constants';
const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  validateStatus: status => status >= 200 && status < 400
});
export const createInvoice = (postSaleSrNumber, token) =>
  api.post(
    `/invoice/createinvoice?postSaleSrNumber=${postSaleSrNumber}`,
    null, // No body!
    { headers: { Authorization: `Bearer ${token}` } }
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