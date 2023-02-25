import navStyles from '../styles/navbarStyles.module.scss';
import { UserInfo } from '../types/UserTypes';

type UserDropDownMenuProps = {
  user: UserInfo | null | undefined;
  signOut: () => void;
};

function UserDropDownMenu(props: UserDropDownMenuProps) {
  const { user, signOut } = props;

  return (
    <div className={navStyles.dropDownWrapper}>
      <div>
        <div className={navStyles.dropDownCarrotWrapper}>
          <div className={navStyles.dropDownCarrot}></div>
        </div>

        <div className={navStyles.dropDownSection}>
          <div className={navStyles.dropDownTitle}>
            Signed in as <span style={{ fontWeight: 'bold' }}>{user?.username}</span>
          </div>
        </div>
        <div className={navStyles.dropDownSection}>
          <div className={navStyles.dropDownOption}>Your Likes</div>
          <div className={navStyles.dropDownOption}>Account</div>
        </div>
        <div className={navStyles.dropDownSection}>
          <div onClick={signOut} className={navStyles.dropDownOption}>
            Sign Out
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDropDownMenu;
