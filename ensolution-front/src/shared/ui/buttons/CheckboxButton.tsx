type CheckboxButtonVariant = "primary" | "secondary";

type CheckboxButtonSize = "sm" | "md" | "lg";

interface CheckboxOption<T extends string | number> {
  label: string;
  value: T;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface CheckboxButtonProps<T extends string | number> {
  options: CheckboxOption<T>[];
  value: T[];
  onChange?: (value: T[]) => void;
  variant?: CheckboxButtonVariant;
  size?: CheckboxButtonSize;
  disabled?: boolean;
}

export const CheckboxButton = <T extends string | number>({
  options,
  value,
  onChange,
  variant = "primary",
  size = "md",
  disabled = false,
}: CheckboxButtonProps<T>) => {
  const VARIANT_STYLES: Record<
    CheckboxButtonVariant,
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

  const SIZE_STYLES: Record<CheckboxButtonSize, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-lg",
  };

  const handleToggle = (optionValue: T) => {
    if (!onChange) return;

    const next = value.includes(optionValue)
      ? value.filter((v) => v !== optionValue)
      : [...value, optionValue];

    onChange(next);
  };

  return (
    <div className="inline-flex rounded-md overflow-hidden" role="group">
      {options.map((option) => {
        const isActive = value.includes(option.value);
        const isDisabled = disabled || option.disabled;
        const styles = VARIANT_STYLES[variant];

        return (
          <button
            key={String(option.value)}
            type="button"
            role="checkbox"
            aria-checked={isActive}
            disabled={isDisabled}
            onClick={() => !isDisabled && handleToggle(option.value)}
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
