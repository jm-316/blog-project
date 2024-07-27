import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ThemeContextProvider } from "./context/ThemeContext.tsx";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const queryClient = new QueryClient();

root.render(
  <ThemeContextProvider>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <Router>
          <App />
        </Router>
      </AuthContextProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </ThemeContextProvider>
);
