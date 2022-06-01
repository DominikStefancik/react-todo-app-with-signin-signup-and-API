import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useRefreshToken from '../../hooks/useRefreshToken';

// this component is responsible for keeping a user signed in after he refreshes a protected page
// or goes to another page and then returns to the protected page
const PersistentSignIn = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refreshToken = useRefreshToken();
  const { authUser } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refreshToken();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    // run refreshing of the access token only when the user state is an empty object and we don have the access token
    // (e.g. that happens when a user refreshes the page)
    !authUser?.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, []); // run the effect when the component loads;

  // the component <Outlet /> represents all child components nested inside the PersistentSignIn component
  return <>{isLoading ? <p>Loading ...</p> : <Outlet />}</>;
};

export default PersistentSignIn;
