import { createContext, useState } from "react";
import { ThemeProps } from "../typings/theme.types";

const ThemeContext = createContext({
  theme: "light",
  toggleMode: () => {},
});

export function ThemeContextProvider({ children }: ThemeProps) {
  const [theme, setTheme] = useState(
    window.localStorage.getItem("theme") || "light"
  );

  const toggleMode = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
    window.localStorage.setItem("theme", theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
