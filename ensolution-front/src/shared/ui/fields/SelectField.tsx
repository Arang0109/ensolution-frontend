import { FieldWrapper } from "./FieldWrapper";
import Select from "react-select";

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
  name,
  placeholder,
  options,
  getOptionLabel,
  getOptionValue,
  onChange,
  disabled,
  required,
}: SelectFieldProps<T, V>) => {
    
  const mappedOptions = options.map(o => ({
    value: getOptionValue(o),
    label: getOptionLabel(o),
  }));

  const selectedOption =
    mappedOptions.find(opt => opt.value === value) ?? null;

  return (
    <FieldWrapper label={label} required={required} id={id}>
      <Select
        inputId={id}
        name={name}
        options={mappedOptions}
        value={selectedOption}
        isDisabled={disabled}
        placeholder={placeholder}
        onChange={(opt) => opt && onChange(opt.value)}
        className="text-sm"
      />
    </FieldWrapper>
  );
};