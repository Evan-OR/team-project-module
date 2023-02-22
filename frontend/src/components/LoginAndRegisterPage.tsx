import React, { useState } from 'react';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';

function LoginAndRegisterPage() {
  const [toggle, setToggle] = useState(true);

  const toggleLoginOrRegister = () => {
    setToggle(!toggle);
  };

  return (
    <div>
      {toggle ? (
        <LoginPage toggleLoginOrRegister={toggleLoginOrRegister} />
      ) : (
        <RegisterPage toggleLoginOrRegister={toggleLoginOrRegister} />
      )}
    </div>
  );
}

export default LoginAndRegisterPage;
