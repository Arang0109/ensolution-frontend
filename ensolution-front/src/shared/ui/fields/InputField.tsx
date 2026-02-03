import { FieldWrapper } from "./FieldWrapper";

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
  required?: boolean;

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
  required,
  min,
  max,
  step,
  helperText,
}: InputFieldProps<T>) => {
  return (
    <FieldWrapper id={id} label={label} required={required}>
      <input
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange?.(e.target.value as T)}
        className={`
          w-full px-3 py-2 rounded-lg border
          text-sm
          ${readOnly ? "bg-gray-100 text-gray-600" : "bg-white"}
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          focus:outline-none focus:ring-2 focus:ring-primary-500
        `}
      />

      {helperText && (
        <p className="mt-1 text-xs text-gray-500">
          {helperText}
        </p>
      )}
    </FieldWrapper>
  );
};