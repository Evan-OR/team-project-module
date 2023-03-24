import React, { useContext, useEffect, useState } from 'react';
import drinksecStyles from '../../styles/drinksecStyles.module.scss';
import DrinkCard from './DrinkCard';
import drinks from '../../dataset/drinks.json';
import DrinkModal from './DrinkModal';
import { UserContext } from '../context/UserContext';
import { getDrinkRecommendations } from '../../utils/drinksUtil';
import { Drink } from '../../types/UserTypes';
import DrinkSearchBar from './DrinkSearchBar';

const DrinkSec = () => {
  const [modalToggle, setToggleModal] = useState(false);
  const [currentDrink, setCurrentDrink] = useState(drinks[0]);
  const [drinkList, setDrinkList] = useState<Drink[]>(drinks);
  const userContext = useContext(UserContext);
  const [drinkRecommendations, setDrinkRecommendations] = useState<Drink[]>([]);

  const toggleModal = (index: number | null) => {
    setToggleModal(!modalToggle);

    if (index === null) return;
    setCurrentDrink(drinks[index]);
  };

  const initializeDrinkRecommendations = (): Drink[] => {
    if (userContext === null || userContext.user === null) return [];
    const dr = getDrinkRecommendations(drinks, userContext.user.likes);
    return dr.length > 5 ? dr.slice(0, 4) : dr;
  };

  const updateDrinkList = (drinks: Drink[]) => {
    setDrinkList(drinks);
  };

  useEffect(() => {
    setDrinkRecommendations(initializeDrinkRecommendations());
  }, [userContext]);

  return (
    <div className={drinksecStyles.DrinkDisplayWrapper}>
      {modalToggle ? <DrinkModal toggleModal={toggleModal} drink={currentDrink} /> : <></>}

      <DrinkSearchBar updateDrinkList={updateDrinkList} drinks={drinks} />

      {/* RENDER DRINK RECOMMENDATIONS START*/}
      {/* {drinkRecommendations.length > 0 ? (
        <div className={drinksecStyles.DrinkMenuContainer}>
          <div className={drinksecStyles.titleWrapper}>
            <h2 className={drinksecStyles.title}>Suggested Drinks</h2>
          </div>

          <div className={drinksecStyles.cardDisplayWrapper}>
            {drinkRecommendations.map((drink, index) => (
              <DrinkCard key={drink.idDrink} drink={drink} toggleModal={toggleModal} index={index} />
            ))}
          </div>
        </div>
      ) : (
        <></>
      )} */}
      {/* RENDER DRINK RECOMMENDATIONS END*/}

      <div className={drinksecStyles.DrinkMenuContainer}>
        <div className={drinksecStyles.titleWrapper}>
          <h2 className={drinksecStyles.title}>Drinks</h2>
        </div>

        <div className={drinksecStyles.cardDisplayWrapper}>
          {drinkList.map((drink, index) => (
            <DrinkCard key={drink.idDrink} drink={drink} toggleModal={toggleModal} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DrinkSec;
