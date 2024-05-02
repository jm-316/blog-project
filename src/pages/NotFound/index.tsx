import { useNavigate } from "react-router";
import styles from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className={styles.error__box}>
      <h1 className={styles.error__title}>404</h1>
      <p className={styles.error__content}>해당 페이지를 찾을 수 없습니다.</p>
      <button className={styles.error__btn} onClick={() => navigate("/")}>
        홈으로 돌아가기
      </button>
    </div>
  );
}
