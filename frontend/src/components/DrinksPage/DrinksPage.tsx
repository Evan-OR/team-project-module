import React from 'react';
import DrinkSec from './DrinkSec';
import Navbar from '../Navbar';

function DrinksPage() {
  return (
    <>
      <Navbar currentPage={'Drinks'} />
      <DrinkSec />
    </>
  );
}

export default DrinksPage;
