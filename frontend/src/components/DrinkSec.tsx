import React from "react";
import drinksecStyles from "../styles/drinksecStyles.module.scss";
import DrinkCards from "../components/DrinkCards";

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
      <div className={drinksecStyles.DrinkMenuContainer}>
        <div className={drinksecStyles.titleWrapper}>
          <h2 className={drinksecStyles.title}>Suggested Drinks</h2>
        </div>
        <DrinkCards />
      </div>
    </div>
  );
};

export default DrinkSec;
