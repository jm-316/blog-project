import { CATEGORIES } from "../Category/Category.types";
import styles from "./PostFrom.module.css";

export default function PostForm() {
  return (
    <div className={styles.post__wrapper}>
      <h1 className={styles.post__title}>게시글 등록</h1>
      <form className={styles.post__form}>
        <div className={styles.post__block}>
          <label htmlFor="title">제목</label>
          <input type="text" name="title" id="title" required />
        </div>
        <div className={styles.post__block}>
          <label htmlFor="category">카테고리</label>
          <select>
            {CATEGORIES.map((category) => (
              <option value={category} key={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.post__block}>
          <label htmlFor="content">내용</label>
          <textarea name="content" id="content" required />
        </div>
        <button className={styles.post__btn}>제출</button>
      </form>
    </div>
  );
}
