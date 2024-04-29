import { useContext } from "react";
import styles from "./Profile.module.css";
import AuthContext from "../../context/AuthContext";
import { logout } from "../../firebaseApp";

export default function Profile() {
  const { user } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.profile__box}>
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
