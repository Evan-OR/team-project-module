import { Link } from 'react-router-dom';
import CloseButton from '../icons/CloseButton';
import FilledHeartIcon from '../icons/FilledHeartIcon';
import DrinkIcon from '../icons/NavMenuIcons/DrinkIcon';
import HomeIcon from '../icons/NavMenuIcons/HomeIcon';
import SignOutIcon from '../icons/NavMenuIcons/SignOutIcon';
import styles from '../styles/mobileNavStyles.module.scss';
import { useContext, useEffect, useRef } from 'react';
import SignInIcon from '../icons/NavMenuIcons/SignInIcon';
import { LoginModalContext } from './context/LoginModalContext';
import { UserInfo } from '../types/UserTypes';
import { assertIsNode } from '../utils/utils';
import UserIcon from '../icons/NavMenuIcons/UserIcon';

type MobileNavBarProps = {
  currentPage: 'Home' | 'Drinks' | 'Food' | 'Your Likes' | undefined;
  user: UserInfo | null | undefined;
  showMobileNav: boolean;
  toggleMobileNav: () => void;
  signOut: () => void;
};

function MobileNavBar(props: MobileNavBarProps) {
  const { currentPage, user, showMobileNav, toggleMobileNav, signOut } = props;
  const { showLoginModal, setShowLoginModal } = useContext(LoginModalContext);

  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      assertIsNode(event.target);
      if (bgRef.current?.contains(event.target)) {
        toggleMobileNav();
      }
    };
    document.addEventListener('mousedown', handler);

    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <>
      <div ref={bgRef} className={`${styles.background} ${showMobileNav && styles.showBackground}`}></div>
      <div className={`${styles.navWrapper} ${showMobileNav && styles.showNav}`}>
        <div onClick={toggleMobileNav}>
          <CloseButton className={styles.closeBtn} />
        </div>

        {user && (
          <div className={styles.contentWrapper}>
            <div className={styles.pageLink}>
              <UserIcon className={styles.icon} /> {user.username}
            </div>
          </div>
        )}

        <div className={styles.contentWrapper}>
          <Link to="/" className={`${styles.pageLink} ${currentPage === 'Home' ? styles.currentPage : ''}`}>
            <HomeIcon className={styles.icon} /> Home
          </Link>

          <Link to="/drinks" className={`${styles.pageLink} ${currentPage === 'Drinks' ? styles.currentPage : ''}`}>
            <DrinkIcon className={styles.icon} /> Drinks
          </Link>
        </div>

        <div className={styles.contentWrapper}>
          {user ? (
            <>
              <Link
                to="/likes"
                className={`${styles.pageLink} ${currentPage === 'Your Likes' ? styles.currentPage : ''}`}
              >
                <FilledHeartIcon className={styles.icon} /> Your Likes
              </Link>
              <div
                onClick={() => {
                  signOut();
                  toggleMobileNav();
                }}
                className={`${styles.pageLink} ${styles.signInOut}`}
              >
                <SignOutIcon className={styles.icon} /> Sign Out
              </div>
            </>
          ) : (
            <>
              <div
                onClick={() => {
                  setShowLoginModal(true);
                  toggleMobileNav();
                }}
                className={`${styles.pageLink} ${styles.signInOut}`}
              >
                <SignInIcon className={styles.icon} /> Sign In
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default MobileNavBar;
