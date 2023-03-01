import React from "react";
import foodsecStyles from "../../styles/foodsecStyles.module.scss";
import FoodCards from "./FoodCard";
const foodSec = () => {
  return (
    <div className={foodsecStyles.foodDisplayWrapper}>
      <form action="" className={foodsecStyles.Searchbar}>
        <input
          type="text"
          placeholder="Search for Food!"
          className={foodsecStyles.foodInput}
        />
      </form>

      <div className={foodsecStyles.foodMenuContainer}>
        <div className={foodsecStyles.titleWrapper}>
          <h2 className={foodsecStyles.title}>Suggested Food</h2>
        </div>
        <FoodCards />
      </div>
    </div>
  );
};

export default foodSec;
