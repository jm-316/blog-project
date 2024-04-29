import { useNavigate, useParams } from "react-router";
import { createPost, getPost, updatePost } from "../../firebaseApp";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { CATEGORIES, CategoryType, PostProps } from "../../typings/post.types";
import styles from "./PostFrom.module.css";

export default function PostForm() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [category, setCategory] = useState<CategoryType>("자유게시판");
  const [post, setPost] = useState<PostProps | null>(null);

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  const params = useParams();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (post && post?.id) {
        updatePost(post?.id, title, content, category);
      } else {
        createPost(title, content, category, user);
      }

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    switch (name) {
      case "title":
        return setTitle(value);
      case "content":
        return setContent(value);
      case "category":
        return setCategory(value as CategoryType);
    }
  };

  useEffect(() => {
    if (params?.id) getPost(params?.id, setPost);
  }, [params?.id]);

  useEffect(() => {
    if (post) {
      setTitle(post?.title);
      setContent(post?.content);
      setCategory(post?.category as CategoryType);
    }
  }, [post]);

  return (
    <div className={styles.post__wrapper}>
      <h1 className={styles.post__title}>게시글 등록</h1>
      <form onSubmit={handleSubmit} className={styles.post__form}>
        <div className={styles.post__block}>
          <label htmlFor="title">제목</label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.post__block}>
          <label htmlFor="category">카테고리</label>
          <select
            name="category"
            id="category"
            onChange={handleChange}
            defaultValue={category}>
            {CATEGORIES.map((category) => (
              <option value={category} key={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.post__block}>
          <label htmlFor="content">내용</label>
          <textarea
            name="content"
            id="content"
            value={content}
            onChange={handleChange}
            required
          />
        </div>
        <button className={styles.post__btn}>제출</button>
      </form>
    </div>
  );
}
