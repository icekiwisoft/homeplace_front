import usePulsy from 'pulsy';
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { AuthData } from './types';

export default function PrivateRoute({ children }: React.PropsWithChildren) {
  const [authData] = usePulsy<AuthData>('authData');
  const location = useLocation();

  if (authData.status == 'unknow') return null;
  if (authData.status == 'logged') {
    // not logged in so redirect to login page with the return url
    return <Navigate to='/login' state={{ from: location }} />;
  }
  return { children };
}
