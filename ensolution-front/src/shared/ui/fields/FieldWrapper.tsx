interface FieldWrapperProps {
  label?: string;
  children: React.ReactNode;
}

export const FieldWrapper = ({ label, children }: FieldWrapperProps) => (
  <div className="p-3 rounded-lg">
    {label && (
      <label className="block text-xs font-medium text-gray-600 mb-1">
        {label}
      </label>
    )}
    {children}
  </div>
);
