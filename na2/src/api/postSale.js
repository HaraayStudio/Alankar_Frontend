import axios from 'axios';
const BASE_URL = 'http://localhost:8080/api';
// All API calls return axios promises
export const getAllPostSales = (token) =>
  axios.get(`${BASE_URL}/postsales/getallpostsales`, {
    headers: { Authorization: `Bearer ${token}` }
  });
export const createPostSale = (postSales, isOldClient, token) =>
  axios.post(
    `${BASE_URL}/postsales/createpostsales`,
    postSales,
    {
      params: { isOldClient },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
export const updatePostSale = (postSale, token) =>
  axios.put(
    `${BASE_URL}/postsales/updatepostsales`,
    postSale,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
export const sendPostSaleMail = (srNumber, token) =>
  axios.post(
    `${BASE_URL}/postsales/sendpostsalecompletemail`,
    null,
    {
      params: { srNumber },
      headers: { Authorization: `Bearer ${token}` }
    }
  );
