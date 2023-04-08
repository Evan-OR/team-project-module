import { useContext, useEffect } from 'react';
import { UserContext } from './components/context/UserContext.js';
import { LoginModalContext } from './components/context/LoginModalContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage.js';
import DrinksPage from './components/DrinksPage/DrinksPage.js';
import LoginAndRegisterModal from './components/login&register/LoginAndRegisterModal.js';
import LikesPage from './components/LikesPage/LikesPage.js';
import { getUserFromDatabaseByID } from './utils/userUtil.js';

function App() {
  const { showLoginModal, setShowLoginModal } = useContext(LoginModalContext);
  const userContext = useContext(UserContext);

  const updatedUser = async () => {
    if (userContext === null) return;
    if (userContext.user == null) return;

    userContext.setUser(await getUserFromDatabaseByID(userContext.user.userID));
  };

  useEffect(() => {
    updatedUser();
  }, []);

  return (
    <Router>
      <div className="App">
        {showLoginModal ? <LoginAndRegisterModal /> : <></>}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/drinks" element={<DrinksPage />} />
          <Route path="/likes" element={<LikesPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
