import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

export default function ProtectedOutlet() {
  const { isAuth, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return isAuth ? <Outlet /> : <Navigate to="/" replace />;
}
