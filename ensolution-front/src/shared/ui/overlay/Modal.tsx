interface ModalProps {
  children: React.ReactNode;
}

export const Modal = ({ children }: ModalProps) => (
  <div
    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
  >
    <div
      className="bg-white rounded-lg p-6 max-w-lg w-full mx-4"
      onClick={(e) => e.stopPropagation()} // 내부 클릭은 전파 막기
    >
      {children}
    </div>
  </div>
);