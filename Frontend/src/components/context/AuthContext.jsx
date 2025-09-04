import { createContext, useContext, useMemo, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize from sessionStorage once
  useEffect(() => {
    try {
      const storedToken = sessionStorage.getItem("token");
      if (storedToken && typeof storedToken === "string") {
        setToken(storedToken);
      }
    } catch {
      // ignore read errors
    } finally {
      setLoading(false);
    }
  }, []);

  // Derived state
  const isAuth = !!token;

  const login = (newToken) => {
    // Validate token if needed
    sessionStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    setToken(null);
  };

  const value = useMemo(
    () => ({ isAuth, token, loading, login, logout }),
    [isAuth, token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
