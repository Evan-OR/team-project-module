import React, { useState } from 'react';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import styles from '../../styles/loginPageStyles.module.scss';

function LoginAndRegisterModal() {
  const [toggle, setToggle] = useState(true);

  const toggleLoginOrRegister = () => {
    setToggle(!toggle);
  };

  return (
    <div className={styles.modalWrapper}>
      {toggle ? (
        <LoginPage toggleLoginOrRegister={toggleLoginOrRegister} />
      ) : (
        <RegisterPage toggleLoginOrRegister={toggleLoginOrRegister} />
      )}
    </div>
  );
}

export default LoginAndRegisterModal;
