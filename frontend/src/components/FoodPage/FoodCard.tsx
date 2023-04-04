import React from 'react';
import foodStyles from '../../styles/foodStyles/foodCardStyle.module.scss';
import { Meal } from '../../types/UserTypes';

type foodCardProps = {
  meal: Meal;
  toggleModal: (index: Meal) => void;
}
const FoodCard = (props: foodCardProps) => {
  const{meal, toggleModal} = props;
  
  return (
    <div onClick={() => toggleModal(meal)} className={foodStyles.foodCardWrapper}>
      <img draggable="false" src={meal.imageURL}/>
      <div className={foodStyles.infoWrapper}>
        <div className={foodStyles.title}>
          {meal.mealName}
        </div>
        <div className={foodStyles.tagWrapper}>
        {meal.tags?.split(',').map((tag) => (
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