import style from '../../styles/commentStyles.module.scss';
import { DrinkComment } from '../../types/types';
import { convertToIrishTime } from '../../utils/utils';

type CommentProps = {
  comment: DrinkComment;
};

function Comment(props: CommentProps) {
  const { comment } = props;

  const convertTime = (datePosted: string) => {
    const time = new Date(datePosted).getTime() + 1000 * 3600;
    const irishTime = convertToIrishTime(new Date(time).toISOString());
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
