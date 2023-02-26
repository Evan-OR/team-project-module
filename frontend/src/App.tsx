import { useEffect, useState } from 'react';
import { UserContextProvider } from './components/context/UserContext.js';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage.js';
import DrinksPage from './components/DrinksPage/DrinksPage.js';
import FoodPage from './components/FoodPage/FoodPage.js';

function App() {
  return (
    <Router>
      <div className="App">
        <UserContextProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/drinks" element={<DrinksPage />} />
            <Route path="/food" element={<FoodPage />} />
          </Routes>
        </UserContextProvider>
      </div>
    </Router>
  );
}

export default App;
