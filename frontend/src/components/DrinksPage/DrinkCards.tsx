import React from 'react';
import drinkData from '../../dataset/drinks.json';
import drinksecStyles from '../../styles/drinkCardStyle.module.scss';
import sotb from '../../images/drinkImgs/sexonthebeach.jpg';

export default function DrinkCards() {
  return (
    <div className={drinksecStyles.drinkMenu}>
      {drinkData.map((drink) => {
        return (
          <div className={drinksecStyles.drinkCardWrapper} key={drink.idDrink}>
            <div className={drinksecStyles.drinkCard}>
              <div className={drinksecStyles.drinkItem} key={drink.idDrink}>
                <img src={sotb} alt="sotbimg" className={drinksecStyles.drinkImg} />
                <h3 className={drinksecStyles.drinkTitle}>{drink.strDrink}</h3>
                <div className={drinksecStyles.drinkSmallInfoWrapper}>
                  <div className={drinksecStyles.drinkSmallInfo}>
                    {/* //! Need to get buton and rating to seperate properly */}
                    <button className={drinksecStyles.drinkMoreInfoBtn}>Read More</button>
                    <p className={drinksecStyles.drinkRating}>Rating 5/5</p>
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
