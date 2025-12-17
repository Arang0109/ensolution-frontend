interface SelectOption<T extends string = string> {
  value: T;
  label: string;
}

interface SelectFieldProps<T extends string = string> {
  label?: string;
  name: string;
  value: T;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  options: readonly SelectOption<T>[];
  disabled?: boolean;
}

export const SelectField = <T extends string,>({
  options,
  ...props
}: SelectFieldProps<T>) => {
    
  return (
    <select
      {...props}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">...</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
};