import React from 'react';
import foodData from '../../dataset/food.json';
import foodcardStyles from '../../styles/foodCardStyle.module.scss';
import sotb from '../../images/drinkImgs/sexonthebeach.jpg';

export default function DrinkCards() {
  return (
    <div className={foodcardStyles.foodMenu}>
      {/* {foodData.map((food) => {
        return (
          <div className={foodcardStyles.foodCardWrapper} key={food.id}>
            <div className={foodcardStyles.foodCard}>
              <div className={foodcardStyles.foodItem} key={food.id}>
                <img src={sotb} alt="sotbimg" className={foodcardStyles.foodImg} />
                <h3 className={foodcardStyles.foodTitle}>{food.name}</h3>
                <div className={foodcardStyles.foodSmallInfoWrapper}>
                  <div className={foodcardStyles.foodSmallInfo}>
                    <button className={foodcardStyles.foodMoreInfoBtn}>Read More</button>
                    <p className={foodcardStyles.foodRating}>Rating 5/5</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })} */}
    </div>
  );
  //! TODO: NEED TO ADD MODAL TO GIVE FULL INSTRUCTIONS ON HOW TO MAKE THE DRINK
  //! AND COMMENT SECTION ETC...
}
