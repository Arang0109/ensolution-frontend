import { createContext } from "react";

export interface AuthContextType {
  accessToken: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
export const TOKEN_KEY = "accessToken";