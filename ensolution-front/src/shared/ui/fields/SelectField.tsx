interface SelectOption<T extends string | number> {
  value: T;
  label: string;
}

interface SelectFieldProps<T extends string | number> {
  id?: string;
  label?: string;
  value: T | "";
  options: readonly SelectOption<T>[];
  
  onChange: (value: T) => void;

  disabled?: boolean;
  required?: boolean;
}

export const SelectField = <T extends string | number>({
  id,
  label,
  value,
  options,
  onChange,
  disabled,
  required,
}: SelectFieldProps<T>) => {
    
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

      <select
        id={id}
        value={value}
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
    </div>
  )
};