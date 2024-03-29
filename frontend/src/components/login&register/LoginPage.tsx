import { useContext, useEffect, useRef, useState } from 'react';
import styles from '../../styles/loginPageStyles.module.scss';
import { saveUserToLocalStorage } from '../../utils/userUtil';
import { assertIsNode, parseUserInfo } from '../../utils/utils';
import { LoginModalContext } from '../context/LoginModalContext';
import { UserContext } from '../context/UserContext';
import { FormError } from '../../types/types';

type LoginPageProps = {
  toggleLoginOrRegister: () => void;
};

function LoginPage(props: LoginPageProps) {
  const { toggleLoginOrRegister } = props;

  const userContext = useContext(UserContext);
  const { showLoginModal, setShowLoginModal } = useContext(LoginModalContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [disableBtn, setDisableBtn] = useState(false);
  const [error, setError] = useState<FormError>({ showError: false, errorMessage: '' });

  const modal = useRef<HTMLDivElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    setDisableBtn(true);

    try {
      const res = await fetch(
        `http://localhost:3000/login/${encodeURIComponent(username)}/${encodeURIComponent(password)}`,
        {
          method: 'get',
        }
      );
      const message = await res.json();
      console.log(message);

      if (message.userInfo != null) {
        userContext?.setUser(parseUserInfo(message.userInfo));
        saveUserToLocalStorage(parseUserInfo(message.userInfo));
        setShowLoginModal(!showLoginModal);
      } else {
        setError({ showError: true, errorMessage: '*Incorrect username or password!' });
      }
    } catch (err) {
      setError({ showError: true, errorMessage: '*Error with login system!' });
    }

    setDisableBtn(false);
  };

  const usernameHandler = (e: any) => {
    setError({ showError: false, errorMessage: '' });
    setUsername(e.target.value);
  };
  const passwordHandler = (e: any) => {
    setError({ showError: false, errorMessage: '' });
    setPassword(e.target.value);
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
      <div className={styles.title}>LOGIN</div>
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
            onChange={passwordHandler}
            value={password}
            type="password"
          ></input>
        </div>

        <div className={styles.formElement}>
          <button className={styles.submitButton} disabled={disableBtn} onClick={handleSubmit} type="button">
            Login
          </button>
          {/* TOGGLE MODAL HERE ONCLICK */}
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
          Don't have an account?{' '}
          <a className={styles.link} onClick={toggleLoginOrRegister}>
            Sign Up!
          </a>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
