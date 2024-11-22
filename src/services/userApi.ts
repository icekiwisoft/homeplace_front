import { setStoreValue } from 'pulsy';

import api from './api';

//login user (jwt method) , and directly store token
export const login = async (
  emailOrPhone: string,
  password: string,
  remember: boolean
) => {
  const response = await api.post('login/', { emailOrPhone, password });
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

export const validateEmailCode = async (code: string) => {
  try {
    const response = await api.post(`/verify-email/`, { code });
    if (response.status === 200)
      setStoreValue('user', user => {
        return {
          ...user,
          email_verified: true,
        };
      }); // Update email verification status on success
  } catch (error) {
    console.error('Email validation error:', error);
  }
};

// Logs out the user, clears auth data, and removes cookies/session storage
export const logoutUser = () => {
  setStoreValue('user', null);
  Cookies.remove('authorization'); // Remove token from cookies
  sessionStorage.removeItem('authorization'); // Remove token from session storage
  navigate('/'); // Redirect to homepage after logout
};

const validatePhoneCode = async (phone_number: string, code: string) => {
  try {
    const response = await axios.post(`/verify-phone/`, {
      phone_number,
      code,
    });
    if (response.status === 200) setPhoneVerified(true); // Update phone verification status on success
  } catch (error) {
    console.error('Phone validation error:', error);
  }
};
