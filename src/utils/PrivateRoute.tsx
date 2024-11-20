import AuthContext from '@context/AuthContext';
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export default function PrivateRoute({ children }: React.PropsWithChildren) {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  if (!user) {
    // not logged in so redirect to login page with the return url
    return <Navigate to='/login' state={{ from: location }} />;
  }
  return { children };
}
