interface ButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "sm" | "md";
}

export const Button = ({
  label,
  onClick,
  icon,
  variant = "primary",
  size = "md",
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center gap-2 rounded-lg font-medium
        transition-colors shadow-md
        ${variant === "primary"
          ? "bg-gradient-to-r from-brown-500 to-brown-600 text-white hover:from-brown-600 hover:to-brown-700"
          : "bg-gray-100 text-gray-800 hover:bg-gray-200"}
        ${size === "sm" ? "px-3 py-1.5 text-sm" : "px-4 py-2"}
      `}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      {label}
    </button>
  );
};