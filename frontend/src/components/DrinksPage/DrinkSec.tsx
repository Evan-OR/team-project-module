import React, { useContext, useEffect, useState } from 'react';
import styles from '../../styles/drinksecStyles.module.scss';
import DrinkCard from './DrinkCard';
import drinks from '../../dataset/drinks.json';
import DisplayDrinkPage from './DisplayDrinkPage';
import { UserContext } from '../context/UserContext';
import { getDrinkRecommendations } from '../../utils/drinksUtil';
import { Drink } from '../../types/UserTypes';
import DrinkSearchBar from './DrinkSearchBar';

const DrinkSec = () => {
  const [modalToggle, setToggleModal] = useState(false);
  const [currentDrink, setCurrentDrink] = useState<Drink>(drinks[0]);
  const [drinkList, setDrinkList] = useState<Drink[]>(drinks);
  const userContext = useContext(UserContext);
  const [drinkRecommendations, setDrinkRecommendations] = useState<Drink[]>([]);
  //For search bar
  const [searchText, setSearchText] = useState('');

  const toggleModal = (drink: Drink | null) => {
    setToggleModal(!modalToggle);

    if (drink === null) return;
    setCurrentDrink(drink);
  };

  const initializeDrinkRecommendations = (): Drink[] => {
    if (userContext === null || userContext.user === null) return [];
    const dr = getDrinkRecommendations(drinks, userContext.user.likes);
    return dr.length > 5 ? dr.slice(0, 4) : dr;
  };

  const updateDrinkList = (drinks: Drink[]) => {
    setDrinkList(drinks);
  };

  const setSearchTextHandler = (s: string) => {
    setSearchText(s);
  };

  // UPDATE DRINKS AFTER USER LOGS IN
  useEffect(() => {
    setDrinkRecommendations(initializeDrinkRecommendations());
  }, []);

  useEffect(() => {
    if (modalToggle) return;

    if (drinkRecommendations.length > 0) setDrinkList(drinkRecommendations);
  }, []);

  return (
    <div className={styles.DrinkDisplayWrapper}>
      <DrinkSearchBar
        searchText={searchText}
        setSearchTextHandler={setSearchTextHandler}
        updateDrinkList={updateDrinkList}
        drinks={drinks}
        toggleModal={toggleModal}
        modalIsShowing={modalToggle}
      />

      {/* RENDER DRINK RECOMMENDATIONS START*/}
      {drinkRecommendations.length > 0 && searchText.length === 0 ? (
        <div className={styles.DrinkMenuContainer}>
          <div className={styles.titleWrapper}>
            <h3 className={styles.title}>Suggestions based on your likes</h3>
          </div>

          <div className={styles.cardDisplayWrapper}>
            {drinkRecommendations.map((drink) => (
              <DrinkCard key={drink.idDrink} drink={drink} toggleModal={toggleModal} />
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
      {/* RENDER DRINK RECOMMENDATIONS END*/}

      {modalToggle ? (
        <DisplayDrinkPage toggleModal={toggleModal} drink={currentDrink} />
      ) : (
        <>
          <div className={styles.DrinkMenuContainer}>
            <div className={styles.titleWrapper}>
              {searchText.length === 0 && <h3 className={styles.title}>Other Drinks</h3>}
            </div>

            <div className={styles.cardDisplayWrapper}>
              {drinkList.map((drink) => (
                <DrinkCard key={drink.idDrink} drink={drink} toggleModal={toggleModal} />
              ))}
            </div>
          </div>
        </>
      )}

      {/* getDrinkRecommendations(drinks, drinkList) */}
      {drinkList.length > 0 && searchText.length > 0 && (
        <div className={styles.DrinkMenuContainer}>
          <div className={styles.titleWrapper}>
            <h3 className={styles.title}>Drinks Similar To You Search</h3>
          </div>

          <div className={styles.cardDisplayWrapper}>
            {getDrinkRecommendations(
              drinks,
              drinkList.map((el) => el.idDrink)
            ).map((drink) => (
              <DrinkCard key={drink.idDrink} drink={drink} toggleModal={toggleModal} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DrinkSec;
