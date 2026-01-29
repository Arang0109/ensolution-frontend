export const TimeField = ({
  name,
  value,
  onChange,
}: {
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) => (
  <input
    type="time"
    name={name}
    value={value}
    onChange={onChange}
    className="w-full px-3 py-2 border border-gray-300 rounded-lg
               focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
);