import { useMemo, useState } from 'react';
import type { StackMeasurementResponse } from '@stack/model';
import { CYCLE_LABELS } from '@stack/model';
import type { Cycle } from '@/shared/model';
import { MeasurementEditModal } from '@stack/component';
import { Button, IconButton } from '@shared/ui';
import { Pencil } from "lucide-react";

interface StackMeasurementListCardProps {
  measurements: StackMeasurementResponse[];
  onAddMeasurement: () => void;
  onEditSuccess: () => void;
}

interface MeasurementsByCycle {
  cycle: Cycle;
  measurements: StackMeasurementResponse[];
}

export const StackMeasurementListCard = ({
  measurements,
  onAddMeasurement,
  onEditSuccess,
}: StackMeasurementListCardProps) => {
  const [editingMeasurement, setEditingMeasurement] = useState<StackMeasurementResponse | null>(null);

  // Group measurements by cycle
  const measurementsByCycle = useMemo<MeasurementsByCycle[]>(() => {
    const grouped = measurements.reduce((acc, measurement) => {
      const cycle = measurement.cycle;
      if (!acc[cycle]) {
        acc[cycle] = [];
      }
      acc[cycle].push(measurement);
      return acc;
    }, {} as Record<Cycle, StackMeasurementResponse[]>);

    // Convert to array and sort by cycle frequency (most frequent first)
    const cycleOrder: Cycle[] = ['MONTHLY_2', 'MONTHLY_1', 'BIMONTHLY', 'QUARTERLY', 'SEMI_ANNUAL', 'ANNUAL'];

    return cycleOrder
      .filter(cycle => grouped[cycle])
      .map(cycle => ({
        cycle,
        measurements: grouped[cycle],
      }));
  }, [measurements]);

  if (measurements.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-neutral-900">측정물질 정보</h2>
          <Button
            label="측정항목추가"
            onClick={onAddMeasurement}
            variant="primary"
            size="md"
            type="button"
          />
        </div>
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <svg
            className="w-16 h-16 mb-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p className="text-lg">등록된 측정물질이 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-neutral-900">측정물질 정보</h2>
          <span className="px-3 py-1 rounded-full bg-primary-100 text-primary-700 font-semibold text-sm">
            총 {measurements.length}개
          </span>
        </div>
        <Button
            label="측정물질추가"
            onClick={onAddMeasurement}
            variant="primary"
            size="md"
            type="button"
          />
      </div>

      <div className="space-y-6">
        {measurementsByCycle.map(({ cycle, measurements: cycleMeasurements }) => (
          <div key={cycle} className="border-l-4 border-neutral-400 pl-4">
            <div className="flex items-center gap-2 mb-3">
              <h3 className="text-lg font-bold text-neutral-800">
                {CYCLE_LABELS[cycle]}
              </h3>
              <span className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 text-xs font-medium">
                {cycleMeasurements.length}개
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {cycleMeasurements.map((measurement) => (
                <div
                  key={measurement.id}
                  className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-300 rounded-lg p-3 hover:shadow-md transition-all hover:border-neutral-400 relative group"
                >
                  {/* Edit button */}
                  <IconButton 
                    icon={<Pencil className="h-4 w-4" />}
                    title="수정"
                    variant='ghost'
                    onClick={() => setEditingMeasurement(measurement)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100"
                  />

                  <div className="space-y-2">
                    {/* Pollutant name */}
                    <div>
                      <p className="font-bold text-neutral-900 text-sm leading-tight">
                        {measurement.pollutant.nameKr}
                        {measurement.pollutant.nameEn && (
                          <span> [ {measurement.pollutant.nameEn} ]</span>
                        )}
                      </p>
                    </div>

                    {/* Allowance */}
                    <div className="pt-2 border-t border-slate-300">
                      <p className="text-xs text-gray-600">허용기준</p>
                      <p className="font-semibold text-primary-700">
                        {measurement.allowance != null
                          ? `${measurement.allowance} ${measurement.pollutant.phase === 'PARTICULATE' ? 'mg/Sm³' : 'ppm'}`
                          : "-"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingMeasurement && (
        <MeasurementEditModal
          measurement={editingMeasurement}
          onClose={() => setEditingMeasurement(null)}
          onSuccess={() => {
            onEditSuccess();
            setEditingMeasurement(null);
          }}
        />
      )}
    </div>
  );
};
