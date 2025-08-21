
import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuth, loadingAuth } = useAuth();

  console.log("ProtectedRoute isAuthenticated:", isAuth);
  console.log("children", children);



  if (loadingAuth) {
    // Show a loading spinner or placeholder while checking auth status
    return <div>Loading...</div>;
  }

  // Otherwise → allow access
   return isAuth ? children : <Navigate to="/login" replace />;
}
