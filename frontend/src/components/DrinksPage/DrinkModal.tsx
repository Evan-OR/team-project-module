import { useEffect, useRef } from 'react';
import FilledStar from '../../icons/FilledStar';
import HollowStar from '../../icons/HollowStar';
import ThumbsUp from '../../icons/ThumbsUp';
import style from '../../styles/drinkModalStyles.module.scss';
import { Drink } from '../../types/UserTypes';
import { assertIsNode, dealWithStupidFuckingJson } from '../../utils/utils';

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

        {/* Instructions & Ingredients */}
        <div className={style.infoWrapper}>
          <div className={style.title}>{drink.strDrink}</div>
          <div className={style.makingInfoWrapper}>
            <div className={style.modalDivide}>
              <div className={style.subTitle}>Instructions</div>
              <div>{drink.strInstructions}</div>
            </div>

            <div className={style.ingredientsWrapper}>
              <div className={style.subTitle}>Ingredients</div>

              <div className={style.ingredients}>{dealWithStupidFuckingJson(drink)}</div>
            </div>
          </div>
          {/* RATING AND LIKES STARTS HERE */}
          <div className={style.ratingAndLikesWrapper}>
            <div className={style.ratingWrapper}>
              <FilledStar styles={style.filled} />
              <FilledStar styles={style.filled} />
              <FilledStar styles={style.filled} />
              <FilledStar styles={style.filled} />
              <HollowStar styles={style.filled} />
            </div>
            <div className={style.likesWrapper}>
              <ThumbsUp styles={style.likeBtn} />
              <ThumbsUp styles={style.dislikeBtn} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DrinkModal;
