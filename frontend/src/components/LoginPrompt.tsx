import { useContext } from 'react';
import styles from '../styles/promptStyles.module.scss';
import { LoginModalContext } from './context/LoginModalContext';

type LoginPromptProps = {
  text: string;
};

function LoginPrompt(props: LoginPromptProps) {
  const { text } = props;
  const toggleLoginModal = useContext(LoginModalContext);

  const clickHandler = () => {
    toggleLoginModal.setShowLoginModal(true);
  };

  return (
    <div className={styles.wrapper}>
      {text}.{' '}
      <span onClick={clickHandler} className={styles.link}>
        Login/Register
      </span>
    </div>
  );
}

export default LoginPrompt;
