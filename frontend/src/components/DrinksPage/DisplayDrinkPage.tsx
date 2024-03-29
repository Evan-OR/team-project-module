import { useContext, useEffect, useState } from 'react';
import CloseButton from '../../icons/CloseButton';
import FilledHeartIcon from '../../icons/FilledHeartIcon';
import HollowHeartIcon from '../../icons/HollowHeartIcon';
import style from '../../styles/drinkStyles/displayDrinkPage.module.scss';
import { DrinkComment } from '../../types/types';
import { Drink } from '../../types/UserTypes';
import { getCommentsRequest, updateLikesRequest } from '../../utils/apiUtil';
import { checkIfUserCommented, dealWithStupidFuckingJson, getAverageFromReviews } from '../../utils/utils';
import Comment from '../comments/Comment';
import CommentForm from '../comments/CommentForm';
import { UserContext } from '../context/UserContext';
import LoginPrompt from '../LoginPrompt';
import FilledStar from '../../icons/FilledStar';

type DisplayDrinkPageProps = {
  toggleModal: (index: Drink | null) => void;
  drink: Drink;
};

function DisplayDrinkPage(props: DisplayDrinkPageProps) {
  const { toggleModal, drink } = props;
  const userContext = useContext(UserContext);
  const [comments, setComments] = useState<DrinkComment[]>([]);
  const [userCanComment, setUserCanComment] = useState(true);

  const likeDrink = async () => {
    if (userContext?.user === null || userContext?.user === undefined) return;

    const user = userContext.user;
    const addToLikes = !user.likes.includes(drink.id);

    const [res, newArrayjson] = await updateLikesRequest(user.likes, drink.id, user.userID, addToLikes);

    if (res.status === 200) {
      userContext.setUser({ ...user, likes: JSON.parse(newArrayjson) });
    } else {
      alert('error updating likes!');
    }
  };

  const userHasLiked = (): boolean => {
    if (userContext?.user === null || userContext?.user === undefined) return false;

    return userContext.user.likes.includes(drink.id) ? true : false;
  };

  const addCommentLocally = (comment: DrinkComment) => {
    setUserCanComment(false);
    setComments([comment, ...comments]);
  };

  const getCommentsFromDataBase = async () => {
    const comments = await getCommentsRequest(drink.id);
    setComments(comments);

    if (userContext !== null && userContext.user !== null) {
      setUserCanComment(!checkIfUserCommented(comments, userContext.user.userID));
    }
  };

  const renderCommentForm = () => {
    if (userContext?.user === null || userContext?.user === undefined) {
      return <LoginPrompt text="Login to post comments" />;
    } else if (!userCanComment) {
      return <div>Thanks for your input!</div>;
    } else {
      return <CommentForm addCommentLocally={addCommentLocally} drinkId={drink.id} />;
    }
  };

  const renderStars = (r: number) => {
    let divs = [];
    for (let i = 0; i < 5; i++) {
      if (i < r) {
        divs.push(
          <div key={i}>
            <FilledStar className={`${style.star} ${style.active}`} />
          </div>
        );
      } else {
        divs.push(
          <div key={i}>
            <FilledStar className={style.star} />
          </div>
        );
      }
    }

    return divs;
  };

  useEffect(() => {
    getCommentsFromDataBase();
  }, []);

  return (
    <div className={style.pageWrapper}>
      <div onClick={() => toggleModal(null)} className={style.backBtn}>
        <CloseButton className={style.backBtn} />
      </div>

      <div className={style.wrapper}>
        <div className={style.imgWrapper}>
          <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '11px' }}>
            <div className={style.imgGradientOverLay}></div>
            <img draggable={false} alt={`Picture of ${drink.name}`} src={drink.imageURL}></img>
          </div>
        </div>

        <div className={style.contentWrapper}>
          <div className={style.drinkInfoWrapper}>
            <div className={style.title}>{drink.name}</div>
            <div className={style.drinkRatingWrapper}>{renderStars(getAverageFromReviews(comments))}</div>
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

          {renderCommentForm()}

          <div className={style.commentWrapper}>
            {comments.map((c) => (
              <Comment key={c.id} comment={c} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DisplayDrinkPage;
