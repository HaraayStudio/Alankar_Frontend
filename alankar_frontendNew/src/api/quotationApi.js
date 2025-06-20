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
    '/quotation/updatequotation',
    null,
    {
      params: { quotationNumber, isAccepted },
      headers: { Authorization: `Bearer ${token}` }
    }
  );
// Export your API as needed
