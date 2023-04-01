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

    // console.log(
    //   JSON.stringify(
    //     drinks.map((drink) => {
    //       return {
    //         id: drink.idDrink,
    //         name: drink.strDrink,
    //         imageURL: drink.strDrinkThumb,
    //         tags: drink.strTags,
    //         instructions: drink.strInstructions,
    //         ingredient1: drink.strIngredient1,
    //         ingredient2: drink.strIngredient2,
    //         ingredient3: drink.strIngredient3,
    //         ingredient4: drink.strIngredient4,
    //         ingredient5: drink.strIngredient5,
    //         ingredient6: drink.strIngredient6,
    //         ingredient7: drink.strIngredient7,
    //         ingredient8: drink.strIngredient8,
    //         ingredient9: drink.strIngredient9,
    //         ingredient10: drink.strIngredient10,
    //         ingredient11: drink.strIngredient11,
    //         ingredient12: drink.strIngredient12,
    //         ingredient13: drink.strIngredient13,
    //         ingredient14: drink.strIngredient14,
    //         ingredient15: drink.strIngredient15,
    //         measurement1: drink.strMeasure1,
    //         measurement2: drink.strMeasure2,
    //         measurement3: drink.strMeasure3,
    //         measurement4: drink.strMeasure4,
    //         measurement5: drink.strMeasure5,
    //         measurement6: drink.strMeasure6,
    //         measurement7: drink.strMeasure7,
    //         measurement8: drink.strMeasure8,
    //         measurement9: drink.strMeasure9,
    //         measurement10: drink.strMeasure10,
    //         measurement11: drink.strMeasure11,
    //         measurement12: drink.strMeasure12,
    //         measurement13: drink.strMeasure13,
    //         measurement14: drink.strMeasure14,
    //         measurement15: drink.strMeasure15,
    //       };
    //     })
    //   )
    // );

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
              <DrinkCard key={drink.id} drink={drink} toggleModal={toggleModal} />
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
                <DrinkCard key={drink.id} drink={drink} toggleModal={toggleModal} />
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
              drinkList.map((el) => el.id)
            ).map((drink) => (
              <DrinkCard key={drink.id} drink={drink} toggleModal={toggleModal} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DrinkSec;
