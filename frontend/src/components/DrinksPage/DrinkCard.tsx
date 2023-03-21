import React from 'react';
import styles from '../../styles/drinkCardStyle.module.scss';
import { Drink } from '../../types/UserTypes';
import FilledStar from '../../icons/FilledStar';
import HollowStar from '../../icons/HollowStar';

type DrinkCardProps = {
  drink: Drink;
  index: number;
  toggleModal: (index: number) => void;
};

function DrinkCard(props: DrinkCardProps) {
  const { drink, index, toggleModal } = props;

  return (
    <div onClick={() => toggleModal(index)} className={styles.drinkCardWrapper2}>
      <img draggable="false" src={drink.strDrinkThumb}></img>
      <div className={styles.infoWrapper}>
        <div className={styles.title}>{drink.strDrink}</div>
        <div className={styles.tagWrapper}>
          {drink.strTags?.split(',').map((tag) => (
            <div key={tag} className={styles.tag}>
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DrinkCard;
