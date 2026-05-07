interface FieldWrapperProps {
  id?: string;
  label?: string;
  required?: boolean;
  children: React.ReactNode;
}

export const FieldWrapper = ({ id="", label, required, children }: FieldWrapperProps) => (
  <div className="p-3 rounded-lg">
    {label && (
      <label htmlFor={id} className="block text-xs font-medium text-gray-600 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
    )}
    {children}
  </div>
);
