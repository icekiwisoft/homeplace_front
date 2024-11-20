import axios, { AxiosInstance } from 'axios';
import dayjs from 'dayjs';
import { jwtDecode } from 'jwt-decode';
import { getStoreValue, setStoreValue } from 'pulsy';

export const baseURL = 'http://localhost:8000';
const api = axios.create({
  baseURL: baseURL,
  headers: { Authorization: `Bearer ${getStoreValue('token')}` },
});

const tokenData = getStoreValue('authData');
if (tokenData)
  api.interceptors.request.use(async req => {
    const user = jwtDecode(tokenData.access_token);
    const isExpired = dayjs.unix(user.exp!).diff(dayjs()) < 1;

    if (!isExpired) return req;

    const response = await axios.post(`refresh/`);

    setStoreValue('token', response.data);

    req.headers.Authorization = `Bearer ${response.data.access_token}`;
    return req;
  });

export default api;
