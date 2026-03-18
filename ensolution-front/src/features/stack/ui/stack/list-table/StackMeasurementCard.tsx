import { useMemo, useState } from 'react';

import type { StackMeasurementResponse } from '@/entities/stack/model';
import { CYCLE_LABELS } from '@/entities/stack/model';
import { MeasurementEditModal, StackMeasurementItemCard } from '@stack/component';
import { groupMeasurementsByCycle } from '@stack/lib';

import { Button, EmptyState } from '@shared/ui';

interface StackMeasurementCardProps {
  measurements: StackMeasurementResponse[];
  onAddMeasurement: () => void;
  onEditSuccess: () => void;
}

export const StackMeasurementCard = ({
  measurements,
  onAddMeasurement,
  onEditSuccess,
}: StackMeasurementCardProps) => {
  const [editingMeasurement, setEditingMeasurement] = useState<StackMeasurementResponse | null>(null);

  const measurementsByCycle = useMemo(
    () => groupMeasurementsByCycle(measurements),
    [measurements]
  );

  return (
    <>
      <Button
        label="측정항목추가"
        onClick={onAddMeasurement}
        variant="primary"
        size="md"
        type="button"
      />
      {measurements.length === 0 ? (
        <EmptyState title='등록된 측정물질이 없습니다.' />
      ) : (
        <div className="pt-3 space-y-8">
          {measurementsByCycle.map(({ cycle, measurements: cycleMeasurements }) => (
            <div key={cycle}>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-xs md:text-ms font-bold text-neutral-800">
                  {CYCLE_LABELS[cycle]}
                </h3>
                <span className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 text-xs font-medium">
                  {cycleMeasurements.length}개
                </span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-8 xl:grid-cols-4 gap-3">
                {cycleMeasurements.map((measurement) => (
                  <StackMeasurementItemCard
                    key={measurement.id}
                    measurement={measurement}
                    onEdit={setEditingMeasurement}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
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
    </>
  );
};
