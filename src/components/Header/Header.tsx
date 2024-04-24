import { Link } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.header__logo}>
        BLOG
      </Link>
      <nav>
        <Link to="/posts/new">글쓰기</Link>
        <Link to="/posts" className={styles.nav__link}>
          게시글
        </Link>
        <Link to="/login" className={styles.nav__link}>
          Login
        </Link>
      </nav>
    </header>
  );
}
