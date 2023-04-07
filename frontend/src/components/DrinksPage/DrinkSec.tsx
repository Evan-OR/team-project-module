import React, { useContext, useEffect, useState } from 'react';
import styles from '../../styles/drinkStyles/drinksecStyles.module.scss';
import DrinkCard from './DrinkCard';
import drinks from '../../dataset/drinks.json';
import DisplayDrinkPage from './DisplayDrinkPage';
import { UserContext } from '../context/UserContext';
import { getDrinkRecommendations } from '../../utils/drinksUtil';
import { Drink } from '../../types/UserTypes';
import DrinkSearchBar from './DrinkSearchBar';
import LoginPrompt from '../LoginPrompt';

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

  const renderDrinkRecommendation = () => {
    if (userContext === null || userContext.user === null) {
      return <LoginPrompt text="Login to get drink Recommendations" />;
    } else {
      return drinkRecommendations.length > 0 && searchText.length === 0 ? (
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
      );
    }
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
    //         id: drink.id,
    //         name: drink.name,
    //         imageURL: drink.imageURL,
    //         tags: drink.tags,
    //         instructions: drink.instructions,
    //         ingredients: [
    //           drink.ingredient1,
    //           drink.ingredient2,
    //           drink.ingredient3,
    //           drink.ingredient4,
    //           drink.ingredient5,
    //           drink.ingredient6,
    //           drink.ingredient7,
    //           drink.ingredient8,
    //           drink.ingredient9,
    //           drink.ingredient10,
    //           drink.ingredient11,
    //           drink.ingredient12,
    //           drink.ingredient13,
    //           drink.ingredient14,
    //           drink.ingredient15,
    //         ],
    //         measurements: [
    //           drink.measurement1,
    //           drink.measurement2,
    //           drink.measurement3,
    //           drink.measurement4,
    //           drink.measurement5,
    //           drink.measurement6,
    //           drink.measurement7,
    //           drink.measurement8,
    //           drink.measurement9,
    //           drink.measurement10,
    //           drink.measurement11,
    //           drink.measurement12,
    //           drink.measurement13,
    //           drink.measurement14,
    //           drink.measurement15,
    //         ],
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

      {modalToggle ? (
        <DisplayDrinkPage toggleModal={toggleModal} drink={currentDrink} />
      ) : (
        <>
          {renderDrinkRecommendation()}
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
