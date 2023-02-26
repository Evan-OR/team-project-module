import React from "react";
import drinkData from "../drinks.json";
import drinksecStyles from "../styles/drinksecStyles.module.scss";

export default function DrinkCards() {
  return (
    <div className={drinksecStyles.drinkcardHolder}>
      {drinkData.map((post) => {
        return (
          <div className={drinksecStyles.drinkCardWrapper}>
            <div className={drinksecStyles.DrinkItem} key={post.id}>
              <h3 className={drinksecStyles.drinkTitle}>{post.name}</h3>
              <p className={drinksecStyles.cardPara}>{post.instructions}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
