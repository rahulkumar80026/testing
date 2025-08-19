
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = sessionStorage.getItem("token");

  if (!token) {
    // If no token → redirect to login page
    return <Navigate to="/" replace />;
  }

  // Otherwise → allow access
  return children;
}
