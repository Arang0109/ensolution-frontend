interface AddButtonProps {
  label: string;
  onClick: () => void;
}

export const AddButton = ({ label, onClick }: AddButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="
        px-4 py-2 bg-gradient-to-r from-brown-500 to-brown-600 
        text-white rounded-lg hover:from-brown-600 hover:to-brown-700
        transition-colors flex items-center gap-2 shadow-md
      "
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
      </svg>
      {label}
    </button>
  );
};