import React, { useState } from 'react';
import AppContext from '../../context/context';

interface AuthProviderProps {
  children: React.ReactNode;
}

// children represent the components which are nested in the AuthProvider
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authUser, setAuthUser] = useState({});

  return <AppContext.Provider value={{ authUser, setAuthUser }}>{children}</AppContext.Provider>;
};
