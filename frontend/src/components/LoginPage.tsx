import { useContext, useEffect, useState } from 'react';
import styles from '../styles/loginPageStyles.module.scss';
import { UserContext } from './context/UserContext';

type LoginPageProps = {
  toggleLoginOrRegister: () => void;
  switchToLoginAndRegisterPage: () => void;
};

function LoginPage(props: LoginPageProps) {
  const { toggleLoginOrRegister, switchToLoginAndRegisterPage } = props;

  const userContext = useContext(UserContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [disableBtn, setDisableBtn] = useState(false);

  const handleSubmit = async () => {
    setDisableBtn(true);

    try {
      const res = await fetch(`http://localhost:3000/login/${username}/${password}`, {
        method: 'get',
      });
      const message = await res.json();
      console.log(message);

      if (message.userInfo != null) {
        userContext?.setUser(message.userInfo);
        switchToLoginAndRegisterPage();
      }
    } catch (err) {
      alert('ERROR WITH LOGIN SYSTEM! IDK');
    }

    setDisableBtn(false);
  };

  const usernameHandler = (e: any) => {
    setUsername(e.target.value);
  };
  const passwordHandler = (e: any) => {
    setPassword(e.target.value);
  };

  return (
    <div className={styles.loginPageWrapper}>
      <div className={styles.title}>LOGIN</div>
      <form className={styles.loginForm}>
        <div className={styles.formElement}>
          <input
            className={styles.inputField}
            placeholder="Username"
            onChange={usernameHandler}
            value={username}
            type="text"
          ></input>
        </div>

        <div className={styles.formElement}>
          <input
            className={styles.inputField}
            placeholder="Password"
            onChange={passwordHandler}
            value={password}
            type="password"
          ></input>
        </div>

        <div className={styles.formElement}>
          <button className={styles.submitButton} disabled={disableBtn} onClick={handleSubmit} type="button">
            Login
          </button>
        </div>

        <div>
          Don't have an account? <a onClick={toggleLoginOrRegister}>Sign Up!</a>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
