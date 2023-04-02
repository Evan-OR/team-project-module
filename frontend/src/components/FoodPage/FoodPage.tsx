import React from 'react';
import Navbar from '../Navbar';
import FoodSec from './FoodSec';

function FoodPage() {
  return (
    <>
      <Navbar currentPage={'Food'} />
      <FoodSec />
    </>
  );
}

export default FoodPage;