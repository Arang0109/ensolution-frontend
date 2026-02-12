import Select from "react-select";
import { FieldWrapper } from "./FieldWrapper";

interface MultiSelectFieldProps<T, V extends string | number> {
  label?: string;
  options: T[];

  value: V[];
  placeholder?: string;
  onChange: (values: V[]) => void;

  getOptionLabel: (option: T) => string;
  getOptionValue: (option: T) => V;

  disabled?: boolean;
}

export function MultiSelectField<T, V extends string | number>({
  label,
  options,
  value,
  placeholder,
  onChange,
  getOptionLabel,
  getOptionValue,
  disabled,
}: MultiSelectFieldProps<T, V>) {

  const mappedOptions = options.map(o => ({
    value: getOptionValue(o),
    label: getOptionLabel(o),
  }));

  const selectedOptions = mappedOptions.filter(opt =>
    value.includes(opt.value)
  );

  return (
    <FieldWrapper label={label}>
      <Select
        isMulti
        options={mappedOptions}
        value={selectedOptions}
        isDisabled={disabled}
        placeholder={placeholder}

        onChange={(selected) => {
          const values = selected.map(s => s.value);
          onChange(values);
        }}
        className="text-sm"
      />
    </FieldWrapper>
  );
}