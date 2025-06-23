// src/api/quotationApi.js
import axios from 'axios';
import { BASE_URL } from './constants';
const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  validateStatus: status => status >= 200 && status < 400
});
// Existing: createQuotation
export const createQuotation = (presalesSrNumber, quotation, token) =>
  api.post(
    '/quotation/createquotation',
    quotation,
    {
      params: { presalesSrNumber },
      headers: { Authorization: `Bearer ${token}` }
    }
  );
// NEW: updateQuotationStatus
export const updateQuotationStatus = (quotationNumber, isAccepted, token) =>
  api.put(
    '/quotation/updatequotationstatus',
    null,
    {
      params: { quotationNumber, isAccepted },
      headers: { Authorization: `Bearer ${token}` }
    }
  );
// --- Update Quotation ---
export const updateQuotation = (quotation, quotationNumber, token) =>
  axios.put(
    `${BASE_URL}/quotation/updatequotation`,
    quotation,
    {
      params: { quotationNumber },
      headers: { Authorization: `Bearer ${token}` }
    }
  );
