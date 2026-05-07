interface RadioOption<T extends string | number> {
  label: string;
  value: T;
}

interface RadioGroupFieldProps<T extends string | number> {
  value: T;
  options: RadioOption<T>[];
  onChange?: (value: T) => void;
  name: string;
  required?: boolean;
  disabled?: boolean;
}

export const RadioGroupField = <T extends string | number>({
  value,
  options,
  onChange,
  disabled,
}: RadioGroupFieldProps<T>) => {
  return (
    <div className="flex flex-wrap gap-1">
      {options.map(option => {
        const isSelected = value === option.value;
        return (
          <button
            key={String(option.value)}
            type="button"
            onClick={() => !disabled && onChange?.(option.value)}
            disabled={disabled}
            className={[
              "px-3 py-1.5 text-sm font-medium rounded border transition-colors",
              isSelected
                ? "bg-blue-600 border-blue-600 text-white"
                : "bg-white border-gray-300 text-gray-600 hover:border-blue-400 hover:text-blue-600",
              disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
            ].join(" ")}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};