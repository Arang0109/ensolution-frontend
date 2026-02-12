import { useState, useEffect } from "react";

import { registerStackMeasurement } from "@stack/api/stackMeasurementApi";
import { getPollutants } from "@pollutant/api/pollutantApi";
import type { PollutantResponse } from "@/features/pollutant/model/pollutant-types";
import type { Cycle } from "@/shared/model";

import { CYCLE_LABELS } from "@stack/model";

import { X, Trash2 } from "lucide-react";

import { IconButton, Button, InlineAddButton } from "@shared/ui/buttons";
import { SelectField, InputField } from "@shared/ui";

interface MeasurementCreateModalProps {
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

export const MeasurementCreateModal = ({
  stackId,
  onClose,
  onSuccess,
}: MeasurementCreateModalProps) => {
  const [pollutants, setPollutants] = useState<PollutantResponse[]>([]);

  const [measurements, setMeasurements] = useState<MeasurementItem[]>([
    { id: crypto.randomUUID(), pollutantId: null, cycle: "MONTHLY_1", allowance: "" },
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // 오염물질 로딩
  useEffect(() => {
    const fetchPollutants = async () => {
      try {
        const res = await getPollutants();
        if (res.status && res.data) {
          setPollutants(res.data);
        }
      } catch (e) {
        console.error(e);
        alert("측정물질 목록을 불러오는데 실패했습니다.");
      } 
    };

    fetchPollutants();
  }, []);

  const addMeasurement = () => {
    setMeasurements((prev) => [
      ...prev,
      { id: crypto.randomUUID(), pollutantId: null, cycle: "MONTHLY_1", allowance: "" },
    ]);
  };

  const removeMeasurement = (id: string) => {
    if (measurements.length === 1) {
      alert("최소 1개의 측정물질 항목이 필요합니다.");
      return;
    }
    setMeasurements((prev) => prev.filter((m) => m.id !== id));
  };

  const updateMeasurement = (
    id: string,
    field: keyof MeasurementItem,
    value: string | number | Cycle | null
  ) => {
    setMeasurements((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const valid = measurements.filter((m) => m.pollutantId !== null);
    if (valid.length === 0) {
      alert("최소 1개 이상의 측정물질을 선택해주세요.");
      return;
    }

    const ids = valid.map((m) => m.pollutantId);
    if (new Set(ids).size !== ids.length) {
      alert("중복된 측정물질이 있습니다.");
      return;
    }

    setIsSubmitting(true);
    try {
      const results = await Promise.all(
        valid.map((m) =>
          registerStackMeasurement({
            stackId,
            pollutantId: m.pollutantId!,
            cycle: m.cycle,
            allowance: m.allowance === "" ? "" : m.allowance,
          })
        )
      );

      if (results.some((r) => !r.status)) {
        alert("일부 측정물질 등록에 실패했습니다.");
        return;
      }

      alert(`${valid.length}개의 측정물질이 등록되었습니다.`);
      onSuccess();
      onClose();
    } catch (e) {
      console.error(e);
      alert("등록 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">측정물질 추가</h2>
          <IconButton
            icon={<X />}
            title="닫기"
            variant="ghost"
            size="md"
            onClick={onClose}
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {measurements.map((measurement, index) => (
            <div key={measurement.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-700">
                  측정물질 #{index + 1}
                </h3>
                {measurements.length > 1 && (
                  <IconButton
                    icon={<Trash2 />}
                    title="삭제"
                    variant="danger"
                    size="sm"
                    onClick={() => removeMeasurement(measurement.id)}
                  />
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* 측정물질 선택 */}
                <SelectField
                  id={`pollutant-${measurement.id}`}
                  label="측정물질"
                  required
                  value={measurement.pollutantId}
                  options={pollutants}
                  disabled={isSubmitting}
                  getOptionLabel={(p) =>
                    `${p.nameKr}${p.nameEn ? ` (${p.nameEn})` : ""}`
                  }
                  getOptionValue={(p) => p.id}
                  onChange={(value) =>
                    updateMeasurement(measurement.id, "pollutantId", value)
                  }
                />

                {/* 측정 주기 */}
                <SelectField
                  id={`cycle-${measurement.id}`}
                  label="측정 주기"
                  required
                  value={measurement.cycle}
                  disabled={isSubmitting}
                  options={cycleOptions}

                  getOptionLabel={(c) => CYCLE_LABELS[c]}
                  getOptionValue={(c) => c}
                  
                  onChange={(value) =>
                    updateMeasurement(measurement.id, "cycle", value)
                  }
                />

                {/* 허용기준 */}
                <InputField
                  label="허용기준"
                  type="number"
                  value={measurement.allowance}
                  step={0.1}
                  min={0}
                  onChange={(value) =>
                    updateMeasurement(measurement.id, "allowance", value)
                  }
                />
              </div>
            </div>
          ))}

          <InlineAddButton
            label="측정물질 추가"
            onClick={addMeasurement}
            disabled={isSubmitting}
          />

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              label="취소"
              variant="secondary"
              width="full"
              onClick={onClose}
              disabled={isSubmitting}
            />
            <Button
              type="submit"
              label="등록"
              variant="primary"
              width="full"
              disabled={isSubmitting}
            />
          </div>
        </form>
      </div>
    </div>
  );
};