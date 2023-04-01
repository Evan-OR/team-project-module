import React from 'react';
import styles from '../../styles/drinkCardStyle.module.scss';
import { Drink } from '../../types/UserTypes';

type DrinkCardProps = {
  drink: Drink;
  toggleModal: (index: Drink) => void;
};

function DrinkCard(props: DrinkCardProps) {
  const { drink, toggleModal } = props;

  return (
    <div onClick={() => toggleModal(drink)} className={styles.drinkCardWrapper2}>
      <img draggable="false" src={drink.imageURL}></img>
      <div className={styles.infoWrapper}>
        <div className={styles.title}>{drink.name}</div>
        <div className={styles.tagWrapper}>
          {drink.tags?.split(',').map((tag) => (
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
