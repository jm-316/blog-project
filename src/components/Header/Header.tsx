import { Link } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header>
      <Link to="/">BLOG</Link>
      <nav>
        <Link to="/posts/new">글쓰기</Link>
        <Link to="/posts">게시글</Link>
        <Link to="/profile">프로필</Link>
        <button>Login</button>
      </nav>
    </header>
  );
}
