import classes from './comment-list.module.css';

interface IProps {
  comments: Record<string, any>[]
}

function CommentList({ comments }: IProps) {
  return (
    <ul className={classes.comments}>
      {!!comments?.length && comments.map((comment) => (
        <li key={comment._id}>
          <p>{comment.comment}</p>
          <div>
            By <address>{comment.name}</address>
          </div>
        </li>
      ))}
      <li>
        <p>My comment is amazing!</p>
        <div>
          By <address>Maximilian</address>
        </div>
      </li>
      <li>
        <p>My comment is amazing!</p>
        <div>
          By <address>Maximilian</address>
        </div>
      </li>
    </ul>
  );
}

export default CommentList;