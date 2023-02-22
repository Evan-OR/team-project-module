import React, { useState } from 'react';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';

type LoginAndRegisterPageProps = {
  switchToLoginAndRegisterPage: () => void;
};

function LoginAndRegisterPage(props: LoginAndRegisterPageProps) {
  const { switchToLoginAndRegisterPage } = props;
  const [toggle, setToggle] = useState(true);

  const toggleLoginOrRegister = () => {
    setToggle(!toggle);
  };

  return (
    <div>
      {toggle ? (
        <LoginPage
          switchToLoginAndRegisterPage={switchToLoginAndRegisterPage}
          toggleLoginOrRegister={toggleLoginOrRegister}
        />
      ) : (
        <RegisterPage
          switchToLoginAndRegisterPage={switchToLoginAndRegisterPage}
          toggleLoginOrRegister={toggleLoginOrRegister}
        />
      )}
    </div>
  );
}

export default LoginAndRegisterPage;
