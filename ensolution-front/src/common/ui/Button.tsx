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
      "bg-gradient-to-r from-brown-500 to-brown-600 text-white hover:from-brown-600 hover:to-brown-700",

    submit:
      "bg-blue-600 text-white hover:bg-blue-700",

    danger:
      "bg-red-600 text-white hover:bg-red-700",

    secondary:
      "bg-gray-100 text-gray-800 hover:bg-gray-200",

    ghost:
      "bg-transparent text-gray-700 hover:bg-gray-100",
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
        inline-flex items-center gap-2 rounded-lg font-medium
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
