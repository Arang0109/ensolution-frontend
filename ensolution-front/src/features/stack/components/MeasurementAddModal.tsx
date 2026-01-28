import { useState, useEffect, useRef } from "react";

import { registerStackMeasurement } from "@stack/api/stackMeasurementApi";
import { getPollutants } from "@pollutant/api/pollutantApi";
import type { PollutantResponse } from "@pollutant/model/pollutant.types";
import type { Cycle } from "@common/model";

import { CYCLE_LABELS } from "@common/constants/labels";

interface MeasurementAddModalProps {
  stackId: number;
  onClose: () => void;
  onSuccess: () => void;
}

interface MeasurementItem {
  id: string;
  pollutantId: number | null;
  cycle: Cycle;
  allowance: string;
}

export const MeasurementAddModal = ({
  stackId,
  onClose,
  onSuccess,
}: MeasurementAddModalProps) => {
  const [pollutants, setPollutants] = useState<PollutantResponse[]>([]);
  const [loadingPollutants, setLoadingPollutants] = useState(true);
  const [measurements, setMeasurements] = useState<MeasurementItem[]>([
    { id: crypto.randomUUID(), pollutantId: null, cycle: "MONTHLY_1", allowance: "" }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Search functionality
  const [searchTerms, setSearchTerms] = useState<Record<string, string>>({});
  const [isDropdownOpen, setIsDropdownOpen] = useState<Record<string, boolean>>({});
  const [focusedIndex, setFocusedIndex] = useState<Record<string, number>>({});
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Load pollutants on mount
  useEffect(() => {
    const fetchPollutants = async () => {
      try {
        const response = await getPollutants();
        if (response.status && response.data) {
          setPollutants(response.data);
        }
      } catch (error) {
        console.error("Failed to load pollutants:", error);
        alert("측정물질 목록을 불러오는데 실패했습니다.");
      } finally {
        setLoadingPollutants(false);
      }
    };

    fetchPollutants();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isOutside = Object.values(dropdownRefs.current).every(
        (ref) => ref && !ref.contains(target)
      );
      if (isOutside) {
        setIsDropdownOpen({});
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-scroll to focused item in dropdown
  useEffect(() => {
    Object.entries(focusedIndex).forEach(([measurementId, idx]) => {
      if (isDropdownOpen[measurementId]) {
        const dropdown = dropdownRefs.current[measurementId];
        if (dropdown) {
          const focusedElement = dropdown.querySelector(`button:nth-child(${idx + 1})`);
          if (focusedElement) {
            focusedElement.scrollIntoView({ block: "nearest", behavior: "smooth" });
          }
        }
      }
    });
  }, [focusedIndex, isDropdownOpen]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate that at least one measurement is filled
    const validMeasurements = measurements.filter(m => m.pollutantId !== null);

    if (validMeasurements.length === 0) {
      alert("최소 1개 이상의 측정물질을 선택해주세요.");
      return;
    }

    // Check for duplicate pollutants
    const pollutantIds = validMeasurements.map(m => m.pollutantId);
    const uniqueIds = new Set(pollutantIds);
    if (pollutantIds.length !== uniqueIds.size) {
      alert("중복된 측정물질이 있습니다.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Register all measurements in parallel
      const promises = validMeasurements.map(measurement =>
        registerStackMeasurement({
          stackId,
          pollutantId: measurement.pollutantId!,
          cycle: measurement.cycle,
          allowance: measurement.allowance === "" ? null : Number(measurement.allowance),
        })
      );

      const results = await Promise.all(promises);

      const failedResults = results.filter(r => !r.status);
      if (failedResults.length > 0) {
        alert(`${failedResults.length}개의 측정물질 등록에 실패했습니다.`);
        setIsSubmitting(false);
        return;
      }

      alert(`${validMeasurements.length}개의 측정물질이 등록되었습니다.`);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("등록 중 오류:", error);
      alert("등록 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const addMeasurement = () => {
    setMeasurements([
      ...measurements,
      { id: crypto.randomUUID(), pollutantId: null, cycle: "MONTHLY_1", allowance: "" }
    ]);
  };

  const removeMeasurement = (id: string) => {
    if (measurements.length === 1) {
      alert("최소 1개의 측정물질 항목이 필요합니다.");
      return;
    }
    setMeasurements(measurements.filter(m => m.id !== id));

    // Clean up search state
    const newSearchTerms = { ...searchTerms };
    delete newSearchTerms[id];
    setSearchTerms(newSearchTerms);

    const newDropdownOpen = { ...isDropdownOpen };
    delete newDropdownOpen[id];
    setIsDropdownOpen(newDropdownOpen);
  };

  const updateMeasurement = (id: string, field: keyof MeasurementItem, value: string | number | Cycle | null) => {
    setMeasurements(measurements.map(m =>
      m.id === id ? { ...m, [field]: value } : m
    ));
  };

  const getFilteredPollutants = (measurementId: string) => {
    const searchTerm = searchTerms[measurementId] || "";
    if (!searchTerm) return pollutants;

    return pollutants.filter(p =>
      p.nameKr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.nameEn && p.nameEn.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  const getSelectedPollutantName = (pollutantId: number | null) => {
    if (!pollutantId) return "";
    const pollutant = pollutants.find(p => p.id === pollutantId);
    if (!pollutant) return "";
    return `${pollutant.nameKr}${pollutant.nameEn ? ` (${pollutant.nameEn})` : ""}`;
  };

  const handleSearchChange = (measurementId: string, value: string) => {
    setSearchTerms({ ...searchTerms, [measurementId]: value });
    setIsDropdownOpen({ ...isDropdownOpen, [measurementId]: true });
    setFocusedIndex({ ...focusedIndex, [measurementId]: 0 });
  };

  const selectPollutant = (measurementId: string, pollutantId: number) => {
    updateMeasurement(measurementId, "pollutantId", pollutantId);
    setSearchTerms({ ...searchTerms, [measurementId]: "" });
    setIsDropdownOpen({ ...isDropdownOpen, [measurementId]: false });
    setFocusedIndex({ ...focusedIndex, [measurementId]: 0 });
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    measurementId: string
  ) => {
    const filteredPollutants = getFilteredPollutants(measurementId);
    const currentIndex = focusedIndex[measurementId] || 0;

    // Enter 키는 항상 preventDefault (드롭다운이 열려있든 닫혀있든)
    if (e.key === "Enter") {
      e.preventDefault();
      // 드롭다운이 열려있고 결과가 있을 때만 선택
      if (isDropdownOpen[measurementId] && filteredPollutants.length > 0 && filteredPollutants[currentIndex]) {
        selectPollutant(measurementId, filteredPollutants[currentIndex].id);
      }
      return;
    }

    // 드롭다운이 닫혀있거나 결과가 없으면 다른 키 무시
    if (!isDropdownOpen[measurementId] || filteredPollutants.length === 0) {
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setFocusedIndex({
          ...focusedIndex,
          [measurementId]: Math.min(currentIndex + 1, filteredPollutants.length - 1),
        });
        break;
      case "ArrowUp":
        e.preventDefault();
        setFocusedIndex({
          ...focusedIndex,
          [measurementId]: Math.max(currentIndex - 1, 0),
        });
        break;
      case "Escape":
        e.preventDefault();
        setIsDropdownOpen({ ...isDropdownOpen, [measurementId]: false });
        break;
    }
  };

  const cycleOptions: Cycle[] = [
    "MONTHLY_1",
    "MONTHLY_2",
    "BIMONTHLY",
    "QUARTERLY",
    "SEMI_ANNUAL",
    "ANNUAL",
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 my-8 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">측정물질 추가</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            disabled={isSubmitting}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {loadingPollutants ? (
            <div className="text-gray-500 text-center py-8">측정물질 목록을 불러오는 중...</div>
          ) : (
            <>
              {measurements.map((measurement, index) => (
                <div key={measurement.id} className="border border-gray-200 rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-700">측정물질 #{index + 1}</h3>
                    {measurements.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMeasurement(measurement.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        disabled={isSubmitting}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* 측정물질 선택 (검색 가능) */}
                    <div className="relative" ref={el => { dropdownRefs.current[measurement.id] = el; }}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        측정물질 <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={
                            measurement.pollutantId
                              ? getSelectedPollutantName(measurement.pollutantId)
                              : searchTerms[measurement.id] || ""
                          }
                          onChange={(e) => {
                            if (measurement.pollutantId) {
                              updateMeasurement(measurement.id, "pollutantId", null);
                            }
                            handleSearchChange(measurement.id, e.target.value);
                          }}
                          onFocus={() => setIsDropdownOpen({ ...isDropdownOpen, [measurement.id]: true })}
                          onKeyDown={(e) => handleKeyDown(e, measurement.id)}
                          placeholder="측정물질 검색..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          disabled={isSubmitting}
                        />
                        {measurement.pollutantId && (
                          <button
                            type="button"
                            onClick={() => {
                              updateMeasurement(measurement.id, "pollutantId", null);
                              setSearchTerms({ ...searchTerms, [measurement.id]: "" });
                            }}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            disabled={isSubmitting}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        )}
                      </div>

                      {/* Dropdown */}
                      {isDropdownOpen[measurement.id] && !measurement.pollutantId && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                          {getFilteredPollutants(measurement.id).length === 0 ? (
                            <div className="px-3 py-2 text-gray-500 text-sm">검색 결과가 없습니다.</div>
                          ) : (
                            getFilteredPollutants(measurement.id).map((pollutant, idx) => (
                              <button
                                key={pollutant.id}
                                type="button"
                                onClick={() => selectPollutant(measurement.id, pollutant.id)}
                                className={`w-full text-left px-3 py-2 hover:bg-gray-100 transition-colors text-sm ${
                                  idx === (focusedIndex[measurement.id] || 0)
                                    ? "bg-neutral-100"
                                    : ""
                                }`}
                                disabled={isSubmitting}
                              >
                                {pollutant.nameKr}
                                {pollutant.nameEn && (
                                  <span className="text-gray-500 ml-1">({pollutant.nameEn})</span>
                                )}
                              </button>
                            ))
                          )}
                        </div>
                      )}
                    </div>

                    {/* 측정 주기 선택 */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        측정 주기 <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={measurement.cycle}
                        onChange={(e) => updateMeasurement(measurement.id, "cycle", e.target.value as Cycle)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        disabled={isSubmitting}
                      >
                        {cycleOptions.map((cycleOption) => (
                          <option key={cycleOption} value={cycleOption}>
                            {CYCLE_LABELS[cycleOption]}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* 허용기준 입력 */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        허용기준
                      </label>
                      <input
                        type="number"
                        value={measurement.allowance}
                        onChange={(e) => updateMeasurement(measurement.id, "allowance", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="허용기준 (선택)"
                        min="0"
                        step="0.01"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                </div>
              ))}

              {/* 측정물질 추가 버튼 */}
              <button
                type="button"
                onClick={addMeasurement}
                className="w-full px-4 py-2 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-primary-500 hover:text-primary-500 transition-colors"
                disabled={isSubmitting}
              >
                + 측정물질 추가
              </button>
            </>
          )}

          {/* 버튼 */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              disabled={isSubmitting}
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-gradient-to-r from-neutral-800 to-neutral-900 text-white rounded-lg hover:from-neutral-900 hover:to-neutral-950 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting || loadingPollutants}
            >
              {isSubmitting ? "등록 중..." : `등록 (${measurements.filter(m => m.pollutantId).length}개)`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
