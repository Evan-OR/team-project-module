import React from 'react';
import drinksecStyles from '../../styles/drinksecStyles.module.scss';
import DrinkCard from './DrinkCard';
import DrinkCards from './DrinkCards';
import drinks from '../../dataset/drinks.json';

const DrinkSec = () => {
  return (
    <div className={drinksecStyles.DrinkDisplayWrapper}>
      <form action="" className={drinksecStyles.Searchbar}>
        <input type="text" placeholder="Search for drink!" className={drinksecStyles.drinkInput} />
      </form>
      <div className={drinksecStyles.DrinkMenuContainer}>
        <div className={drinksecStyles.titleWrapper}>
          <h2 className={drinksecStyles.title}>Suggested Drinks</h2>
        </div>
        <div className={drinksecStyles.cardDisplayWrapper}>
          {drinks.map((drink) => (
            <DrinkCard key={drink.idDrink} drink={drink} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DrinkSec;
