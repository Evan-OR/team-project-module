import { createContext, useState } from 'react';

type LoginModalContextProps = {
  children: React.ReactNode;
};

type LoginModalContextType = {
  showLoginModal: boolean;
  setShowLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const loginModalContextDefaultValue: LoginModalContextType = {
  showLoginModal: false,
  setShowLoginModal: () => false,
};

export const LoginModalContext = createContext<LoginModalContextType>(loginModalContextDefaultValue);

export const LoginModalContextProvider = ({ children }: LoginModalContextProps) => {
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  return (
    <LoginModalContext.Provider value={{ showLoginModal, setShowLoginModal }}>{children}</LoginModalContext.Provider>
  );
};
