import React, { Component } from "react";
import { useState } from "react";
import foodStyles from "../../styles/foodsecStyles.module.scss";
import FoodCard from "./FoodCard";
import food from "../../dataset/food.json"
import { Meal } from "../../types/UserTypes";

const foodSec = () => {
  const [foodList, setFoodList] = useState<Meal[]>(food);

  return(
    <div className={foodStyles.FoodDisplayWrapper}>
      <div className={foodStyles.titleWrapper}>
          <h3 className={foodStyles.title}>Other Drinks</h3>
      </div>
      <div className={foodStyles.FoodMenuContainer}>
        <div className={foodStyles.cardDisplayWrapper}>
          {foodList.map((meal) => (
          <FoodCard key={meal.idMeal} meal={meal}/> 
          ))}
        </div>
      </div>
    </div>
  )
};

export default foodSec;  