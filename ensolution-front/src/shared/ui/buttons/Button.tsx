type ButtonVariant =
  | "primary"   // 기본 저장, 확인
  | "add"       // 추가
  | "edit"      // 수정
  | "delete"    // 삭제
  | "cancel"    // 취소
  | "ghost";    // 아이콘 전용, 테이블 액션용

type ButtonSize = "sm" | "md" | "lg";

type ButtonWidth = "auto" | "full";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  width?: ButtonWidth;
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;
}

export const Button = ({
  label,
  onClick,
  icon,
  variant = "primary",
  size = "md",
  width = "auto",
  type = "button",
  disabled = false,
  isLoading = false,
}: ButtonProps) => {
  const VARIANT_STYLES: Record<ButtonVariant, string> = {
    primary:
      "bg-[#1F2937]/90 text-white hover:bg-[#111827]",

    add:
      "bg-[#3B82F6]/90 text-white hover:bg-[#2770e7]",

    edit:
      "bg-[#16a34a]/80 text-white hover:bg-[#1b8241]/90",

    delete:
      "bg-[#FF4646]/80 text-white hover:bg-[#f52d2d]",

    cancel:
      "bg-neutral-300/80 text-neutral-700 hover:bg-neutral-400/50",

    ghost:
      "bg-transparent text-neutral-600 hover:bg-neutral-100 shadow-none text-primary-600 hover:text-primary-700 font-medium",
  };

  const SIZE_STYLES: Record<ButtonSize, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-lg",
  };

  const WIDTH_STYLES: Record<ButtonWidth, string> = {
    auto: "w-auto",
    full: "w-full justify-center",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center gap-2 rounded-md font-medium text-lg
        transition-colors
        ${VARIANT_STYLES[variant]}
        ${SIZE_STYLES[size]}
        ${WIDTH_STYLES[width]}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      {isLoading ? (
        <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
      ) : (
        <>
          {icon && <span className="flex items-center">{icon}</span>}
          {label}
        </>
      )}
    </button>
  );
};
