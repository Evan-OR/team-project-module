import React from 'react';
import drinkData from '../../drinks.json';
import drinksecStyles from '../../styles/drinksecStyles.module.scss';

export default function DrinkCards() {
  return (
    <div className={drinksecStyles.drinkcardHolder}>
      {drinkData.map((drink) => {
        return (
          <div key={drink.id} className={drinksecStyles.drinkCardWrapper}>
            <div className={drinksecStyles.DrinkItem} key={drink.id}>
              <h3 className={drinksecStyles.drinkTitle}>{drink.name}</h3>
              <p className={drinksecStyles.cardPara}>{drink.instructions}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
