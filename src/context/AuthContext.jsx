import { createContext, useContext, useState, useEffect } from "react";
import { authApi } from "../api/client";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("durga_admin_token"));

  useEffect(() => {
    const checkAuth = async () => {
      const savedToken = localStorage.getItem("durga_admin_token");
      if (!savedToken) {
        setLoading(false);
        return;
      }
      try {
        const res = await authApi.verifyMe();
        if (res.success && res.user) {
          setUser(res.user);
        } else {
          logout();
        }
      } catch (err) {
        console.warn("Auth check failed:", err);
        logout();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (username, password) => {
    const res = await authApi.login(username, password);
    if (res.success && res.token) {
      localStorage.setItem("durga_admin_token", res.token);
      setToken(res.token);
      setUser(res.user);
      return res;
    }
    throw new Error(res.message || "Login failed");
  };

  const logout = () => {
    localStorage.removeItem("durga_admin_token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
