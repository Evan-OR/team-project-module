import React from "react";
import foodData from "../../dataset/food.json";
import foodcardStyles from "../../styles/foodCardStyle.module.scss";
import sotb from "../../images/drinkImgs/sexonthebeach.jpg";

export default function DrinkCards() {
  return (
    <div className={foodcardStyles.foodMenu}>
      {foodData.map((food) => {
        return (
          <div className={foodcardStyles.foodCardWrapper} key={food.idMeal}>
            <div className={foodcardStyles.foodCard}>
              <img draggable="false" src={food.strMealThumb}></img>
              <div className={foodcardStyles.foodItem}>
                <div className={foodcardStyles.infoWrapper}>
                  <div className={foodcardStyles.title}>{food.strMeal}</div>

                  <div className={foodcardStyles.tagWrapper}>
                    {food.strTags?.split(",").map((tag) => (
                      <div key={tag} className={foodcardStyles.tag}>
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
  //! TODO: NEED TO ADD MODAL TO GIVE FULL INSTRUCTIONS ON HOW TO MAKE THE DRINK
  //! AND COMMENT SECTION ETC...
}
