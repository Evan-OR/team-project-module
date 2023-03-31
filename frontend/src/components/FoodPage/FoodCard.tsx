import React from 'react';
import foodcardStyles from '../../styles/foodCardStyle.module.scss';
import { Meal } from '../../types/UserTypes';

type foodCardProps = {
  meal: Meal;
}
const FoodCard = (props: foodCardProps) => {
  const{meal} = props;
  return (
    <div className="cardWrapper">
      <div className="Title">
        {meal.strMeal}
      </div>
    </div>
  );
}

export default FoodCard