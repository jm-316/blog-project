import { Link } from "react-router-dom";
import "./Home.module.css";

export default function Home() {
  return (
    <div>
      {[...Array(10)].map((post, index) => (
        <div>
          <Link to={`/posts/${index}`}>
            <div>
              <div>프로필</div>
              <div>test@test.com</div>
              <div>2024-04-24</div>
            </div>
            <div>게시글 {index}</div>
          </Link>
          <div>
            <div>삭제</div>
            <div>수정</div>
          </div>
        </div>
      ))}
    </div>
  );
}
