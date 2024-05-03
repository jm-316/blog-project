import { useNavigate } from "react-router";
import React, { useContext, useState } from "react";
import { createComment, deleteComment, getPost } from "../../firebaseApp";
import AuthContext from "../../context/AuthContext";
import CommentList from "../../CommentList/CommentList";
import Modal from "../../common/Modal/Modal";
import { CommentsInterface, CommentsProps } from "../../typings/post.types";
import styles from "./Comments.module.css";

export default function Comments({ post, setPost }: CommentsProps) {
  const [comment, setComment] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === "comment") {
      setComment(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!user) setIsOpen(true);

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

          setIsOpen(true);
          setComment("");
        }
      }
    } catch (error) {
      setIsOpen(true);
      setErrorMessage(`댓글을 등록할 수 없습니다.
      다시 시도해주세요.`);
    }
  };

  const handleDeleteComment = async (data: CommentsInterface) => {
    const confirm = window.confirm("해당 댓글을 삭제하시겠습니까?");

    if (confirm && post && post.id) {
      await deleteComment(post.id, data);
      await getPost(post.id, setPost);
    }
  };

  const handleModalConfirm = async () => {
    if (!user) {
      navigate("/login");
    }
    if (post && post.id && (!errorMessage || errorMessage?.length < 0)) {
      await getPost(post.id, setPost);
    }
    setIsOpen(false);
    setErrorMessage("");
  };
  return (
    <div className={styles.comments}>
      {isOpen && (
        <Modal onConfirm={handleModalConfirm}>
          {user
            ? errorMessage
              ? errorMessage
              : "댓글을 생성했습니다."
            : "로그인 페이지로 이동합니다."}
        </Modal>
      )}

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
