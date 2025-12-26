import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router';

interface DropdownItem {
  label: string;
  path: string;
}

interface DropdownProps {
  label: string;
  items: DropdownItem[];
}

export const Dropdown = ({ label, items }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-neutral-700 hover:text-neutral-900 font-medium transition no-underline"
      >
        {label}
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 w-40 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50">
          {items.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-neutral-700 hover:bg-slate-50 hover:text-neutral-900 transition no-underline"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
