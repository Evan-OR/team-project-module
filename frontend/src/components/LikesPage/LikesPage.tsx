import React, { useContext, useEffect, useState } from 'react';
import drinksecStyles from '../../styles/drinksecStyles.module.scss';
import { UserContext } from '../context/UserContext';
import drinks from '../../dataset/drinks.json';
import DrinkCard from '../DrinksPage/DrinkCard';
import Navbar from '../Navbar';
import { Drink } from '../../types/UserTypes';
import DrinkModal from '../DrinksPage/DrinkModal';

function LikesPage() {
  const [modalToggle, setToggleModal] = useState(false);
  const [currentDrink, setCurrentDrink] = useState(drinks[0]);
  const userContext = useContext(UserContext);

  const [likedDrinks, setLikedDrinks] = useState<Drink[]>([]);

  const toggleModal = (index: number | null) => {
    setToggleModal(!modalToggle);

    if (index === null) return;
    setCurrentDrink(drinks[index]);
  };

  useEffect(() => {
    const tempLikeArray: Drink[] = [];

    for (const drink of drinks) {
      if (userContext === null || userContext.user === null) break;
      for (const id of userContext.user.likes) {
        if (drink.idDrink === id) {
          tempLikeArray.push(drink);
        }
      }
    }

    setLikedDrinks(tempLikeArray);
  }, []);

  return (
    <>
      <Navbar currentPage={undefined} />
      <div className={drinksecStyles.DrinkDisplayWrapper}>
        {modalToggle ? <DrinkModal toggleModal={toggleModal} drink={currentDrink} /> : <></>}
        <div className={drinksecStyles.DrinkMenuContainer}>
          <div className={drinksecStyles.titleWrapper}>
            <h2 className={drinksecStyles.title}>Drinks You've Liked</h2>
          </div>

          <div className={drinksecStyles.cardDisplayWrapper}>
            {likedDrinks.map((drink, index) => (
              <DrinkCard key={drink.idDrink} drink={drink} toggleModal={toggleModal} index={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default LikesPage;
