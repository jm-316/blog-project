import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Modal from "../../common/Modal/Modal";
import { useUser } from "../../hooks/useUser";
import { LoginFormProps } from "../../typings/auth.types";
import styles from "./LoginForm.module.css";

export default function LoginForm({ isSignup }: LoginFormProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const { newUser: createUser, loginUser: login } = useUser();

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
      // throw new Error("Simulated Firebase error");
      if (isSignup) {
        createUser.mutate({ email, password });
        setIsOpen(true);
      } else {
        login.mutate({ email, password });
        setIsOpen(true);
      }
    } catch (error) {
      setIsOpen(true);
      setErrorMessage(`로그인에 실패했습니다.
      다시 시도해주세요.`);
      navigate("/login");
    }
  };

  const handleModalConfirm = () => {
    if (!errorMessage || errorMessage?.length < 0) {
      navigate("/");
    }
    setIsOpen(false);
    setErrorMessage("");
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.form__title}>
          {isSignup ? "회원가입" : "로그인"}
        </h1>
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
      {isOpen && (
        <Modal onConfirm={handleModalConfirm}>
          {errorMessage ? errorMessage : "로그인에 성공했습니다."}
        </Modal>
      )}
    </div>
  );
}
