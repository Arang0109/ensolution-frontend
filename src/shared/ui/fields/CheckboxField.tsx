interface CheckboxFieldProps {
  label?: string;
  checked: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
}

export const CheckboxField = ({
  label,
  checked,
  onChange,
  disabled
}: CheckboxFieldProps) => {
  return (
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      {label}
    </label>
  );
};
