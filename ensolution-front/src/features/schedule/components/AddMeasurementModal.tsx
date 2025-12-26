import { useState, useEffect } from "react";
import { getStackMeasurementsByStack } from "@stack/api/stackApi";
import { registerMeasurements } from "@schedule/api/scheduleApi";
import { MeasurementMultiSelect } from "./MeasurementMultiSelect";
import type { StackMeasurementResponse } from "@stack/model";
import type { SchedulePollutant } from "@schedule/model";

interface AddMeasurementModalProps {
  scheduleId: number;
  stackId: number;
  existingMeasurementIds: number[];
  onClose: () => void;
  onSuccess: () => void;
}

export const AddMeasurementModal = ({
  scheduleId,
  stackId,
  existingMeasurementIds,
  onClose,
  onSuccess,
}: AddMeasurementModalProps) => {
  const [availableMeasurements, setAvailableMeasurements] = useState<StackMeasurementResponse[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchingMeasurements, setFetchingMeasurements] = useState(true);

  useEffect(() => {
    const fetchMeasurements = async () => {
      try {
        setFetchingMeasurements(true);
        const response = await getStackMeasurementsByStack(stackId);
        if (response.status) {
          // Filter out already added measurements
          const filtered = response.data.filter(
            (m) => !existingMeasurementIds.includes(m.id)
          );
          setAvailableMeasurements(filtered);
        }
      } catch (error) {
        console.error("Failed to fetch measurements:", error);
      } finally {
        setFetchingMeasurements(false);
      }
    };

    fetchMeasurements();
  }, [stackId, existingMeasurementIds]);

  const handleSubmit = async () => {
    if (selectedIds.length === 0) {
      alert("측정항목을 선택해주세요.");
      return;
    }

    try {
      setLoading(true);
      const measurements: SchedulePollutant[] = selectedIds.map((id) => ({
        stackMeasurementId: id,
      }));

      const response = await registerMeasurements(scheduleId, measurements);
      if (response.status) {
        alert("측정항목이 추가되었습니다.");
        onSuccess();
        onClose();
      }
    } catch (error) {
      console.error("Failed to add measurements:", error);
      alert("측정항목 추가에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-bold text-gray-900">측정항목 추가</h2>
        </div>

        {/* Content */}
        <div className="px-6 py-4">
          <MeasurementMultiSelect
            id="add-measurements"
            label="측정항목"
            placeholder="측정항목을 선택하세요"
            measurements={availableMeasurements}
            selectedIds={selectedIds}
            onChange={setSelectedIds}
            loading={fetchingMeasurements}
            emptyMessage="추가 가능한 측정항목이 없습니다"
            required
          />

          {availableMeasurements.length === 0 && !fetchingMeasurements && (
            <p className="mt-2 text-sm text-gray-500">
              모든 측정항목이 이미 추가되었거나 해당 배출구에 등록된 측정항목이 없습니다.
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading || selectedIds.length === 0 || fetchingMeasurements}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "추가 중..." : "추가"}
          </button>
        </div>
      </div>
    </div>
  );
};
