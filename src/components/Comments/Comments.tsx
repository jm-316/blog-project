import styles from "./Comments.module.css";

export default function Comments() {
  return (
    <div className={styles.comments}>
      <form>
        <div className={styles.form__block}>
          <label>댓글입력</label>
          <textarea />
        </div>
        <button className={styles.comment__btn}>입력</button>
      </form>
    </div>
  );
}
