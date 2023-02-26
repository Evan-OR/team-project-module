import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import navStyles from '../styles/navbarStyles.module.scss';
import { UserContext } from './context/UserContext';
import UserDropDownMenu from './UserDropDownMenu';

type NavbarProps = {
  currentPage: 'Home' | 'Drinks' | 'Food';
};

function Navbar(props: NavbarProps) {
  const { currentPage } = props;
  const userContext = useContext(UserContext);
  const [showUserDropDown, setShowUserDropDown] = useState(false);

  //Change user icon colour if user context is set (user is logged in)
  const setUserIconColour = (): string => {
    if (userContext?.user) return `${navStyles.userIcon} ${navStyles.userIconLoggedIn}`;
    return `${navStyles.userIcon}`;
  };

  const toggleUserDropDown = () => {
    setShowUserDropDown(!showUserDropDown);
  };

  const signOut = () => {
    userContext?.setUser(null);
    setShowUserDropDown(false);
  };

  return (
    <nav className={navStyles.navContainer}>
      <div className={navStyles.logo}>LOGO HERE</div>

      <div className={navStyles.pagesWrapper}>
        <div className={`${navStyles.pageOption} ${currentPage === 'Home' ? navStyles.active : ''}`}>
          <Link to="/" className={navStyles.pageLink}>
            HOME
          </Link>
        </div>
        <div className={`${navStyles.pageOption} ${currentPage === 'Drinks' ? navStyles.active : ''}`}>
          <Link to="/drinks" className={navStyles.pageLink}>
            DRINKS
          </Link>
        </div>
        <div className={`${navStyles.pageOption} ${currentPage === 'Food' ? navStyles.active : ''}`}>
          <Link to="/food" className={navStyles.pageLink}>
            FOOD
          </Link>
        </div>

        <div className={navStyles.loginIconWrapper}>
          <svg
            onClick={toggleUserDropDown}
            className={setUserIconColour()}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
          </svg>

          {showUserDropDown ? <UserDropDownMenu user={userContext?.user} signOut={signOut} /> : <></>}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
