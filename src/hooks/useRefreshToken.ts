import axios from '../api/axios';
import { REFRESH_TOKEN_PATH } from '../api/url';
import useAuth from './useAuth';

// this hook is used when user's access token expires and we need to refresh it
const useRefreshToken = () => {
  const { authUser, setAuthUser } = useAuth();

  const refreshToken = async () => {
    const response = await axios.post(
      REFRESH_TOKEN_PATH,
      JSON.stringify({
        refresh: authUser?.refreshToken,
      })
    );

    setAuthUser!((authUser) => {
      return { ...authUser, accessToken: response.data.access };
    });

    return response.data.access;
  };

  return refreshToken;
};

export default useRefreshToken;
