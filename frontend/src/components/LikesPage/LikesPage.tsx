import React, { useContext, useEffect, useState } from 'react';
import drinksecStyles from '../../styles/drinkStyles/drinksecStyles.module.scss';
import { UserContext } from '../context/UserContext';
import drinks from '../../dataset/drinks.json';
import DrinkCard from '../DrinksPage/DrinkCard';
import Navbar from '../Navbar';
import { Drink } from '../../types/UserTypes';
import DisplayDrinkPage from '../DrinksPage/DisplayDrinkPage';

function LikesPage() {
  const [modalToggle, setToggleModal] = useState(false);
  const [currentDrink, setCurrentDrink] = useState<Drink>(drinks[0]);
  const userContext = useContext(UserContext);

  const [likedDrinks, setLikedDrinks] = useState<Drink[]>([]);

  const toggleModal = (drink: Drink | null) => {
    setToggleModal(!modalToggle);

    if (drink === null) return;
    setCurrentDrink(drink);
  };

  useEffect(() => {
    const tempLikeArray: Drink[] = [];

    for (const drink of drinks) {
      if (userContext === null || userContext.user === null) break;
      for (const id of userContext.user.likes) {
        if (drink.id === id) {
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
        <div className={drinksecStyles.DrinkMenuContainer}>
          <div className={drinksecStyles.titleWrapper}>
            <h1 className={drinksecStyles.title}>Drinks You've Liked</h1>
          </div>

          {modalToggle ? (
            <DisplayDrinkPage toggleModal={toggleModal} drink={currentDrink} />
          ) : (
            <>
              <div className={drinksecStyles.cardDisplayWrapper}>
                {likedDrinks.map((drink) => (
                  <DrinkCard key={drink.id} drink={drink} toggleModal={toggleModal} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default LikesPage;
