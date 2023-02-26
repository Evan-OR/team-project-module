import React from 'react';
import DrinkSec from './DrinkSec';
import Navbar from '../Navbar';

type DrinksPageProps = {
  switchToLoginAndRegisterPage: () => void;
};

function DrinksPage(props: DrinksPageProps) {
  const { switchToLoginAndRegisterPage } = props;
  return (
    <>
      <Navbar switchToLoginAndRegisterPage={switchToLoginAndRegisterPage} />
      <DrinkSec />
    </>
  );
}

export default DrinksPage;
