import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

import { FieldWrapper } from "./FieldWrapper";

interface SearchableSelectProps<T, V extends string | number = number> {
  id: string;
  label: string;
  placeholder: string;

  value: V | null;
  options: T[];

  getOptionLabel: (option: T) => string;
  getOptionValue: (option: T) => V;

  onChange: (value: V) => void;

  disabled?: boolean;
  loading?: boolean;
  emptyMessage?: string;
  required?: boolean;
}

export function SearchableSelect<T, V extends string | number = number>({
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
}: SearchableSelectProps<T, V>) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});

  // Filter options based on search term
  const filteredOptions = options.filter((option) =>
    getOptionLabel(option).toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get selected option label
  const selectedOption = options.find((option) => getOptionValue(option) === value);
  const selectedLabel = selectedOption ? getOptionLabel(selectedOption) : "";

  // Calculate dropdown position when opened
  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setDropdownStyle({
        position: "fixed",
        top: rect.bottom + 4,
        left: rect.left,
        width: rect.width,
        zIndex: 9999,
      });
    }
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue: V) => {
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
    <FieldWrapper label={label} required={required} id={id}>
      <div
          ref={triggerRef}
          onClick={handleToggle}
          className={`
            w-full px-3 py-2 border border-gray-300 rounded-lg
            focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-transparent
            ${disabled || loading ? "bg-gray-100 cursor-not-allowed" : "cursor-pointer bg-white"}
            ${isOpen ? "ring-2 ring-primary-500 border-transparent" : ""}
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

        {isOpen && createPortal(
          <div
            ref={dropdownRef}
            style={dropdownStyle}
            className="bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-hidden"
          >
            <div className="p-2 border-b border-gray-200">
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                autoFocus
              />
            </div>

            <div className="overflow-y-auto max-h-48">
              {filteredOptions.length === 0 ? (
                <div className="px-3 py-2 text-gray-500 text-sm text-center">
                  {emptyMessage}
                </div>
              ) : (
                filteredOptions.map((option) => {
                  const optionValue = getOptionValue(option);
                  const optionLabel = getOptionLabel(option);
                  const isSelected = optionValue === value;

                  return (
                    <button
                      key={optionValue}
                      type="button"
                      onClick={() => handleSelect(optionValue)}
                      disabled={disabled}
                      className={`
                        w-full text-left
                        px-3 py-2
                        transition-colors
                        focus:outline-none focus:bg-neutral-100
                        ${
                          isSelected
                            ? "bg-neutral-100 text-neutral-900"
                            : "hover:bg-gray-100"
                        }
                      `}
                    >
                      {optionLabel}
                    </button>
                  );
                })
              )}
            </div>
          </div>,
          document.body
        )}
    </FieldWrapper>
  );
}