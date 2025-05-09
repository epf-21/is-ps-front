// lib/api.js
import axios from 'axios';
import { API_URL } from '@/utils/bakend';

const api = axios.create({
  baseURL: API_URL + '/login/api', //URL de producción revisar porque no me acuerdo
});

export default api;
