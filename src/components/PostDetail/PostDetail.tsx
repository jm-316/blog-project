import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router";
import { deletePost, getPost } from "../../firebaseApp";
import { useEffect, useState } from "react";
import { PostProps } from "../../typings/post.types";
import styles from "./PostDetail.module.css";

export default function PostDetail() {
  const [post, setPost] = useState<PostProps | null>(null);

  const params = useParams();
  const navigate = useNavigate();

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("해당 게시글을 삭제 하시겠습니까?");

    if (confirm && id) {
      deletePost(id);
      navigate("/");
    }
  };

  useEffect(() => {
    if (params?.id) getPost(params?.id, setPost);
  }, [params?.id]);

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
          <div
            className={styles.post__delete}
            onClick={() => handleDelete(post?.id as string)}>
            삭제
          </div>
          <div className={styles.post__edit}>
            <Link to={`/posts/edit/${post?.id}`}>수정</Link>
          </div>
        </div>
      </div>
      <div className={`${styles.post__text} ${styles.post__text__preWrap}`}>
        {post?.content}
      </div>
    </div>
  );
}
