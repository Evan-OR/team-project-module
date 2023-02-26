import React from 'react';
import FoodSec from './FoodSec';
import Navbar from '../Navbar';

function FoodPage() {
  return (
    <>
      <Navbar currentPage={'Food'} />
      <FoodSec />
    </>
  );
}

export default FoodPage;
