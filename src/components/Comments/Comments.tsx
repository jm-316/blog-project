import React, { useContext, useState } from "react";
import { createComment, deleteComment, getPost } from "../../firebaseApp";
import AuthContext from "../../context/AuthContext";
import CommentList from "../../CommentList/CommentList";
import { CommentsInterface, CommentsProps } from "../../typings/post.types";
import styles from "./Comments.module.css";

export default function Comments({ post, setPost }: CommentsProps) {
  const [comment, setComment] = useState<string>("");

  const { user } = useContext(AuthContext);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === "comment") {
      setComment(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (post && post?.id) {
        if (user?.uid) {
          const commentObj = {
            content: comment,
            uid: user.uid,
            email: user.email,
            createdAt: new Date()?.toLocaleDateString("ko", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
          };

          await createComment(post.id, commentObj);
          await getPost(post.id, setPost);

          setComment("");
        } else {
          alert("로그인을 해주세요.");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteComment = async (data: CommentsInterface) => {
    const confirm = window.confirm("해당 댓글을 삭제하시겠습니까?");

    if (confirm && post.id) {
      deleteComment(post.id, data);

      await getPost(post.id, setPost);
    }
  };
  return (
    <div className={styles.comments}>
      <form onSubmit={handleSubmit}>
        <div className={styles.form__block}>
          <label htmlFor="comment">댓글입력</label>
          <textarea
            name="comment"
            id="comment"
            value={comment}
            onChange={handleChange}
            required
          />
        </div>
        <button className={styles.comment__btn}>입력</button>
      </form>
      <div>
        <CommentList
          post={post}
          user={user}
          handleDeleteComment={handleDeleteComment}
        />
      </div>
    </div>
  );
}
