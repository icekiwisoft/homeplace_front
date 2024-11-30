import { Media } from 'utils/types';

import api from './api';

//get by announce a id
export const getMediasAnnounce = async (id: number): Promise<Media[]> => {
  const response = await api.get(`ads/${id}/medias`);
  const data = await response.data;
  return data;
};

//get all medias  by page and size
export const getMedias = async (
  page: number,
  size: number
): Promise<Media[]> => {
  const response = await api.get(`medias?page=${page}&size=${size}`);
  const data = await response.data;
  return data;
};
