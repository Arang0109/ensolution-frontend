// 인증 상태를 꺼내 쓰는 접근 API
import { useContext } from "react";
import { AuthContext } from "./auth-context";

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};