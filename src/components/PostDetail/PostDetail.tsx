import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import Comments from "../Comments/Comments";
import { usePost } from "../../hooks/usePost";
import styles from "./PostDetail.module.css";

export default function PostDetail() {
  const { user } = useContext(AuthContext);

  const params = useParams();
  const navigate = useNavigate();

  const {
    post,
    removePost: deletePost,
    isLoading,
  } = usePost(params.id as string);

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("해당 게시글을 삭제 하시겠습니까?");

    if (confirm && id) {
      deletePost.mutate(id);
      navigate("/");
    }
  };

  if (isLoading) <div>Loading</div>;

  return (
    <div className={styles.post__detail}>
      <div className={styles.post__box}>
        <div className={styles.post__title}>{post?.title}</div>
        <div className={styles.post__profile__box}>
          <div className={styles.post__profile} />
          <div className={styles.post__author__email}>{post?.email}</div>
          <div className={styles.post__date}>{post?.createdAt}</div>
        </div>
      </div>
      <div className={styles.post__utils__box}>
        <div className={styles.post__category}>{post?.category}</div>
        <div className={styles.post__edit__box}>
          {user && (
            <>
              <div
                className={styles.post__delete}
                onClick={() => handleDelete(post?.id as string)}>
                삭제
              </div>
              <div className={styles.post__edit}>
                <Link to={`/posts/edit/${post?.id}`}>수정</Link>
              </div>
            </>
          )}
        </div>
      </div>
      <div className={`${styles.post__text} ${styles.post__text__preWrap}`}>
        {post?.content}
      </div>
      <Comments />
    </div>
  );
}
