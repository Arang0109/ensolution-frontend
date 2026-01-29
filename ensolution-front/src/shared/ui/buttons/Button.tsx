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
      "bg-primary-600 text-white hover:bg-primary-700",

    add:
      "bg-[#889063] text-white hover:bg-[#666E43]",

    edit:
      "bg-blue-600/60 text-white hover:bg-blue-700",

    delete:
      "bg-red-600/60 text-white hover:bg-red-700",

    cancel:
      "bg-neutral-200/60 text-neutral-700 hover:bg-neutral-300",

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
        transition-colors shadow-md
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
