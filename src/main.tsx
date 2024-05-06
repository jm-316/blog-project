import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import { ThemeContextProvider } from "./context/ThemeContext.tsx";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import Home from "./pages/home/index.tsx";
import PostDetailPage from "./pages/posts/PostDetailPage.tsx";
import PostEditPage from "./pages/posts/PostEditPage.tsx";
import PostNewPage from "./pages/posts/PostNewPage.tsx";
import LoginPage from "./pages/login/index.tsx";
import SignupPage from "./pages/signup/index.tsx";
import NotFoundPage from "./pages/NotFound/index.tsx";
import ProfilePage from "./pages/profile/index.tsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.tsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "posts/:id",
        element: <PostDetailPage />,
      },
      {
        path: "posts/new",
        element: (
          <ProtectedRoute>
            <PostNewPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "posts/edit/:id",
        element: (
          <ProtectedRoute>
            <PostEditPage />
          </ProtectedRoute>
        ),
      },
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignupPage /> },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <ThemeContextProvider>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </ThemeContextProvider>
);
