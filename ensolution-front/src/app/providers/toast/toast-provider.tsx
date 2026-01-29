import { useState, useCallback } from "react";
import { ToastContext } from "./toast-context";
import { ToastContainer } from "./toast-container";
import type { Toast, ToastType } from "./toast-context";

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback(
    (message: string, type: ToastType = 'info') => {
      const id = `${Date.now()}-${Math.random()}`;
      setToasts((prev) => [...prev, { id, message, type }]);
    },
    []
  );

  const closeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
      <ToastContext.Provider value={{ showToast }}>
        {children}
        <ToastContainer toasts={toasts} onClose={closeToast} />
      </ToastContext.Provider>
    );
};
