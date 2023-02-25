import React from "react";
import foodsecStyles from "../styles/foodsecStyles.module.scss";
const DrinkSec = () => {
  return (
    <div className={foodsecStyles.foodDisplayWrapper}>
      <form action="" className={foodsecStyles.foodSearchbar}>
        <input
          type="text"
          placeholder="Search for drink!"
          className={foodsecStyles.foodInput}
        />
      </form>

      <div className={foodsecStyles.foodMenuContainer}>
        <div className={foodsecStyles.titleWrapper}>
          <h2 className={foodsecStyles.title}>Suggested Drinks</h2>
        </div>
        <div className={foodsecStyles.foodCardWrapper}>
          <div className={foodsecStyles.foodItem}>
            <h3 className={foodsecStyles.foodTitle}>Drink Item</h3>
          </div>
          <div className={foodsecStyles.foodItem}>
            <h3 className={foodsecStyles.foodTitle}>Drink Item</h3>
          </div>
          <div className={foodsecStyles.foodItem}>
            <h3 className={foodsecStyles.drinkTitle}>Drink Item</h3>
          </div>
          <div className={foodsecStyles.foodItem}>
            <h3 className={foodsecStyles.foodTitle}>Drink Item</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrinkSec;
