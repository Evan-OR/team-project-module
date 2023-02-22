import { useState } from 'react';
import { UserContext, UserContextProvider } from './components/context/UserContext.js';
import Navbar from './components/Navbar.js';
import Hero from './components/Hero.js';
import Instruction from './components/Instruction.js';
import LoginAndRegisterPage from './components/LoginAndRegisterPage.js';

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
          <LoginAndRegisterPage />
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
