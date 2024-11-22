import api from './api';

//list all paginated announcers
export const getAnnouncers = async (
  page: number,
  size: number,
  type: string
) => {
  const response = await api.get(
    `categories?page=${page}&size=${size}&type=${type}`
  );
  const data = await response.data.data;
  return data;
};
