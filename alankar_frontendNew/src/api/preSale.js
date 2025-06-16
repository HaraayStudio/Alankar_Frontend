// -------------------------
// src/api/presalesApi.js
// -------------------------
import axios from 'axios';
import { BASE_URL } from './constants';
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  validateStatus: status => status >= 200 && status < 400
});
export const getAllPresales = (token) =>
  api.get('/presales/getallpresales', {
    headers: { Authorization: `Bearer ${token}` }
  });
export const createPresale = (presale, isOldClient, token) =>
  api.post('/presales/createpresales', presale, {
    params: { existingClient: isOldClient },
    headers: { Authorization: `Bearer ${token}` }
  });
export const updatePresaleStatus = (srNumber, status, token) =>
  api.put(`/presales/updatepresalestatus`, null, {
    params: { srNumber, status },
    headers: { Authorization: `Bearer ${token}` }
  });
export const deletePresale = (srNumber, token) =>
  api.put(`/presales/deletepresale`, null, {
    params: { srNumber },
    headers: { Authorization: `Bearer ${token}` }
  });
