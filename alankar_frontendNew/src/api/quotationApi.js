// src/api/quotationApi.js
import axios from 'axios';
import { BASE_URL } from './constants';
const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  validateStatus: status => status >= 200 && status < 400
});
// presalesSrNumber: number, quotation: object, token: string
export const createQuotation = (presalesSrNumber, quotation, token) =>
  api.post(
    '/quotation/createquotation',
    quotation,
    {
      params: { presalesSrNumber },
      headers: { Authorization: `Bearer ${token}` }
    }
  );
// You can add more endpoints here if needed.
