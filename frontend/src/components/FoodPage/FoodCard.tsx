import React from 'react';
import foodStyles from '../../styles/foodCardStyle.module.scss';
import { Meal } from '../../types/UserTypes';

type foodCardProps = {
  meal: Meal;
}
const FoodCard = (props: foodCardProps) => {
  const{meal} = props;
  return (
    <div className={foodStyles.foodCardWrapper}>
      <img draggable="false" src={meal.strMealThumb}/>
      <div className={foodStyles.infoWrapper}>
        <div className={foodStyles.title}>
          {meal.strMeal}
        </div>
        <div className={foodStyles.tagWrapper}>
        {meal.strTags?.split(',').map((tag) => (
            <div key={tag} className={foodStyles.tag}>
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FoodCard