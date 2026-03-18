import { Input } from "@material-tailwind/react";

interface InputFieldProps<T = string> {
  id?: string;
  label?: string;

  value: T;
  onChange?: (value: T) => void;

  type?: React.HTMLInputTypeAttribute;
  name?: string;
  placeholder?: string;

  disabled?: boolean;
  readOnly?: boolean;

  min?: number;
  max?: number;
  step?: number;

  helperText?: string;
}

export const InputField = <T extends string | number>({
  id,
  label,
  value,
  onChange,
  type = "text",
  name,
  placeholder,
  disabled = false,
  readOnly = false,
  min,
  max,
  step,
  helperText,
}: InputFieldProps<T>) => {
  return (
    <div className="w-full md:p-3">
      <Input
        id={id}
        label={label ? `${label}` : undefined}
        value={String(value)}
        onChange={(e) => onChange?.(e.target.value as T)}
        type={type}
        name={name}
        placeholder={placeholder}
        disabled={disabled || readOnly}
        min={min}
        max={max}
        step={step}
        error={!!helperText}
        className={readOnly ? "!bg-gray-100 !text-gray-600" : ""}
        containerProps={{ className: "!min-w-0 w-full" }}
        crossOrigin={undefined}
      />

      {helperText && (
        <p className="mt-1 text-xs text-red-500">{helperText}</p>
      )}
    </div>
  );
};
