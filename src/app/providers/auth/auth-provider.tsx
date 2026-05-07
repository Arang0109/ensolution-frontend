import { useState } from "react";
import { AuthContext, TOKEN_KEY } from "./auth-context";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(() => {
    return localStorage.getItem("accessToken");
  });
  
  const login = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
    setAccessToken(token);
  }

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setAccessToken(null);
  };

  const isAuthenticated = !!accessToken; // accessToken이 null이면 False

  return (
    <AuthContext.Provider value={{ isAuthenticated, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};