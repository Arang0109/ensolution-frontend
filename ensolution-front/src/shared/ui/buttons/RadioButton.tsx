type RadioButtonVariant = "primary" | "secondary";

type RadioButtonSize = "sm" | "md" | "lg";

interface RadioOption<T extends string | number> {
  label: string;
  value: T;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface RadioButtonProps<T extends string | number> {
  options: RadioOption<T>[];
  value: T;
  onChange?: (value: T) => void;
  variant?: RadioButtonVariant;
  size?: RadioButtonSize;
  disabled?: boolean;
}

export const RadioButton = <T extends string | number>({
  options,
  value,
  onChange,
  variant = "primary",
  size = "md",
  disabled = false,
}: RadioButtonProps<T>) => {
  const VARIANT_STYLES: Record<
    RadioButtonVariant,
    { active: string; inactive: string }
  > = {
    primary: {
      active: "bg-[#3B82F6]/90 text-white border-[#3B82F6]",
      inactive:
        "bg-white text-neutral-600 border-neutral-300 hover:bg-neutral-50",
    },
    secondary: {
      active: "bg-neutral-700 text-white border-neutral-700",
      inactive:
        "bg-white text-neutral-600 border-neutral-300 hover:bg-neutral-50",
    },
  };

  const SIZE_STYLES: Record<RadioButtonSize, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <div className="inline-flex rounded-md overflow-hidden" role="radiogroup">
      {options.map((option) => {
        const isActive = value === option.value;
        const isDisabled = disabled || option.disabled;
        const styles = VARIANT_STYLES[variant];

        return (
          <button
            key={String(option.value)}
            type="button"
            role="radio"
            aria-checked={isActive}
            disabled={isDisabled}
            onClick={() => !isDisabled && onChange?.(option.value)}
            className={`
              inline-flex items-center gap-2 border font-medium
              transition-colors
              first:rounded-l-md last:rounded-r-md
              ${SIZE_STYLES[size]}
              ${isActive ? styles.active : styles.inactive}
              ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
            `}
          >
            {option.icon && (
              <span className="flex items-center">{option.icon}</span>
            )}
            {option.label}
          </button>
        );
      })}
    </div>
  );
};
