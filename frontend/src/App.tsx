import { useState } from 'react';
import { UserContext, UserContextProvider } from './components/context/UserContext.js';
import LoginPage from './components/LoginPage.js';
import Navbar from './components/Navbar.js';
import Hero from './components/Hero.js';
import Instruction from './components/Instruction.js';

function App() {
  const [showLogin, setShowLogin] = useState(false);

  const switchToLogin = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className="App">
      <UserContextProvider>
        <button onClick={switchToLogin} type="button">
          Go To Login Page
        </button>
        {/* Your code goes here bois */}

        {showLogin ? (
          <LoginPage />
        ) : (
          <>
            {/* Your code goes here bois */}
            <Navbar />
            <Hero />
            <Instruction />
          </>
        )}
      </UserContextProvider>
    </div>
  );
}

export default App;
