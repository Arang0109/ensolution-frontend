import type { ComponentSize } from "@shared/model";

const SIZE_CLASSES: Record<ComponentSize, string> = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
  xxl: "max-w-6xl",
  full: "max-w-6xl",
};

interface ModalProps {
  children: React.ReactNode;
  size?: ComponentSize;
  onClose?: () => void;
}

export const Modal = ({ children, size = "md", onClose }: ModalProps) => (
  <div
    className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
    onClick={onClose}
  >
    <div
      className={`
        bg-white rounded-lg p-6 w-full max-h-[90vh] overflow-y-auto mx-4
        ${SIZE_CLASSES[size]}
        `}
      onClick={(e) => e.stopPropagation()} // 내부 클릭은 전파 막기
    >
      {children}
    </div>
  </div>
);