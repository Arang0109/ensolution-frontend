interface InlineAddButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const InlineAddButton = ({
  label,
  onClick,
  disabled,
}: InlineAddButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="
        w-full
        px-4 py-2
        border-2 border-dashed border-gray-300
        text-gray-600
        rounded-lg
        hover:border-[#3B82F6]
        hover:text-[#3B82F6]
        transition-colors
        disabled:opacity-50
        disabled:cursor-not-allowed
      "
    >
      + {label}
    </button>
  );
}