type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "ghost";

type ButtonSize = "sm" | "md" | "lg" | "xl";

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
      "bg-[#3B82F6]/90 text-white hover:bg-[#2770e7]",

    secondary:
      "bg-neutral-300/80 text-neutral-700 hover:bg-neutral-400/50",

    danger:
      "bg-[#FF4646]/80 text-white hover:bg-[#f52d2d]",

    ghost:
      "bg-transparent text-neutral-600 hover:bg-neutral-100 shadow-none text-primary-600 hover:text-primary-700 font-medium",
  };

  const SIZE_STYLES: Record<ButtonSize, string> = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-xs",
    lg: "px-6 py-3 text-lg",
    xl: "px-7 py-3.5 text-xl",
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
        inline-flex items-center gap-2 rounded-md font-medium
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
