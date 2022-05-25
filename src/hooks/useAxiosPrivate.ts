import { useEffect } from 'react';
import { axiosPrivate, getBearerTokenString, Header } from '../api/axios';
import useAuth from './useAuth';
import useRefreshToken from './useRefreshToken';

/**
 * this hook is used for attaching interceptors to the calls made by the {@link axiosPrivate}
 */
const useAxiosPrivate = () => {
  // get a function for refreshin the access token
  const refresh = useRefreshToken();
  const { authUser } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        // if the 'Authorization' header doesn't exist, then we know this is the first time we call a request
        if (!config.headers![Header.Authorization]) {
          config.headers![Header.Authorization] = getBearerTokenString(authUser?.accessToken); // use the access token we currently have
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      // if a response is good, just return the response
      (response) => response,
      // in case en error occured (e.g. accessToken expired), call the function
      async (error) => {
        const previousRequest = error?.config;
        // our request is forbidden, because our access token expired
        if (error?.response.status === 403 && !previousRequest?.sent) {
          // we want to prevent sending the request multiple times
          previousRequest.sent = true;
          const newAccessToken = await refresh();
          previousRequest.headers[Header.Authorization] = getBearerTokenString(newAccessToken);
          // call the request again, but this time with the refreshed token
          return axiosPrivate(previousRequest);
        }

        return Promise.reject(error);
      }
    );

    // use the clean-up function inside the effect to remove the interceptors
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [authUser, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
