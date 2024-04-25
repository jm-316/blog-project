import { Link } from "react-router-dom";
import styles from "./LoginForm.module.css";

export default function LoginForm() {
  return (
    <form className={styles.form}>
      <h1 className={styles.form__title}>로그인</h1>
      <div>
        <label htmlFor="email">이메일</label>
        <input type="email" name="email" id="email" required />
      </div>
      <div>
        <label htmlFor="password">비밀번호</label>
        <input type="password" name="password" id="password" required />
      </div>
      <div className={styles.form__block}>
        계정이 없으신가요?
        <Link to="/signup" className={styles.form__link}>
          회원가입하기
        </Link>
      </div>
      <button className={styles.form__btn}>로그인</button>
    </form>
  );
}
