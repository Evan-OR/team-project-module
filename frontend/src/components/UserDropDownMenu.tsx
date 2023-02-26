import navStyles from '../styles/dropDownStyles.module.scss';
import { UserInfo } from '../types/UserTypes';

type UserDropDownMenuProps = {
  user: UserInfo | null | undefined;
  signOut: () => void;
};

function UserDropDownMenu(props: UserDropDownMenuProps) {
  const { user, signOut } = props;

  return (
    <div className={navStyles.dropDownWrapper}>
      <div className={navStyles.dropDownCarrotWrapper}>
        <div className={navStyles.dropDownCarrot}></div>
      </div>

      <div className={navStyles.dropDownSection}>
        <div className={navStyles.dropDownTitle}>{user ? <>{user?.username}</> : <>Evan</>}</div>
      </div>

      {/* USER INFO */}
      <div className={navStyles.dropDownSection}>
        <div className={navStyles.dropDownOption}>Your Likes</div>
        <div className={navStyles.dropDownOption}>Account</div>
      </div>

      <div className={navStyles.dropDownSection}>
        <div onClick={signOut} className={navStyles.dropDownOption}>
          {user ? <>Sign Out</> : <>Sign In</>}
        </div>
      </div>
    </div>
  );
}

export default UserDropDownMenu;
