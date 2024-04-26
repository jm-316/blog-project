import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";
import { app } from "../../firebaseApp";
import { LoginFormProps } from "./LoginForm.types";
import styles from "./LoginForm.module.css";

export default function LoginForm({ isSignup }: LoginFormProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const passwordRegEx = /^[A-Za-z0-9]{8,20}$/;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);

      const isValidEmail = value?.match(emailRegex);

      setError(isValidEmail ? "" : "올바른 이메일이 아닙니다.");
    }

    if (name === "password") {
      setPassword(value);

      const isValidPassword = value?.match(passwordRegEx);

      setError(
        isValidPassword
          ? ""
          : "비밀번호는 영문 대소문자, 숫자를 혼합하여 8~20자로 입력해주세요.."
      );

      if (passwordConfirm?.length > 0 && value !== passwordConfirm) {
        setError("비밀번호와 값이 다릅니다. 다시 확인해주세요");
      }
    }

    if (name === "password_confirm") {
      setPasswordConfirm(value);

      const isValidPasswordConfirm = value !== password;

      setError(
        isValidPasswordConfirm
          ? "비밀번호와 값이 다릅니다. 다시 확인해주세요"
          : ""
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const auth = getAuth(app);

      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);

        navigate("/");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h1 className={styles.form__title}>{isSignup ? "회원가입" : "로그인"}</h1>
      <div>
        <label htmlFor="email">이메일</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handleChange}
          required
        />
      </div>
      {isSignup && (
        <div>
          <label htmlFor="password">비밀번호 확인</label>
          <input
            type="password"
            name="password_confirm"
            id="password_confirm"
            value={passwordConfirm}
            onChange={handleChange}
            required
          />
        </div>
      )}
      {error && error.length > 0 && (
        <div className={styles.form__block}>
          <div className={styles.form__error}>{error}</div>
        </div>
      )}
      {isSignup ? (
        <div className={styles.form__block}>
          계정이 이미 있으신가요?
          <Link to="/login" className={styles.form__link}>
            로그인하기
          </Link>
        </div>
      ) : (
        <div className={styles.form__block}>
          계정이 없으신가요?
          <Link to="/signup" className={styles.form__link}>
            회원가입하기
          </Link>
        </div>
      )}
      <button className={styles.form__btn}>
        {isSignup ? "회원가입" : "로그인"}
      </button>
    </form>
  );
}
