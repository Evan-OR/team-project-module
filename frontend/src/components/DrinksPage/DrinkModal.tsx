import { useContext, useEffect, useRef } from 'react';
import FilledStar from '../../icons/FilledStar';
import HollowStar from '../../icons/HollowStar';
import ThumbsUp from '../../icons/ThumbsUp';
import style from '../../styles/drinkModalStyles.module.scss';
import { Drink } from '../../types/UserTypes';
import { checkIfAlreadyLiked } from '../../utils/drinksUtil';
import { assertIsNode, dealWithStupidFuckingJson } from '../../utils/utils';
import { UserContext } from '../context/UserContext';

type DrinkModalProps = {
  toggleModal: (index: number | null) => void;
  drink: Drink;
};

function DrinkModal(props: DrinkModalProps) {
  const { toggleModal, drink } = props;
  const modal = useRef<HTMLDivElement>(null);
  const userContext = useContext(UserContext);

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

  const likeDrink = async () => {
    if (userContext?.user === null || userContext?.user === undefined) return;
    // Client side check if user already liked drink
    const userLikes = userContext?.user?.likes;
    if (userLikes && userLikes.includes(drink.idDrink)) {
      console.log('user already liked this');
      // MAYBE ADD REMOVE LIKE
      return;
    }

    //Create new like array info
    const newLikesArray = JSON.stringify([...userContext.user.likes, drink.idDrink]);

    const req = await fetch(`http://localhost:3000/like/${userContext?.user?.userID}/${newLikesArray}`, {
      method: 'post',
    });

    const res = await req.json();
    userContext.setUser({ ...userContext.user, likes: JSON.parse(res.newLikesArray) });
  };

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
              <ThumbsUp
                likedStyle={checkIfAlreadyLiked(drink.idDrink, userContext?.user?.likes) ? style.liked : ''}
                likeDrink={likeDrink}
                styles={style.likeBtn}
              />
              <ThumbsUp styles={style.dislikeBtn} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DrinkModal;
