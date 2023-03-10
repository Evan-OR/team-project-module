import { useContext } from 'react';
import { UserContextProvider } from './components/context/UserContext.js';
import { LoginModalContext } from './components/context/LoginModalContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage.js';
import DrinksPage from './components/DrinksPage/DrinksPage.js';
import FoodPage from './components/FoodPage/FoodPage.js';
import LoginAndRegisterModal from './components/login&register/LoginAndRegisterModal.js';
import LikesPage from './components/LikesPage/LikesPage.js';

function App() {
  const { showLoginModal, setShowLoginModal } = useContext(LoginModalContext);

  return (
    <Router>
      <div className="App">
        <UserContextProvider>
          {showLoginModal ? <LoginAndRegisterModal /> : <></>}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/drinks" element={<DrinksPage />} />
            <Route path="/food" element={<FoodPage />} />
            <Route path="/likes" element={<LikesPage />} />
          </Routes>
        </UserContextProvider>
      </div>
    </Router>
  );
}

export default App;
