// lib/auth.js
import api from './api';
import { API_URL } from '@/utils/bakend';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loginUser = async (email: string, password: string): Promise<any> => {
  const res = await api.post('/auth/login', {
    correo: email,
    contrasena: password,
  });
  console.log(res.data);
  return res.data;
};

export const loginWithGoogle = (): void => {
  window.location.href = API_URL + '/api/auth/google';
};