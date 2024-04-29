import { Link } from "react-router-dom";
import { deletePost } from "../../firebaseApp";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import Category from "../Category/Category";
import UseGetPosts from "../../hooks/UseGetPosts";
import { CategoryType, PostListProps, TabType } from "../../typings/post.types";
import styles from "./PostList.module.css";

export default function PostList({
  hasNavigation = true,
  defaultTab = "all",
}: PostListProps) {
  const [activeTab, setActiveTab] = useState<TabType | CategoryType>(
    defaultTab
  );

  const { user } = useContext(AuthContext);
  const { posts, getPosts } = UseGetPosts(activeTab, user);

  const handleChangeActiveTab = (tab: TabType | CategoryType) => {
    setActiveTab(tab);
  };

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("해당 게시글을 삭제 하시겠습니까?");

    if (confirm && id) {
      deletePost(id);
      getPosts();
    }
  };

  return (
    <>
      {hasNavigation && (
        <Category
          activeTab={activeTab}
          handleChangeActiveTab={handleChangeActiveTab}
        />
      )}
      <div className={styles.post__list}>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div className={styles.post__box} key={post?.id}>
              <div className={styles.post__box__header}>
                <Link to={`/posts/${post?.id}`}>
                  <div className={styles.post__profile__box}>
                    <div className={styles.post__profile} />
                    <div className={styles.post__author__email}>
                      {post?.email}
                    </div>
                    <div className={styles.post__date}>{post?.createdAt}</div>
                  </div>
                </Link>
                {post?.email === user?.email && (
                  <div className={styles.post__utils__box}>
                    <div
                      className={styles.post__delete}
                      onClick={() => handleDelete(post.id as string)}>
                      삭제
                    </div>
                    <Link
                      to={`posts/edit/${post.id}`}
                      className={styles.post__edit}>
                      수정
                    </Link>
                  </div>
                )}
              </div>
              <Link to={`/posts/${post?.id}`}>
                <div className={styles.post__title}>{post?.title}</div>
                <div className={styles.post__text}>{post?.content}</div>
              </Link>
            </div>
          ))
        ) : (
          <div className={styles.post__noPost}>게시글이 없습니다. </div>
        )}
      </div>
    </>
  );
}
