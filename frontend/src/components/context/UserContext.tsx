import { createContext, useState } from 'react';
import { UserInfo } from '../../types/UserTypes';

type UserContextProviderProps = {
  children: React.ReactNode;
};

type UserContextType = {
  user: null | UserInfo;
  setUser: React.Dispatch<React.SetStateAction<UserInfo | null>>;
};

export const UserContext = createContext<null | UserContextType>(null);

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<null | UserInfo>(null);
  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
