import { AuthProvider } from "../auth";
import { ToastProvider } from "../toast";

export const AppProvider = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>
    <ToastProvider>
      {children}
    </ToastProvider>
  </AuthProvider>
);