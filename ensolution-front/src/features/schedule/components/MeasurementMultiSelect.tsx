import { useState, useRef, useEffect } from "react";
import type { StackMeasurementResponse } from "@stack/model";

interface MeasurementMultiSelectProps {
  id: string;
  label: string;
  placeholder: string;
  measurements: StackMeasurementResponse[];
  selectedIds: number[];
  onChange: (selectedIds: number[]) => void;
  disabled?: boolean;
  loading?: boolean;
  emptyMessage?: string;
  required?: boolean;
}

export const MeasurementMultiSelect = ({
  id,
  label,
  placeholder,
  measurements,
  selectedIds,
  onChange,
  disabled = false,
  loading = false,
  emptyMessage = "측정항목이 없습니다",
  required = false,
}: MeasurementMultiSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const filteredMeasurements = measurements.filter((m) => {
    const pollutantName = m.pollutant.nameKr.toLowerCase();
    const search = searchTerm.toLowerCase();
    return pollutantName.includes(search);
  });

  const toggleMeasurement = (measurementId: number) => {
    if (selectedIds.includes(measurementId)) {
      onChange(selectedIds.filter((id) => id !== measurementId));
    } else {
      onChange([...selectedIds, measurementId]);
    }
  };

  const selectAll = () => {
    onChange(measurements.map((m) => m.id));
  };

  const clearAll = () => {
    onChange([]);
  };

  const getSelectedMeasurements = () => {
    return measurements.filter((m) => selectedIds.includes(m.id));
  };

  const selectedMeasurements = getSelectedMeasurements();

  return (
    <div ref={dropdownRef} className="relative">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div
        onClick={() => !disabled && !loading && setIsOpen(!isOpen)}
        className={`w-full px-3 py-2 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-brown-500 focus:border-transparent ${
          disabled || loading ? "bg-gray-100 cursor-not-allowed" : "bg-white hover:border-gray-400"
        }`}
      >
        {loading ? (
          <span className="text-gray-500">로딩 중...</span>
        ) : selectedMeasurements.length === 0 ? (
          <span className="text-gray-400">{placeholder}</span>
        ) : (
          <div className="flex flex-wrap gap-1">
            {selectedMeasurements.map((m) => (
              <span
                key={m.id}
                className="inline-flex items-center px-2 py-1 bg-brown-100 text-brown-800 rounded text-sm"
              >
                {m.pollutant.nameKr}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMeasurement(m.id);
                  }}
                  className="ml-1 text-brown-600 hover:text-brown-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-hidden">
          {/* Search input */}
          <div className="p-2 border-b border-gray-200">
            <input
              type="text"
              placeholder="측정항목 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 p-2 border-b border-gray-200 bg-gray-50">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                selectAll();
              }}
              className="flex-1 px-2 py-1 text-xs bg-brown-500 text-white rounded hover:bg-brown-600 transition-colors"
            >
              전체 선택
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                clearAll();
              }}
              className="flex-1 px-2 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            >
              전체 해제
            </button>
          </div>

          {/* Options list */}
          <div className="max-h-48 overflow-y-auto">
            {filteredMeasurements.length === 0 ? (
              <div className="p-4 text-center text-gray-500">{emptyMessage}</div>
            ) : (
              filteredMeasurements.map((measurement) => (
                <div
                  key={measurement.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMeasurement(measurement.id);
                  }}
                  className={`px-4 py-2 cursor-pointer hover:bg-gray-100 border-b border-gray-100 last:border-b-0 ${
                    selectedIds.includes(measurement.id) ? "bg-brown-50" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{measurement.pollutant.nameKr}</div>
                      <div className="text-xs text-gray-500">
                        주기: {measurement.cycle} | 허용기준: {measurement.allowance ?? "N/A"}
                      </div>
                    </div>
                    <div className="ml-2">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(measurement.id)}
                        onChange={() => {}}
                        className="w-4 h-4 text-brown-600 border-gray-300 rounded focus:ring-brown-500"
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
