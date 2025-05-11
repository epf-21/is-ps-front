// lib/api.js
import axios from 'axios';
import { API_URL } from '@/utils/bakend';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
