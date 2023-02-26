import React from 'react';
import FoodSec from './FoodSec';
import Navbar from '../Navbar';

type FoodPageProps = {
  switchToLoginAndRegisterPage: () => void;
};

function FoodPage(props: FoodPageProps) {
  const { switchToLoginAndRegisterPage } = props;
  return (
    <>
      <Navbar switchToLoginAndRegisterPage={switchToLoginAndRegisterPage} />
      <FoodSec />
    </>
  );
}

export default FoodPage;
