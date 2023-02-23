import { useEffect, useState, useContext } from 'react';
import { UserContext } from './context/UserContext';
import styles from '../styles/loginPageStyles.module.scss';

type LoginPageProps = {
  toggleLoginOrRegister: () => void;
  switchToLoginAndRegisterPage: () => void;
};

function RegisterPage(props: LoginPageProps) {
  const { toggleLoginOrRegister, switchToLoginAndRegisterPage } = props;

  const userContext = useContext(UserContext);

  const [username, setUsername] = useState('');
  const [passwordOne, setPasswordOne] = useState('');
  const [passwordTwo, setPasswordTwo] = useState('');
  const [disableBtn, setDisableBtn] = useState(false);

  const handleSubmit = async () => {
    if (passwordOne !== passwordTwo) {
      alert('Passwords must be the same');
      return;
    }

    setDisableBtn(true);
    try {
      const res = await fetch(`http://localhost:3000/signup/${username}/${passwordOne}`, {
        method: 'post',
      });
      const message = await res.json();
      console.log(message, res);

      if (res.status === 220) {
        alert('username already exists!');
      }

      if (message.userInfo != null) {
        userContext?.setUser(message.userInfo);
        switchToLoginAndRegisterPage();
      }
    } catch (err) {
      alert('ERROR WITH signup SYSTEM! IDK');
    }

    setDisableBtn(false);
  };

  const usernameHandler = (e: any) => {
    setUsername(e.target.value);
  };
  const passwordOneHandler = (e: any) => {
    setPasswordOne(e.target.value);
  };
  const passwordTwoHandler = (e: any) => {
    setPasswordTwo(e.target.value);
  };

  return (
    <div className={styles.loginPageWrapper}>
      <div className={styles.title}>SIGN UP</div>
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
            onChange={passwordOneHandler}
            value={passwordOne}
            type="password"
          ></input>
        </div>

        <div className={styles.formElement}>
          <input
            className={styles.inputField}
            placeholder="Confirm Password"
            onChange={passwordTwoHandler}
            value={passwordTwo}
            type="password"
          ></input>
        </div>

        <div className={styles.formElement}>
          <button className={styles.submitButton} disabled={disableBtn} onClick={handleSubmit} type="button">
            Sign Up
          </button>
          <button
            className={styles.backButton}
            disabled={disableBtn}
            onClick={switchToLoginAndRegisterPage}
            type="button"
          >
            Back
          </button>
        </div>

        <div>
          Already have an account?{' '}
          <a className={styles.link} onClick={toggleLoginOrRegister}>
            Login!
          </a>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
