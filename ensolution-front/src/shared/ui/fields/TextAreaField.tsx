import { FieldWrapper } from "./FieldWrapper";

interface TextAreaFieldProps {
  label?: string;
  value: string;
  onChange?: (value: string) => void;

  placeholder?: string;
  rows?: number;

  disabled?: boolean;
  readOnly?: boolean;

  helperText?: string;
}

export const TextAreaField = ({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
  disabled = false,
  readOnly = false,
  helperText,
}: TextAreaFieldProps) => {
  return (
    <FieldWrapper label={label}>
      <textarea
        value={value}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        readOnly={readOnly}
        onChange={(e) => onChange?.(e.target.value)}
        className={`
          w-full px-3 py-2 rounded-lg border text-sm
          ${readOnly ? "bg-gray-100 text-gray-600" : "bg-white"}
          disabled:opacity-50 disabled:cursor-not-allowed
          focus:outline-none focus:ring-2 focus:ring-primary-500
          resize-y
        `}
      />
      {helperText && (
        <p className="mt-1 text-xs text-gray-500">{helperText}</p>
      )}
    </FieldWrapper>
  );
};