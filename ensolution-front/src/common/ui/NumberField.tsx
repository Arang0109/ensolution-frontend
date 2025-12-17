interface NumberFieldProps {
  name: string;
  value: number | '';
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  step?: number;
  min?: number;
  max?: number;
  placeholder?: string;
}

export const NumberField = ({
  name,
  value,
  onChange,
  ...props
}: NumberFieldProps) => (
  <input
    type="number"
    name={name}
    value={value}
    onChange={onChange}
    className="w-full px-3 py-2 border border-gray-300 rounded-lg
               focus:outline-none focus:ring-2 focus:ring-blue-500"
    {...props}
  />
);