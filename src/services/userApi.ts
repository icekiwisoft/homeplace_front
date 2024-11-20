import { setStoreValue } from 'pulsy';

import api from './api';

//login user (jwt method) , and directly store token
export const login = async (email: string, password: string) => {
  const response = await api.post('login/', { email, password });
  const data = await response.data;
  setStoreValue('token', data.access_token);
  return data;
};

//register user with phone number and   password  and directly store token
export const register = async (phone: string, password: string) => {
  const response = await api.post('register/', { phone, password });
  const data = await response.data;
  setStoreValue('token', data.access_token);
  return data;
};

//list paginated users
export const getUsers = async (page: number, size: number) => {
  const response = await api.get(`users?page=${page}&size=${size}`);
  const data = await response.data;
  return data;
};

//get user by id
export const getUser = async (id: number) => {
  const response = await api.get(`users/${id}`);
  const data = await response.data;
  return data;
};
