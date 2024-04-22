import { Outlet } from "react-router";
import Header from "./components/Header/Header";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
