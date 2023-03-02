import { useEffect, useRef } from 'react';
import style from '../../styles/drinkModalStyles.module.scss';
import { Drink } from '../../types/UserTypes';
import { assertIsNode } from '../../utils/utils';

type DrinkModalProps = {
  toggleModal: (index: number | null) => void;
  drink: Drink;
};

function DrinkModal(props: DrinkModalProps) {
  const { toggleModal, drink } = props;
  const modal = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      assertIsNode(event.target);
      if (!modal.current?.contains(event.target)) {
        toggleModal(null);
      }
    };
    document.addEventListener('mousedown', handler);

    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className={style.modalWrapper}>
      <div ref={modal} className={style.modal}>
        <img src={drink.strDrinkThumb}></img>

        <div className={style.infoWrapper}>
          <div className={style.title}>{drink.strDrink}</div>
          <div className={style.makingInfoWrapper}>
            <div className={style.modalDivide}>
              <div className={style.subTitle}>Instructions</div>
              <div>{drink.strInstructions}</div>
            </div>

            <div className={style.modalDivide}>
              <div className={style.subTitle}>Ingredients</div>

              <div className={style.ingredients}>
                <div>
                  {drink.strMeasure1} {drink.strIngredient1}
                </div>
                <div>
                  {drink.strMeasure2} {drink.strIngredient2}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DrinkModal;
