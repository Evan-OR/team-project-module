import React, { useContext, useState } from 'react';
import drinksecStyles from '../../styles/drinksecStyles.module.scss';
import DrinkCard from './DrinkCard';
import DrinkCards from './DrinkCards';
import drinks from '../../dataset/drinks.json';
import DrinkModal from './DrinkModal';
import { UserContext } from '../context/UserContext';

const DrinkSec = () => {
  const [modalToggle, setToggleModal] = useState(false);
  const [currentDrink, setCurrentDrink] = useState(drinks[0]);
  const userContext = useContext(UserContext);

  const toggleModal = (index: number | null) => {
    setToggleModal(!modalToggle);

    if (index === null) return;
    setCurrentDrink(drinks[index]);
  };

  return (
    <div className={drinksecStyles.DrinkDisplayWrapper}>
      {modalToggle ? <DrinkModal toggleModal={toggleModal} drink={currentDrink} /> : <></>}
      <form className={drinksecStyles.Searchbar}>
        <input type="text" placeholder="Search for drink!" className={drinksecStyles.drinkInput} />
      </form>
      <button
        onClick={() => {
          if (userContext?.user?.likes === undefined || userContext?.user?.likes === null) return;
          for (const drink of drinks) {
            for (const id of userContext.user.likes) {
              if (drink.idDrink === id) {
                console.log(drink.strDrink);
              }
            }
          }
        }}
        type="button"
      >
        Print User Likes
      </button>

      <div className={drinksecStyles.DrinkMenuContainer}>
        <div className={drinksecStyles.titleWrapper}>
          <h2 className={drinksecStyles.title}>Suggested Drinks</h2>
        </div>

        <div className={drinksecStyles.cardDisplayWrapper}>
          {drinks.map((drink, index) => (
            <DrinkCard key={drink.idDrink} drink={drink} toggleModal={toggleModal} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DrinkSec;
