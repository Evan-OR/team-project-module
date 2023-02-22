import { useState } from 'react';
import LoginPage from './components/LoginPage.js';
import Navbar from './components/Navbar.js';

function App() {
  const [showLogin, setShowLogin] = useState(false);

  const switchToLogin = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className="App">
      <button onClick={switchToLogin} type="button">
        Go To Login Page
      </button>
      {/* Your code goes here bois */}

      {showLogin ? (
        <LoginPage />
      ) : (
        <>
          <Navbar />
          <h1>TEAM PROJECT</h1>
        </>
      )}
    </div>
  );
}

export default App;
