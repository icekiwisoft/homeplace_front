import { HomeIcon, UserGroupIcon, WindowIcon } from '@heroicons/react/24/solid';

import api from './api';

export const getStat = async () => {
  const response = await api.get('/');
  return [
    {
      name: 'houses',
      value: response.data.houses,
      icon: HomeIcon,
    },
    {
      name: 'furnitures',
      value: response.data.furnitures,
      icon: WindowIcon,
    },
    {
      name: 'announcer',
      value: response.data.announcers,
      icon: UserGroupIcon,
    },
  ];
};
