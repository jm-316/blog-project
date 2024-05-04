import { BsSun, BsMoonFill } from "react-icons/bs";
import { useContext } from "react";
import ThemeContext from "../../context/ThemeContext";

export default function ThemeButton() {
  const context = useContext(ThemeContext);

  return (
    <button onClick={context.toggleMode}>
      {context.theme === "light" ? <BsSun /> : <BsMoonFill />}
    </button>
  );
}
