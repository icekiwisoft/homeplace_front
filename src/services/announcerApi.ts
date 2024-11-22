import api from './api';

//list all paginated announcers
export const getAnnouncers = async (page: number, size: number) => {
  const response = await api.get(`announcers?page=${page}&size=${size}`);
  const data = await response.data;
  return data;
};

//get announcer by id
export const getAnnouncer = async (id: number) => {
  const response = await api.get(`announcers/${id}`);
  const data = await response.data;
  return data;
};
