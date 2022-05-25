import axios from 'axios';
import { API_BASE_URL } from './url';

export enum Header {
  ContentType = 'Content-Type',
  Authorization = 'Authorization',
}

export const getBearerTokenString = (token: string | undefined) => {
  return `Bearer ${token || ''}`;
};

// this is used for calls in the poblis zones (e.g. the register and login screen)
export default axios.create({
  baseURL: API_BASE_URL,
  headers: { [Header.ContentType]: 'application/json' },
});

/**
 * this is used for calls in the secure zones (e.g. a dashboard screen for a particular user)
 * it the hook {@link useAxiosPrivate} we attach interceptors to it in order to keep a user logged in
 * after the access token expires
 */
export const axiosPrivate = axios.create({
  baseURL: API_BASE_URL,
  headers: { [Header.ContentType]: 'application/json' },
});
