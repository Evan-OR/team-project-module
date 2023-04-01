import { useEffect, useRef, useState } from 'react';
import style from '../../styles/commentStyles.module.scss';

function CommentForm() {
  const [commentText, setCommentText] = useState('');
  const defaultTextAreaHeight = document.getElementById('textarea')?.style.height;
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const wordLimit = 100;

  const textAreaHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.currentTarget.value.length > wordLimit) return;
    setCommentText(e.currentTarget.value);
  };

  useEffect(() => {
    if (textAreaRef.current === null) return;
    textAreaRef.current.style.height = `5px`;
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  }, [commentText]);

  return (
    <form className={style.form}>
      <div className={style.commentWrapper}>
        <div className={style.commentUtil}>
          <div className={style.charCount}>
            {commentText.length}/{wordLimit}
          </div>
          <button className={style.postBtn} type="button">
            Post
          </button>
        </div>
        <textarea
          id="textarea"
          ref={textAreaRef}
          value={commentText}
          onChange={textAreaHandler}
          className={style.text}
          placeholder="Leave a comment?"
        ></textarea>
      </div>
    </form>
  );
}

export default CommentForm;
