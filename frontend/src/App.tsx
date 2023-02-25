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
import FoodSec from "./components/FoodSec.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [showLogin, setShowLogin] = useState(false);

  const switchToLoginAndRegisterPage = () => {
    setShowLogin(!showLogin);
  };

  return (
    <Router>
      <div className="App">
        <UserContextProvider>
          {showLogin ? (
            <LoginAndRegisterPage
              switchToLoginAndRegisterPage={switchToLoginAndRegisterPage}
            />
          ) : (
            <>
              <switch>
                <Route path="/">
                  <Navbar
                    switchToLoginAndRegisterPage={switchToLoginAndRegisterPage}
                  />
                  <Hero />
                  <CardWrapper />
                  <Route exact path="/drinks">
                    <Navbar
                      switchToLoginAndRegisterPage={
                        switchToLoginAndRegisterPage
                      }
                    />
                    <DrinkSec />
                  </Route>
                </Route>
                <Route exact path="/food">
                  <Navbar
                    switchToLoginAndRegisterPage={switchToLoginAndRegisterPage}
                  />
                  <FoodSec />
                </Route>
              </switch>
            </>
          )}
        </UserContextProvider>
      </div>
    </Router>
  );
}

export default App;
