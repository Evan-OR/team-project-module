import { useState } from "react";
import {
  UserContext,
  UserContextProvider,
} from "./components/context/UserContext.js";
import Navbar from "./components/Navbar.js";
import Hero from "./components/Hero.js";
import CardWrapper from "./components/CardWrapper.js";
import LoginAndRegisterPage from "./components/LoginAndRegisterPage.js";
import DrinkSec from "./components/DrinkSec.js";

function App() {
  const [showLogin, setShowLogin] = useState(false);

  const switchToLoginAndRegisterPage = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className="App">
      <UserContextProvider>
        {/* Your code goes here bois */}

        {showLogin ? (
          <LoginAndRegisterPage
            switchToLoginAndRegisterPage={switchToLoginAndRegisterPage}
          />
        ) : (
          <>
            {/* Your code goes here bois */}
            <Navbar
              switchToLoginAndRegisterPage={switchToLoginAndRegisterPage}
            />
            <Hero />
            <CardWrapper />
          </>
        )}
      </UserContextProvider>
      <DrinkSec />
    </div>
  );
}

export default App;
