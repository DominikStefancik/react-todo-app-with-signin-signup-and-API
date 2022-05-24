import axios from 'axios';
import { API_BASE_URL } from './url';

export enum Header {
  ContentType = 'Content-Type',
  Authorization = 'Authorization',
}

// this is used for calls in the poblis zones (e.g. the register and login screen)
export default axios.create({
  baseURL: API_BASE_URL,
  headers: { [Header.ContentType]: 'application/json' },
});
