import { useState, useRef, useEffect } from "react";
import { Checkbox, Chip } from "@material-tailwind/react";

interface MultiSelectFieldProps<T, V extends string | number> {
  label?: string;
  options: T[];

  value: V[];
  placeholder?: string;
  onChange: (values: V[]) => void;

  getOptionLabel: (option: T) => string;
  getOptionValue: (option: T) => V;

  disabled?: boolean;
}

export function MultiSelectField<T, V extends string | number>({
  label,
  options,
  value,
  placeholder = "선택하세요",
  onChange,
  getOptionLabel,
  getOptionValue,
  disabled,
}: MultiSelectFieldProps<T, V>) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggle = (val: V) => {
    if (value.includes(val)) {
      onChange(value.filter((v) => v !== val));
    } else {
      onChange([...value, val]);
    }
  };

  const selectedLabels = options
    .filter((o) => value.includes(getOptionValue(o)))
    .map(getOptionLabel);

  return (
    <div className="md:p-3" ref={containerRef}>
      {label && (
        <label className="block text-xs font-medium text-gray-600 mb-1">
          {label}
        </label>
      )}

      {/* Trigger */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((prev) => !prev)}
        className={[
          "relative w-full min-h-[40px] px-3 py-2 text-left text-sm rounded-md border",
          "flex flex-wrap items-center gap-1 pr-8",
          "transition-colors",
          open
            ? "border-gray-900"
            : "border-blue-gray-200 hover:border-blue-gray-400",
          disabled ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white cursor-pointer",
        ].join(" ")}
      >
        {selectedLabels.length > 0 ? (
          selectedLabels.map((lbl) => (
            <Chip
              key={lbl}
              value={lbl}
              size="sm"
              className="rounded-full normal-case font-normal"
            />
          ))
        ) : (
          <span className="text-blue-gray-400">{placeholder}</span>
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className={[
            "absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-gray-400 transition-transform",
            open ? "rotate-180" : "",
          ].join(" ")}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && !disabled && (
        <div className="absolute z-50 mt-1 w-max min-w-full max-h-60 overflow-y-auto rounded-md border border-blue-gray-100 bg-white shadow-lg">
          {options.map((o) => {
            const val = getOptionValue(o);
            const lbl = getOptionLabel(o);
            return (
              <div
                key={String(val)}
                className="flex items-center px-2 hover:bg-blue-gray-50 cursor-pointer"
                onClick={() => toggle(val)}
              >
                <Checkbox
                  checked={value.includes(val)}
                  onChange={() => toggle(val)}
                  label={lbl}
                  className="cursor-pointer"
                  crossOrigin={undefined}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
