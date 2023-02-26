import { useContext, useEffect, useRef } from 'react';
import navStyles from '../styles/dropDownStyles.module.scss';
import { UserInfo } from '../types/UserTypes';
import { assertIsNode } from '../utils/utils';
import { LoginModalContext } from './context/LoginModalContext';

type UserDropDownMenuProps = {
  user: UserInfo | null | undefined;
  signOut: () => void;
  toggleUserDropDown: () => void;
};

function UserDropDownMenu(props: UserDropDownMenuProps) {
  const { user, signOut, toggleUserDropDown } = props;
  const { showLoginModal, setShowLoginModal } = useContext(LoginModalContext);

  const dropDownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      assertIsNode(event.target);
      if (!dropDownRef.current?.contains(event.target)) {
        toggleUserDropDown();
      }
    };
    document.addEventListener('mousedown', handler);

    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const loginLogOutButton = () => {
    user ? signOut() : setShowLoginModal(!showLoginModal);
    toggleUserDropDown();
  };

  return (
    <div ref={dropDownRef} className={navStyles.dropDownWrapper}>
      <div className={navStyles.dropDownCarrotWrapper}>
        <div className={navStyles.dropDownCarrot}></div>
      </div>

      <div className={navStyles.dropDownSection}>
        <div className={navStyles.dropDownTitle}>{user ? <>{user?.username}</> : <>Guest</>}</div>
      </div>

      {/* USER INFO */}
      {user ? (
        <>
          <div className={navStyles.dropDownSection}>
            <div className={navStyles.dropDownOption}>Your Likes</div>
            <div className={navStyles.dropDownOption}>Account</div>
          </div>
        </>
      ) : (
        <></>
      )}

      <div className={navStyles.dropDownSection}>
        <div onClick={loginLogOutButton} className={navStyles.dropDownOption}>
          {user ? <>Sign Out</> : <>Sign In</>}
        </div>
      </div>
    </div>
  );
}

export default UserDropDownMenu;
