import { Select, Option } from "@material-tailwind/react";

interface SelectFieldProps<T, V extends string | number> {
  id?: string;
  label?: string;

  value: V | null;
  name?: string;
  placeholder?: string;

  options: readonly T[];

  getOptionLabel: (option: T) => string;
  getOptionValue: (option: T) => V;

  onChange: (value: V) => void;

  disabled?: boolean;
  required?: boolean;
}

export const SelectField = <T, V extends string | number>({
  id,
  label,
  value,
  placeholder,
  options,
  getOptionLabel,
  getOptionValue,
  onChange,
  disabled,
}: SelectFieldProps<T, V>) => {
  const handleChange = (val: string | undefined) => {
    if (val === undefined) return;
    const matched = options.find(
      (o) => String(getOptionValue(o)) === val
    );
    if (matched !== undefined) onChange(getOptionValue(matched));
  };

  return (
    <div className="w-full md:p-3">
      <Select
        id={id}
        label={label}
        value={value !== null ? String(value) : ""}
        onChange={handleChange}
        disabled={disabled}
        placeholder={placeholder}
        containerProps={{ className: "!min-w-0 w-full" }}
      >
        {options.map((o) => {
          const val = getOptionValue(o);
          return (
            <Option key={String(val)} value={String(val)}>
              {getOptionLabel(o)}
            </Option>
          );
        })}
      </Select>
    </div>
  );
};
