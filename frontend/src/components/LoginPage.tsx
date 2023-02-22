import { useEffect, useState } from 'react';
import styles from '../styles/loginPageStyles.module.scss';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    const req = await fetch(`http://localhost:3000/register/${username}/${password}`, {
      method: 'post',
    });
    const res = await req.json();
    console.log(res);
  };

  const usernameHandler = (e: any) => {
    setUsername(e.target.value);
  };
  const passwordHandler = (e: any) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    // console.log(username);
  }, []);

  return (
    <div className={styles.loginPageWrapper}>
      <form className={styles.loginForm}>
        <div className={styles.formElement}>
          <label>Username</label>
          <input onChange={usernameHandler} value={username} type="text"></input>
        </div>

        <div className={styles.formElement}>
          <label>Password</label>
          {/* Will be set to type password in the future */}
          <input onChange={passwordHandler} value={password} type="text"></input>
        </div>

        <div className={styles.formElement}>
          <button onClick={handleSubmit} type="button">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
