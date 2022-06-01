import { createContext } from 'react';

type UserContext = Partial<{
  email: string;
  accessToken: string;
  refreshToken: string;
}>;

export interface GlobalContext {
  authUser?: UserContext;
  setAuthUser?: (auth: UserContext | ((auth: UserContext) => UserContext)) => void;
}

// represents a global state of the application
const AppContext = createContext<GlobalContext>({});

export default AppContext;
