interface FieldWrapperProps {
  label?: string;
  required?: boolean;
  children: React.ReactNode;
}

export const FieldWrapper = ({ label, required, children }: FieldWrapperProps) => (
  <div className="p-3 rounded-lg">
    {label && (
      <label className="block text-xs font-medium text-gray-600 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
    )}
    {children}
  </div>
);
