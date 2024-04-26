import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../../firebaseApp";

export default function Header() {
  const { user } = useContext(AuthContext);

  const handleSignOut = async () => {
    try {
      const auth = getAuth(app);

      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

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
        {!user ? (
          <Link to="/login" className={styles.nav__link}>
            Login
          </Link>
        ) : (
          <Link to="/profile">마이페이지</Link>
        )}
        {user && (
          <button className={styles.logout__btn} onClick={handleSignOut}>
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}
