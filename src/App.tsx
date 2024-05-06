import { useContext } from "react";
import Header from "./components/Header/Header";
import ThemeContext from "./context/ThemeContext";
import ThemeButton from "./components/ThemeButton/ThemeButton";
import Router from "./components/Router/Router";

function App() {
  const context = useContext(ThemeContext);
  return (
    <div className={`${context.theme === "light" ? "white" : "dark"}`}>
      <Header />
      <Router />
      <ThemeButton />
    </div>
  );
}

export default App;
