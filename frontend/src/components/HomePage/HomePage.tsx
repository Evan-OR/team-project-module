import React from 'react';
import CardWrapper from './CardWrapper';
import Hero from './Hero';
import Navbar from '../Navbar';

function HomePage() {
  return (
    <>
      <Navbar currentPage={'Home'} />
      <Hero />
      <CardWrapper />
    </>
  );
}

export default HomePage;
