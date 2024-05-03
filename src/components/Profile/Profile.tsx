import { useNavigate } from "react-router";
import { logout } from "../../firebaseApp";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import Modal from "../../common/Modal/Modal";
import styles from "./Profile.module.css";

export default function Profile() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setIsOpen(true);
    } catch (error) {
      setIsOpen(true);
      setErrorMessage(`로그아웃을 실패했습니다.
      다시 시도해주세요.`);
      navigate("/profile");
    }
  };

  console.log(errorMessage);

  const handleModalConfirm = async () => {
    if (!errorMessage || errorMessage?.length < 0) {
      await logout();
      navigate("/");
    }
    setIsOpen(false);
    setErrorMessage("");
  };

  return (
    <div className={styles.profile__box}>
      {isOpen && (
        <Modal onConfirm={handleModalConfirm}>
          {errorMessage ? errorMessage : "로그아웃 되었습니다."}
        </Modal>
      )}
      <div className={styles.flex__box}>
        <div className={styles.profile__image} />
        <div>
          <div className={styles.profile__email}>{user?.email}</div>
          <div className={styles.profile__name}>
            {user?.displayName || "사용자"}
          </div>
        </div>
      </div>
      <div className={styles.profile__logout} onClick={handleLogout}>
        로그아웃
      </div>
    </div>
  );
}
