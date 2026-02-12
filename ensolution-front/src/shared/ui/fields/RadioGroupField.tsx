import { FieldWrapper } from "@shared/ui";

interface RadioOption<T extends string | number> {
  label: string;
  value: T;
}

interface RadioGroupFieldProps<T extends string | number> {
  label?: string;
  value: T;
  options: RadioOption<T>[];
  onChange?: (value: T) => void;
  name: string;
  required?: boolean;
  disabled?: boolean;
}

export const RadioGroupField = <T extends string | number>({
  label,
  value,
  options,
  onChange,
  name,
  required,
  disabled
}: RadioGroupFieldProps<T>) => {
  return (
    <FieldWrapper label={label} required={required}>
      <div className="flex gap-4">
        {options.map(option => (
          <label key={String(option.value)} className="flex items-center gap-2">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              disabled={disabled}
              onChange={() => onChange?.(option.value)}
            />
            {option.label}
          </label>
        ))}
      </div>
    </FieldWrapper>
  );
};