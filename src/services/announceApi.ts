import { Ad } from 'utils/types';

import api from './api';

//get all ads  by page  and size
export const getAds = async (page: number, size: number): Promise<Ad[]> => {
  const response = await api.get(`ads?page=${page}&size=${size}`);
  const data = await response.data;
  return data;
};

//get paginated ads for an announcer
export const getAdsByAnnouncer = async (
  id: number,
  page: number,
  size: number
): Promise<Ad[]> => {
  const response = await api.get(
    `announcers/${id}/ads?page=${page}&size=${size}`
  );
  const data = await response.data;
  return data;
};
