import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { APP_HOME_PATH } from '../../url';

// component determining whether a user is logged in or not
// it can "protect" any child components nested inside of it
const RequiredAuth = () => {
  const { authUser } = useAuth();
  const location = useLocation();

  // Outlet represents any child component of the RequiredAuth component
  // if a user is not logged in, the app will send him to the home page
  // 'replace' changes the current location where a user is to the location of the home page
  return authUser?.email ? (
    <Outlet />
  ) : (
    <Navigate to={APP_HOME_PATH} state={{ from: location }} replace />
  );
};

export default RequiredAuth;
