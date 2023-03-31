import React from 'react';
import foodcardStyles from '../../styles/foodCardStyle.module.scss';
import sotb from '../../images/drinkImgs/sexonthebeach.jpg';

const FoodCard = (props: { meals: any; strTags: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => {
  const meals = props.meals;
  console.log(meals)
  return (
    <div className={foodcardStyles.foodMenu}>
        <div className="CardWrapper">
    <div className="Title">
      {meals.mealName}
    </div>
    <div className="Tags">
      {props.strTags}
    </div>
  </div>
    </div>

    
  );
}

export default FoodCard