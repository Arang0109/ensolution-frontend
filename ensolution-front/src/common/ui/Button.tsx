type ButtonVariant =
  | "primary"
  | "secondary"
  | "submit"
  | "danger"
  | "ghost";

type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  type?: "button" | "submit" | "reset";
}

export const Button = ({
  label,
  onClick,
  icon,
  variant = "primary",
  size = "md",
  type = "button",
  disabled = false,
}: ButtonProps) => {
  const VARIANT_STYLES: Record<ButtonVariant, string> = {
    primary:
      "bg-gradient-to-r from-neutral-600 to-neutral-700 text-white hover:from-neutral-800 hover:to-neutral-900",

    submit:
      "bg-primary-600 text-white hover:bg-primary-700",

    danger:
      "bg-red-600 text-white hover:bg-red-700",

    secondary:
      "bg-neutral-100 text-neutral-800 hover:bg-neutral-200",

    ghost:
      "bg-transparent text-neutral-700 hover:bg-neutral-100",
  };

  const SIZE_STYLES: Record<ButtonSize, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
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
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      {label}
    </button>
  );
};
