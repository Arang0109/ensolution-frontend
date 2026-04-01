export const TableEditableCell = ({
  value,
  type,
  onChange,
  colSpan,
  placeholder,
}: {
  value: string;
  type?: string;
  onChange: (v: string) => void;
  colSpan?: number;
  placeholder?: string;
}) => (
  <>
    <td colSpan={colSpan} className="border border-slate-200 bg-white">
      <input
        value={value}
        type={type}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? "-"}
        className="w-full p-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm text-gray-800 bg-transparent focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-400"
      />
    </td>
  </>
);