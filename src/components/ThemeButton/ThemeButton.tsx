import { BsSun, BsMoonFill } from "react-icons/bs";
import { useContext } from "react";
import ThemeContext from "../../context/ThemeContext";
import styles from "./ThemeButton.module.css";

export default function ThemeButton() {
  const context = useContext(ThemeContext);

  return (
    <button onClick={context.toggleMode} className={styles.theme__btn}>
      {context.theme === "light" ? <BsSun /> : <BsMoonFill />}
    </button>
  );
}
