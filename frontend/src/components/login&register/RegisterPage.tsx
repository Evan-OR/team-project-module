import { useEffect, useState, useContext, useRef } from 'react';
import { UserContext } from '../context/UserContext';
import styles from '../../styles/loginPageStyles.module.scss';
import { LoginModalContext } from '../context/LoginModalContext';
import { assertIsNode, parseUserInfo } from '../../utils/utils';
import { saveUserToLocalStorage } from '../../utils/userUtil';
import { FormError } from '../../types/types';

type LoginPageProps = {
  toggleLoginOrRegister: () => void;
};

function RegisterPage(props: LoginPageProps) {
  const { toggleLoginOrRegister } = props;

  const userContext = useContext(UserContext);
  const { showLoginModal, setShowLoginModal } = useContext(LoginModalContext);

  const [username, setUsername] = useState('');
  const [passwordOne, setPasswordOne] = useState('');
  const [passwordTwo, setPasswordTwo] = useState('');
  const [disableBtn, setDisableBtn] = useState(false);
  const [error, setError] = useState<FormError>({ showError: false, errorMessage: '' });

  const modal = useRef<HTMLDivElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    if (passwordOne !== passwordTwo) {
      setError({ showError: true, errorMessage: '*Passwords must be the same!' });
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
        userContext?.setUser(parseUserInfo(message.userInfo));
        saveUserToLocalStorage(parseUserInfo(message.userInfo));
        setShowLoginModal(!showLoginModal);
      }
    } catch (err) {
      setError({ showError: true, errorMessage: '*Error with register system!' });
    }

    setDisableBtn(false);
  };

  const usernameHandler = (e: any) => {
    if (usernameIsInValid(e.target.value)) {
      setError({ showError: true, errorMessage: '*Username cannot include special characters!' });
    } else {
      setError({ showError: false, errorMessage: '' });
    }

    setUsername(e.target.value);
  };
  const passwordOneHandler = (e: any) => {
    setPasswordOne(e.target.value);
  };
  const passwordTwoHandler = (e: any) => {
    setError({ showError: false, errorMessage: '' });
    setPasswordTwo(e.target.value);
  };

  const usernameIsInValid = (username: string): boolean => {
    return /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(username);
  };

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      assertIsNode(event.target);
      if (!modal.current?.contains(event.target)) {
        setShowLoginModal(!showLoginModal);
      }
    };
    document.addEventListener('mousedown', handler);

    usernameRef.current?.focus();

    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={modal} className={styles.loginPageWrapper}>
      <div className={styles.title}>SIGN UP</div>
      <form className={styles.loginForm}>
        {error.showError && <div className={styles.formError}>{error.errorMessage}</div>}

        <div className={styles.formElement}>
          <input
            ref={usernameRef}
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
            onClick={() => setShowLoginModal(!showLoginModal)}
            disabled={disableBtn}
            type="button"
          >
            Back
          </button>
        </div>

        <div className={styles.switch}>
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
