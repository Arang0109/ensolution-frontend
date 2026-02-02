import { FieldWrapper } from "./FieldWrapper";

interface SelectOption<T = string> {
  value: T;
  label: string;
}

interface SelectFieldProps<T = string> {
  id?: string;
  label?: string;
  value: T | "";
  name?: string;
  options: readonly SelectOption<T>[];
  
  onChange: (value: T) => void;

  disabled?: boolean;
  required?: boolean;
}

export const SelectField = <T extends string | number>({
  id,
  label,
  value,
  name,
  options,
  onChange,
  disabled,
  required,
}: SelectFieldProps<T>) => {
    
  return (
    <FieldWrapper label={label} required={required}>
      <select
        id={id}
        value={value}
        name={name}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value as T)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        <option value="">선택하세요</option>
        {options.map((opt) => (
          <option key={String(opt.value)} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </FieldWrapper>
  )
};