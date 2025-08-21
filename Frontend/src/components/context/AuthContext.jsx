import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true); // ✅ loading state

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    setLoading(false); // ✅ check complete
  }, []);

  // ✅ login function
  const login = (token) => {
    sessionStorage.setItem("token", token);
    setIsAuth(true);
  };

  // ✅ logout function
  const logout = () => {
    sessionStorage.removeItem("token");
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ isAuth, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
