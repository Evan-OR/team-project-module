import React from 'react';
import CardWrapper from './CardWrapper';
import Hero from './Hero';
import Navbar from '../Navbar';

type HomePageProps = {
  switchToLoginAndRegisterPage: () => void;
};

function HomePage(props: HomePageProps) {
  const { switchToLoginAndRegisterPage } = props;
  return (
    <>
      <Navbar switchToLoginAndRegisterPage={switchToLoginAndRegisterPage} currentPage={'Home'} />
      <Hero />
      <CardWrapper />
    </>
  );
}

export default HomePage;
