import React from "react";
import { Input } from "@material-tailwind/react";

interface InputFieldProps<T = string> {
  id?: string;
  label?: React.ReactNode;

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
  min,
  max,
  step,
  helperText,
}: InputFieldProps<T>) => {
  const isStringLabel = typeof label === "string";

  return (
    <div className="w-full md:p-3">
      {label && !isStringLabel && (
        <label
          htmlFor={id}
          className="block mb-1 text-sm text-gray-600"
        >
          {label}
        </label>
      )}
      <Input
        id={id}
        label={isStringLabel ? (label as string) : undefined}
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
