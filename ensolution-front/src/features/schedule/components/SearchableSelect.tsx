import { useState, useRef, useEffect } from "react";

interface SearchableSelectProps<T> {
  id: string;
  label: string;
  placeholder: string;
  value: number;
  options: T[];
  getOptionLabel: (option: T) => string;
  getOptionValue: (option: T) => number;
  onChange: (value: number) => void;
  disabled?: boolean;
  loading?: boolean;
  emptyMessage?: string;
  required?: boolean;
}

export function SearchableSelect<T>({
  id,
  label,
  placeholder,
  value,
  options,
  getOptionLabel,
  getOptionValue,
  onChange,
  disabled = false,
  loading = false,
  emptyMessage = "항목이 없습니다",
  required = false,
}: SearchableSelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter options based on search term
  const filteredOptions = options.filter((option) =>
    getOptionLabel(option).toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get selected option label
  const selectedOption = options.find((option) => getOptionValue(option) === value);
  const selectedLabel = selectedOption ? getOptionLabel(selectedOption) : "";

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue: number) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleToggle = () => {
    if (!disabled && !loading) {
      setIsOpen(!isOpen);
      if (!isOpen) {
        setSearchTerm("");
      }
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        <div
          onClick={handleToggle}
          className={`
            w-full px-3 py-2 border border-gray-300 rounded-lg
            focus-within:outline-none focus-within:ring-2 focus-within:ring-brown-500 focus-within:border-transparent
            ${disabled || loading ? "bg-gray-100 cursor-not-allowed" : "cursor-pointer bg-white"}
            ${isOpen ? "ring-2 ring-brown-500 border-transparent" : ""}
          `}
        >
          <div className="flex items-center justify-between">
            <span className={`${value ? "text-gray-900" : "text-gray-400"}`}>
              {loading ? "로딩 중..." : selectedLabel || placeholder}
            </span>
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-hidden">
            <div className="p-2 border-b border-gray-200">
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500 focus:border-transparent"
                placeholder="검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                autoFocus
              />
            </div>

            <div className="overflow-y-auto max-h-48">
              {filteredOptions.length === 0 ? (
                <div className="px-3 py-2 text-gray-500 text-sm text-center">{emptyMessage}</div>
              ) : (
                filteredOptions.map((option) => {
                  const optionValue = getOptionValue(option);
                  const optionLabel = getOptionLabel(option);
                  const isSelected = optionValue === value;

                  return (
                    <div
                      key={optionValue}
                      onClick={() => handleSelect(optionValue)}
                      className={`
                        px-3 py-2 cursor-pointer transition-colors
                        ${isSelected ? "bg-brown-100 text-brown-900" : "hover:bg-gray-100"}
                      `}
                    >
                      {optionLabel}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
