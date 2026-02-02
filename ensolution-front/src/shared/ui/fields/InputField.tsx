type BaseInputFieldProps<T extends string | number> = {
  id?: string;
  label?: string;
  type?: "text" | "number" | "email" | "password";

  value: T | "";

  placeholder?: string;
  disabled?: boolean;
  required?: boolean;

  min?: number;
  max?: number;
  step?: number;

  helperText?: string;
};

type EditableInputFieldProps<T extends string | number> =
  BaseInputFieldProps<T> & {
    readOnly?: false;
    onChange: (value: T | "") => void;
  };

type ReadOnlyInputFieldProps<T extends string | number> =
  BaseInputFieldProps<T> & {
    readOnly: true;
    onChange?: never;
  };

export type InputFieldProps<T extends string | number = string> =
  | EditableInputFieldProps<T>
  | ReadOnlyInputFieldProps<T>;

export const InputField = <T extends string | number = string>({
  id,
  label,
  type = "text",
  value,
  onChange,
  readOnly = false,
  disabled = false,
  required,
  helperText,
  ...props
}: InputFieldProps<T>) => {
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <input
        id={id}
        type={type}
        value={value}
        readOnly={readOnly}
        disabled={disabled}
        onChange={
          readOnly || !onChange
            ? undefined
            : (e) => {
                if (type === "number") {
                  const v = e.target.value;
                  onChange(v === "" ? "" : (Number(v) as T));
                } else {
                  onChange(e.target.value as T);
                }
              }
        }
        className="
          w-full px-3 py-2
          border border-gray-300 rounded-lg
          focus:outline-none focus:ring-2 focus:ring-primary-500
        "
        {...props}
      />

      {helperText && (
        <p className="text-xs text-gray-500 mt-1">{helperText}</p>
      )}
    </div>
  );
}