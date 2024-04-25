import { Link } from "react-router-dom";

export default function LoginForm() {
  return (
    <form>
      <h1>로그인</h1>
      <div>
        <label htmlFor="email">이메일</label>
        <input type="email" name="email" id="email" required />
      </div>
      <div>
        <label htmlFor="password">비밀번호</label>
        <input type="password" name="password" id="password" required />
      </div>
      <div>
        계정이 없으신가요?
        <Link to="/signup">회원가입하기</Link>
      </div>
      <button>로그인</button>
    </form>
  );
}
