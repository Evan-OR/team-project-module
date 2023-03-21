import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.scss';
import { LoginModalContextProvider } from './components/context/LoginModalContext';
import { UserContextProvider } from './components/context/UserContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <UserContextProvider>
      <LoginModalContextProvider>
        <App />
      </LoginModalContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
