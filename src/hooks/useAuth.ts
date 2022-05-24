import { useContext } from 'react';
import AppContext, { GlobalContext } from '../context/context';

// this hook will return the global context whereever it is called
const useAuth = (): GlobalContext => {
  return useContext(AppContext);
};

export default useAuth;
