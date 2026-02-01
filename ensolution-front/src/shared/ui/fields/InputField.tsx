interface InputFieldProps<T extends string | number = string> {
  id?: string;
  label?: string;

  type?: "text" | "number" | "email" | "password";

  value: T | "";
  onChange: (value: T | "") => void;

  placeholder?: string;
  disabled?: boolean;
  required?: boolean;

  min?: number;
  max?: number;
  step?: number;
}

export const InputField = <T extends string | number = string>({
  id,
  label,
  type = "text",
  value,
  onChange,
  required,
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
        onChange={(e) => {
          const v =
            type === "number"
              ? (e.target.value === "" ? "" : Number(e.target.value))
              : e.target.value;

          onChange(v as T | "");
        }}
        className="
          w-full px-3 py-2
          border border-gray-300 rounded-lg
          focus:outline-none focus:ring-2 focus:ring-primary-500
        "
        {...props}
      />
    </div>
  );
}