import { Route, Routes } from "react-router-dom";
import Home from "../../pages/home";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import ProfilePage from "../../pages/profile";
import PostDetailPage from "../../pages/posts/PostDetailPage";
import PostNewPage from "../../pages/posts/PostNewPage";
import PostEditPage from "../../pages/posts/PostEditPage";
import LoginPage from "../../pages/login";
import SignupPage from "../../pages/signup";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route path="/posts/:id" element={<PostDetailPage />} />
      <Route
        path="/posts/edit/:id"
        element={
          <ProtectedRoute>
            <PostEditPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/posts/new"
        element={
          <ProtectedRoute>
            <PostNewPage />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
}
