type IconButtonVariant =
  | "ghost"
  | "danger";

type ButtonSize = "sm" | "md";

interface IconButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  title?: string;        // 접근성 + tooltip
  variant?: IconButtonVariant;
  size?: ButtonSize;
  className?: string;
  isLoading?: boolean;
}

export const IconButton = ({
  icon,
  onClick,
  title,
  variant = "ghost",
  size = "sm",
  className = "",
  isLoading = false,
}: IconButtonProps) => {
  const BASE_STYLE =
  "inline-flex items-center justify-center rounded-md transition-colors";

  const SIZE_STYLE: Record<ButtonSize, string> = {
    sm: "h-4 w-4",
    md: "h-5 h-5",
  };

  const VARIANT_STYLE = {
    ghost:
      "bg-white text-neutral-600 hover:bg-neutral-100",
    danger:
      "bg-white text-red-600 hover:bg-red-50",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={[
        BASE_STYLE,
        SIZE_STYLE[size],
        VARIANT_STYLE[variant],
        className,
      ].join(" ")}
    >
      {isLoading ? (
        <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
      ) : (
        <>
          {icon}
        </>
      )}
    </button>
  )
}