import { Textarea } from "@material-tailwind/react";

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
  rows = 3,
  disabled = false,
  readOnly = false,
  helperText,
}: TextAreaFieldProps) => {
  return (
    <div className="w-full md:p-3">
      <Textarea
        label={label}
        value={value}
        rows={rows}
        disabled={disabled}
        readOnly={readOnly}
        onChange={(e) => onChange?.(e.target.value)}
        className={readOnly ? "!bg-gray-100 !text-gray-600" : ""}
        containerProps={{ className: "!min-w-0 w-full" }}
      />
      {helperText && (
        <p className="mt-1 text-xs text-gray-500">{helperText}</p>
      )}
    </div>
  );
};