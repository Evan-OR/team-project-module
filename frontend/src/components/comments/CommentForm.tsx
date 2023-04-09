import React, { useContext, useEffect, useRef, useState } from 'react';
import style from '../../styles/commentStyles.module.scss';
import { DrinkComment } from '../../types/types';
import { postCommentRequest } from '../../utils/apiUtil';
import { convertToIrishTime } from '../../utils/utils';
import { UserContext } from '../context/UserContext';
import FilledStar from '../../icons/FilledStar';

type CommentFormProps = {
  drinkId: number;
  addCommentLocally: (comment: DrinkComment) => void;
};

function CommentForm(props: CommentFormProps) {
  const { drinkId, addCommentLocally } = props;

  const [commentText, setCommentText] = useState('');
  const [rating, setRating] = useState(1);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const userContext = useContext(UserContext);

  const wordLimit = 100;

  const textAreaHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.currentTarget.value.length > wordLimit) return;
    setCommentText(e.currentTarget.value);
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userContext || !userContext.user) return;
    if (commentText.length === 0) return;

    const response = await postCommentRequest(drinkId, userContext.user.userID, commentText, rating);
    const [res, json] = response;

    const time = new Date().getTime() - 1000 * 3600;
    const irishTime = convertToIrishTime(new Date(time).toISOString());

    if (res.status === 200) {
      const comment = {
        id: 69,
        username: userContext.user.username,
        userId: userContext.user.userID,
        text: commentText,
        rating: rating,
        datePosted: convertToIrishTime(new Date(irishTime).toISOString()),
      };
      addCommentLocally(comment);
      setCommentText('');
      console.log(json);
    } else {
      console.log([json, 'Comment POST Failed']);
    }
  };

  const ratingHandler = (r: number) => {
    setRating(r);
  };

  const renderStars = (r: number) => {
    let divs = [];
    for (let i = 0; i < 5; i++) {
      if (i < r) {
        divs.push(
          <div key={i} onClick={() => ratingHandler(i + 1)}>
            <FilledStar className={`${style.star} ${style.active}`} />
          </div>
        );
      } else {
        divs.push(
          <div key={i} onClick={() => ratingHandler(i + 1)}>
            <FilledStar className={style.star} />
          </div>
        );
      }
    }

    return divs;
  };

  useEffect(() => {
    if (textAreaRef.current === null) return;
    textAreaRef.current.style.height = `5px`;
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  }, [commentText]);

  return (
    <form onSubmit={submitHandler} className={style.form}>
      <div className={style.commentBoxWrapper}>
        <textarea
          id="textarea"
          ref={textAreaRef}
          value={commentText}
          onChange={textAreaHandler}
          className={style.text}
          placeholder="Leave a rating..."
        ></textarea>
        <div className={style.commentUtil}>
          <div className={style.ratingWrapper}>{renderStars(rating)}</div>

          <div className={style.postCountWrapper}>
            <div className={style.charCount}>
              {commentText.length}/{wordLimit}
            </div>
            <button className={style.postBtn} type="submit">
              Post
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default CommentForm;
