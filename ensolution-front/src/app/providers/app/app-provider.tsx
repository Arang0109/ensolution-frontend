import React from "react";
import { ThemeProvider } from "@material-tailwind/react";
import { AuthProvider } from "../auth";
import { ToastProvider } from "../toast";

export const AppProvider = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>
    <AuthProvider>
      <ToastProvider>
        {children}
      </ToastProvider>
    </AuthProvider>
  </ThemeProvider>
);