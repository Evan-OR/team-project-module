import React, { Component } from "react";
import { useState } from "react";
import foodsecStyles from "../../styles/foodsecStyles.module.scss";
import FoodCard from "./FoodCard";
import food from "../../dataset/food.json"


const foodSec = () => {
  // const meals = () => {
  //   <div>
  //       {food.map((food) => (
  //           <div className="CardWrapper"></div>
  //       ))}
  //   </div>
  // }

  const [meals, setMeals] = useState([
        food.map((meals) => (
          {mealName: meals.strMeal, mealID: meals.idMeal}
        ))
    ]);

  return(
    <div className="FoodWrapper">
      <FoodCard meals={meals}/>
    </div>
  )
};

export default foodSec;