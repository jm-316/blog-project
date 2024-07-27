import styles from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={styles.loader__container}>
      <div className={styles.loader}></div>
      <div className={styles.loader}></div>
      <div className={styles.loader}></div>
    </div>
  );
}
