import { useContext, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import navStyles from "../styles/navbarStyles.module.scss";
import { removeUserFromLocalStorage } from "../utils/userUtil";
import { LoginModalContext } from "./context/LoginModalContext";
import { UserContext } from "./context/UserContext";
import UserDropDownMenu from "./UserDropDownMenu";

type NavbarProps = {
  currentPage: "Home" | "Drinks" | "Food" | undefined;
};

function Navbar(props: NavbarProps) {
  const { currentPage } = props;
  const userContext = useContext(UserContext);
  const [showUserDropDown, setShowUserDropDown] = useState(false);

  const toggleUserDropDown = () => {
    setShowUserDropDown(!showUserDropDown);
  };

  const signOut = () => {
    userContext?.setUser(null);
    removeUserFromLocalStorage();
    setShowUserDropDown(false);
  };

  const [screenWidth, setscreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setscreenWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [navbarActive, setnavbarActive] = useState(false);
  function toggleNavbar() {
    setnavbarActive(!navbarActive);
  }
  return (
    <>
      {screenWidth < 800 ? (
        <nav className={navStyles.navSideContainer}>
          <div className={navStyles.sidelogo}>FlavorFinds</div>

          <div
            className={
              navbarActive
                ? navStyles.sideLinkWrapper
                : navStyles.sideLinkWrapperHidden
            }
          >
            <div
              className={`${navStyles.sideLinkOption} ${
                currentPage === "Home" ? navStyles.sideActive : ""
              }`}
            >
              <Link to="/" className={navStyles.sidepageLink}>
                HOME
              </Link>
            </div>
            <div
              className={`${navStyles.sideLinkOption} ${
                currentPage === "Drinks" ? navStyles.sideActive : ""
              }`}
            >
              <Link to="/drinks" className={navStyles.sidepageLink}>
                DRINKS
              </Link>
            </div>
            <div
              className={`${navStyles.sideLinkOption} ${
                currentPage === "Food" ? navStyles.sideActive : ""
              }`}
            >
              <Link to="/food" className={navStyles.sidepageLink}>
                FOOD
              </Link>
            </div>
            <div className={navStyles.sideLinkOption}>
              LOGIN
              {/* If user wants to login change the div navsidecontainer to add more space? */}
            </div>
          </div>
          <div className={navStyles.barsWrapper}>
            <svg
              className={navStyles.barsIcon}
              onClick={toggleNavbar}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
            </svg>
          </div>
        </nav>
      ) : (
        <>
          <nav className={navStyles.navContainer}>
            <div className={navStyles.logo}>FlavorFinds</div>

            <div className={navStyles.pagesWrapper}>
              <div
                className={`${navStyles.pageOption} ${
                  currentPage === "Home" ? navStyles.active : ""
                }`}
              >
                <Link to="/" className={navStyles.pageLink}>
                  HOME
                </Link>
              </div>
              <div
                className={`${navStyles.pageOption} ${
                  currentPage === "Drinks" ? navStyles.active : ""
                }`}
              >
                <Link to="/drinks" className={navStyles.pageLink}>
                  DRINKS
                </Link>
              </div>
              <div
                className={`${navStyles.pageOption} ${
                  currentPage === "Food" ? navStyles.active : ""
                }`}
              >
                <Link to="/food" className={navStyles.pageLink}>
                  FOOD
                </Link>
              </div>

              <div className={navStyles.loginIconWrapper}>
                <svg
                  onClick={toggleUserDropDown}
                  className={`${navStyles.userIcon} ${
                    userContext?.user ? navStyles.userIconLoggedIn : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                </svg>

                {showUserDropDown ? (
                  <UserDropDownMenu
                    toggleUserDropDown={toggleUserDropDown}
                    user={userContext?.user}
                    signOut={signOut}
                  />
                ) : (
                  <></>
                )}
              </div>
            </div>
          </nav>
        </>
      )}
    </>
  );
}

export default Navbar;
