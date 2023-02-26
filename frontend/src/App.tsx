import { useState } from 'react';
import { UserContext, UserContextProvider } from './components/context/UserContext.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage.js';
import DrinksPage from './components/DrinksPage/DrinksPage.js';
import FoodPage from './components/FoodPage/FoodPage.js';

function App() {
  const [showLogin, setShowLogin] = useState(false);

  const switchToLoginAndRegisterPage = () => {
    setShowLogin(!showLogin);
  };

  return (
    <Router>
      <div className="App">
        <UserContextProvider>
          <Routes>
            <Route path="/" element={<HomePage switchToLoginAndRegisterPage={switchToLoginAndRegisterPage} />} />
            <Route
              path="/drinks"
              element={<DrinksPage switchToLoginAndRegisterPage={switchToLoginAndRegisterPage} />}
            />
            <Route path="/food" element={<FoodPage switchToLoginAndRegisterPage={switchToLoginAndRegisterPage} />} />
          </Routes>
        </UserContextProvider>
      </div>
    </Router>
  );
}

export default App;
