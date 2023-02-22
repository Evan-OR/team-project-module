import { useContext, useEffect, useState } from 'react';
import styles from '../styles/loginPageStyles.module.scss';
import { UserInfo } from '../Types/UserTypes';
import { UserContext } from './context/UserContext';

function LoginPage() {
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
          <input placeholder="Username" onChange={usernameHandler} value={username} type="text"></input>
        </div>

        <div className={styles.formElement}>
          {/* Will be set to type password in the future */}
          <input placeholder="Password" onChange={passwordHandler} value={password} type="password"></input>
        </div>

        <div className={styles.formElement}>
          <button className={styles.submitButton} disabled={disableBtn} onClick={handleSubmit} type="button">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
