import React, { useContext, useEffect, useState } from 'react';
import styles from '../../styles/drinkStyles/drinksecStyles.module.scss';
import DrinkCard from './DrinkCard';
import DRINKS from '../../dataset/drinks.json';
import DisplayDrinkPage from './DisplayDrinkPage';
import { UserContext } from '../context/UserContext';
import { getDrinkRecommendations } from '../../utils/drinksUtil';
import { Drink } from '../../types/UserTypes';
import DrinkSearchBar from './DrinkSearchBar';
import LoginPrompt from '../LoginPrompt';

const DrinkSec = () => {
  const [modalToggle, setToggleModal] = useState(false);

  const [currentDrink, setCurrentDrink] = useState<Drink>(DRINKS[0]);
  const drinksPerPage = 12;
  const [drinkPageIndex, setDrinkPageIndex] = useState<number>(0);
  const [drinkList, setDrinkList] = useState<Drink[]>(DRINKS.slice(drinkPageIndex, drinkPageIndex + drinksPerPage));

  const userContext = useContext(UserContext);
  const [drinkRecommendations, setDrinkRecommendations] = useState<Drink[]>([]);
  //For search bar
  const [searchText, setSearchText] = useState('');
  const [confirmedSearch, setConfirmedSearch] = useState<boolean>(false);

  const toggleModal = (drink: Drink | null) => {
    setToggleModal(!modalToggle);

    if (drink === null) return;
    setCurrentDrink(drink);
  };

  const initializeDrinkRecommendations = (): Drink[] => {
    if (userContext === null || userContext.user === null) return [];
    const dr = getDrinkRecommendations(DRINKS, userContext.user.likes);
    return dr.length > 5 ? dr.slice(0, 4) : dr;
  };

  const updateDrinkList = (drinks: Drink[], dontAffectConfirmedSearch?: boolean) => {
    if (!dontAffectConfirmedSearch) setConfirmedSearch(true);

    if (drinks === DRINKS) {
      setDrinkList(drinks.slice(drinkPageIndex, drinkPageIndex + drinksPerPage));
    } else {
      setDrinkList(drinks);
    }
  };

  const setSearchTextHandler = (s: string) => {
    setConfirmedSearch(false);
    setSearchText(s);
  };

  const renderDrinkRecommendation = () => {
    if (!userContext || !userContext.user) {
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

  const generatePages = () => {
    const pageCount = Math.ceil(DRINKS.length / drinksPerPage);
    const divs = [];

    for (let i = 0; i < pageCount; i++) {
      let pageIndex = drinksPerPage * i;
      divs.push(
        <a
          href="#nav"
          key={i}
          onClick={() => changePage(pageIndex)}
          className={`${styles.drinkDisplayPageLink} ${drinkPageIndex === pageIndex && styles.currentPage}`}
        >
          {i + 1}
        </a>
      );
    }

    return divs;
  };

  const changePage = (startingIndex: number) => {
    setDrinkPageIndex(startingIndex);
  };

  // UPDATE DRINKS AFTER USER LOGS IN
  useEffect(() => {
    setDrinkRecommendations(initializeDrinkRecommendations());
    if (modalToggle) return;

    if (drinkRecommendations.length > 0) setDrinkList(drinkRecommendations);
  }, []);

  useEffect(() => {
    updateDrinkList(DRINKS.slice(drinkPageIndex, drinkPageIndex + drinksPerPage), true);
  }, [drinkPageIndex]);

  useEffect(() => {
    setDrinkRecommendations(initializeDrinkRecommendations());
  }, [userContext]);

  return (
    <div className={styles.DrinkDisplayWrapper}>
      <DrinkSearchBar
        searchText={searchText}
        setSearchTextHandler={setSearchTextHandler}
        updateDrinkList={updateDrinkList}
        drinks={DRINKS}
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
              {searchText.length === 0 && userContext?.user && <h3 className={styles.title}>Browse Drinks</h3>}
            </div>

            <div className={styles.cardDisplayWrapper}>
              {drinkList.map((drink) => (
                <DrinkCard key={drink.id} drink={drink} toggleModal={toggleModal} />
              ))}
            </div>
          </div>
          <div style={{ display: 'flex' }}>{generatePages()}</div>
        </>
      )}

      {/* getDrinkRecommendations(drinks, drinkList) */}
      {confirmedSearch && (
        <div className={styles.DrinkMenuContainer}>
          <div className={styles.titleWrapper}>
            <h3 className={styles.title}>Drinks Similar To You Search</h3>
          </div>

          <div className={styles.cardDisplayWrapper}>
            {getDrinkRecommendations(
              DRINKS,
              drinkList.map((el) => el.id)
            )
              .slice(0, 4)
              .map((drink) => (
                <DrinkCard key={drink.id} drink={drink} toggleModal={toggleModal} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DrinkSec;
