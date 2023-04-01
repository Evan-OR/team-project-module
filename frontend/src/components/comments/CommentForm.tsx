import React, { FormEvent, useContext, useEffect, useRef, useState } from 'react';
import style from '../../styles/commentStyles.module.scss';
import { postCommentRequest } from '../../utils/apiUtil';
import { UserContext } from '../context/UserContext';

type CommentFormProps = {
  drinkId: number;
};

function CommentForm(props: CommentFormProps) {
  const { drinkId } = props;

  const [commentText, setCommentText] = useState('');
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

    const m = await postCommentRequest(drinkId, userContext.user.userID, commentText);
    console.log(m);
    setCommentText('');
  };

  useEffect(() => {
    if (textAreaRef.current === null) return;
    textAreaRef.current.style.height = `5px`;
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  }, [commentText]);

  return (
    <form onSubmit={submitHandler} className={style.form}>
      <div className={style.commentBoxWrapper}>
        <div className={style.commentUtil}>
          <div className={style.charCount}>
            {commentText.length}/{wordLimit}
          </div>
          <button className={style.postBtn} type="submit">
            Post
          </button>
        </div>
        <textarea
          id="textarea"
          ref={textAreaRef}
          value={commentText}
          onChange={textAreaHandler}
          className={style.text}
          placeholder="Leave a comment..."
        ></textarea>
      </div>
    </form>
  );
}

export default CommentForm;
