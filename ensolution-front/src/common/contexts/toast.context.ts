import { createContext } from 'react';
import type { ToastType } from '@/common/ui/Toast';

export interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);