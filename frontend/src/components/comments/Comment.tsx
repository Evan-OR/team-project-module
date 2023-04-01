import style from '../../styles/commentStyles.module.scss';
import { DrinkComment } from '../../types/types';

type CommentProps = {
  comment: DrinkComment;
};

function Comment(props: CommentProps) {
  const { comment } = props;

  const convertTime = (datePosted: string) => {
    const date = new Date(datePosted);
    const irishTime = date.toLocaleString('en-IE', { timeZone: 'Europe/Dublin' });

    return irishTime.substring(0, irishTime.length - 3);
  };

  return (
    <div className={style.commentWrapper}>
      <div className={style.username}>
        {comment.username} <span className={style.postDate}>{convertTime(comment.datePosted)}</span>
      </div>
      <div className={style.comment}>{comment.text}</div>
    </div>
  );
}

export default Comment;
