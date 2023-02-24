import React from "react";
import drinksecStyles from "../styles/drinksecStyles.module.scss";
const DrinkSec = () => {
  return (
    <div className={drinksecStyles.DrinkDisplayWrapper}>
      <form action="" className={drinksecStyles.Searchbar}>
        <input
          type="text"
          placeholder="Search for drink!"
          className={drinksecStyles.drinkInput}
        />
      </form>

      <h2 className={drinksecStyles.title}>Suggested Drinks</h2>

      <div className={drinksecStyles.DrinkMenuContainer}>
        <div className={drinksecStyles.DrinkItem}>
          <h3 className={drinksecStyles.drinkTitle}>Drink Item</h3>
        </div>
        <div className={drinksecStyles.DrinkItem}>
          <h3 className={drinksecStyles.drinkTitle}>Drink Item</h3>
        </div>
        <div className={drinksecStyles.DrinkItem}>
          <h3 className={drinksecStyles.drinkTitle}>Drink Item</h3>
        </div>
        <div className={drinksecStyles.DrinkItem}>
          <h3 className={drinksecStyles.drinkTitle}>Drink Item</h3>
        </div>
      </div>
    </div>
  );
};

export default DrinkSec;
