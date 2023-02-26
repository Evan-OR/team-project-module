import { useContext } from "react";
import { Link } from "react-router-dom";
import navStyles from "../styles/navbarStyles.module.scss";
import { UserContext } from "./context/UserContext";

type NavbarProps = {
  switchToLoginAndRegisterPage: () => void;
};

function Navbar(props: NavbarProps) {
  const { switchToLoginAndRegisterPage } = props;
  const userContext = useContext(UserContext);

  //Change user icon colour if user context is set (user is logged in)
  const setUserIconColour = (): string => {
    if (userContext?.user)
      return `${navStyles.userIcon} ${navStyles.userIconLoggedIn}`;
    return `${navStyles.userIcon}`;
  };

  return (
    <nav className={navStyles.navContainer}>
      <div className={navStyles.logo}>LOGO HERE</div>

      <div className={navStyles.pagesWrapper}>
        <div className={`${navStyles.pageOption} ${navStyles.active}`}>
          <Link to="/" className={navStyles.link}>
            HOME
          </Link>
        </div>
        <div className={navStyles.pageOption}>
          <Link to="/drinks" className={navStyles.pageLink}>
            DRINKS
          </Link>
        </div>
        <div className={navStyles.pageOption}>
          <Link to="/food" className={navStyles.pageLink}>
            FOOD
          </Link>
        </div>
        <svg
          onClick={userContext?.user ? undefined : switchToLoginAndRegisterPage}
          className={setUserIconColour()}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
        </svg>
      </div>
    </nav>
  );
}

export default Navbar;
