import styles from "./PostDetail.module.css";

export default function PostDetail() {
  return (
    <div className={styles.post__detail}>
      <div className={styles.post__box}>
        <div className={styles.post__title}>title</div>
        <div className={styles.post__profile__box}>
          <div className={styles.post__profile} />
          <div className={styles.post__author__email}>email</div>
          <div className={styles.post__date}>2024-04-29</div>
        </div>
      </div>
      <div className={styles.post__utils__box}>
        <div className={styles.post__category}>category</div>
        <div className={styles.post__edit__box}>
          <div className={styles.post__delete}>delete</div>
          <div className={styles.post__edit}>edit</div>
        </div>
      </div>
      <div className={`${styles.post__text} ${styles.post__text__preWrap}`}>
        content
      </div>
    </div>
  );
}
