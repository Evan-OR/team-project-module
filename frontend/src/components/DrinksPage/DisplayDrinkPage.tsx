import { useContext, useEffect, useRef } from 'react';
import CloseButton from '../../icons/CloseButton';
import FilledHeartIcon from '../../icons/FilledHeartIcon';
import HollowHeartIcon from '../../icons/HollowHeartIcon';
import ThumbsUp from '../../icons/ThumbsUp';
import style from '../../styles/displayDrinkPage.module.scss';
import { Drink } from '../../types/UserTypes';
import { checkIfAlreadyLiked } from '../../utils/drinksUtil';
import { assertIsNode, dealWithStupidFuckingJson } from '../../utils/utils';
import CommentForm from '../comments/CommentForm';
import { UserContext } from '../context/UserContext';

type DisplayDrinkPageProps = {
  toggleModal: (index: Drink | null) => void;
  drink: Drink;
};

function DisplayDrinkPage(props: DisplayDrinkPageProps) {
  const { toggleModal, drink } = props;
  const userContext = useContext(UserContext);

  const likeDrink = async () => {
    if (userContext?.user === null || userContext?.user === undefined) return;
    // Client side check if user already liked drink
    const userLikes = userContext?.user?.likes;
    if (userLikes && userLikes.includes(drink.id)) {
      console.log('user already liked this');
      // MAYBE ADD REMOVE LIKE
      return;
    }

    //Create new like array info
    const newLikesArray = JSON.stringify([...userContext.user.likes, drink.id]);

    const req = await fetch(`http://localhost:3000/like/${userContext?.user?.userID}/${newLikesArray}`, {
      method: 'post',
    });

    const res = await req.json();
    userContext.setUser({ ...userContext.user, likes: JSON.parse(res.newLikesArray) });
  };

  const userHasLiked = (): boolean => {
    if (userContext?.user === null || userContext?.user === undefined) return false;

    return userContext.user.likes.includes(drink.id) ? true : false;
  };

  return (
    <div className={style.pageWrapper}>
      <div onClick={() => toggleModal(null)} className={style.backBtn}>
        <CloseButton className={style.backBtn} />
      </div>

      <div className={style.wrapper}>
        <div className={style.imgWrapper}>
          <img draggable={false} alt={`Picture of ${drink.name}`} src={drink.imageURL}></img>
        </div>

        <div className={style.contentWrapper}>
          <div className={style.drinkInfoWrapper}>
            <div className={style.title}>{drink.name}</div>
            <div className={style.subTitle}>Instructions</div>
            <div className={style.description}>{drink.instructions}</div>
            <div className={style.subTitle}>Ingredients</div>
            <div className={style.ingredientsWrapper}>
              {dealWithStupidFuckingJson(drink)}
              <div onClick={likeDrink} className={style.likeIcon}>
                {userHasLiked() ? <FilledHeartIcon /> : <HollowHeartIcon />}
              </div>
            </div>
          </div>
          <CommentForm />
        </div>
      </div>
    </div>
  );
}

export default DisplayDrinkPage;
