import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useUser } from "../../hooks/useUser";
import styles from "./Header.module.css";

export default function Header() {
  const { user } = useContext(AuthContext);
  const { logoutUser: logout } = useUser();

  const handleSignOut = async () => {
    try {
      logout.mutate();
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
