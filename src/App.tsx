import { Outlet } from "react-router";
import { useContext } from "react";
import Header from "./components/Header/Header";
import ThemeContext from "./context/ThemeContext";
import ThemeButton from "./components/ThemeButton/ThemeButton";

function App() {
  const context = useContext(ThemeContext);
  return (
    <div className={`${context.theme === "light" ? "white" : "dark"}`}>
      <Header />
      <Outlet />
      <ThemeButton />
    </div>
  );
}

export default App;
