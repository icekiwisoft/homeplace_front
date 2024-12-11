import axios, { AxiosError, AxiosInstance } from 'axios';
import dayjs from 'dayjs';
import { jwtDecode } from 'jwt-decode';
import { getStoreValue, setStoreValue } from 'pulsy';

export const baseURL = 'https://api.domilix.com';

const token = getStoreValue<string | null>('token');
const api = axios.create({
  baseURL: baseURL,
  headers: { Authorization: `Bearer ${token}` },
});

if (token)
  api.interceptors.request.use(async req => {
    const user = jwtDecode(token);
    const isExpired = dayjs.unix(user.exp!).diff(dayjs()) < 1;

    if (!isExpired) return req;

    try {
      const response = await axios.post(
        `https://api.domilix.com/auth/refresh`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStoreValue('token', response.data.authorization.token);

      req.headers.Authorization = `Bearer ${response.data.access_token}`;
    } catch (error: AxiosError) {
      if (error.response.status == 400) {
        req.headers.Authorization = null;
        setStoreValue('token', null);
      }
    }
    return req;
  });

export default api;
