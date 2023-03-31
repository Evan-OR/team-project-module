import React, { Component } from "react";
import { useState } from "react";
import foodsecStyles from "../../styles/foodsecStyles.module.scss";
import FoodCard from "./FoodCard";
import food from "../../dataset/food.json"
import { Meal } from "../../types/UserTypes";


const foodSec = () => {
  const [foodList, setFoodList] = useState<Meal[]>(food);



  return(
    <div className="FoodWrapper">
      {foodList.map((meal) => (
        <FoodCard key={meal.idMeal} meal={meal}/> 
        ))}
    </div>
  )
};

export default foodSec;  

//!This code words with getting out data from json
  // const [meals, setMeals] = useState([
  //       food.map((meals) => (
  //         {mealName: meals.strMeal, mealID: meals.idMeal}
  //       ))
  //   ]);
