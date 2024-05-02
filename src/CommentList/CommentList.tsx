import { CommentListProps } from "../typings/post.types";
import styles from "./CommentList.module.css";

export default function CommentList({
  post,
  user,
  handleDeleteComment,
}: CommentListProps) {
  return (
    <div>
      {post?.comments
        ?.slice(0)
        ?.reverse()
        .map((comment) => (
          <div key={comment.createdAt} className={styles.comment__box}>
            <div className={styles.comment__profileBox}>
              <div className={styles.comment__email}>{comment?.email}</div>
              <div className={styles.comment__date}>{comment?.createdAt}</div>
              {comment.uid === user?.uid && (
                <div
                  className={styles.comment__delete}
                  onClick={() => handleDeleteComment(comment)}>
                  삭제
                </div>
              )}
            </div>
            <div className={styles.comment__text}>{comment?.content}</div>
          </div>
        ))}
    </div>
  );
}
