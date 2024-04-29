import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { AuthProps } from "../../typings/auth.types";

export default function ProtectedRoute({ children }: AuthProps) {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" replace />;

  return children;
}
