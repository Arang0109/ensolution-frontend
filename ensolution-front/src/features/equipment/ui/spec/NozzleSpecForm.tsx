import type { NozzleSpec } from "@equipment/model";

import { InputField, Button, IconButton } from "@shared/ui";
import { Plus, X } from "lucide-react";

interface NozzleSpecFormProps {
  spec: NozzleSpec;
  isSubmitting: boolean;
  addNozzleDiameter: () => void;
  updateNozzleDiameter: (idx: number, value: number) => void;
  removeNozzleDiameter: (idx: number) => void;
}

export const NozzleSpecForm = ({
  spec,
  isSubmitting,
  addNozzleDiameter,
  updateNozzleDiameter,
  removeNozzleDiameter,
}: NozzleSpecFormProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-700 border-b pb-2">노즐 스펙</h3>
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">
            노즐 직경 목록
          </label>
          <Button
            label="추가"
            icon={<Plus />}
            onClick={addNozzleDiameter}
            size="sm"
          />
        </div>
        {spec?.nozzleDiameters && spec.nozzleDiameters.length > 0 ? (
          <div className="grid grid-cols-3 gap-2">
            {spec.nozzleDiameters.map((nozzle, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <InputField
                    label="직경"
                    type="number"
                    value={nozzle.diameter}
                    onChange={(value) => updateNozzleDiameter(idx, Number(value))}
                    placeholder="직경"
                    disabled={isSubmitting}
                    min={0.000}
                    step={0.001}
                  />
                </div>
                <span className="text-sm text-gray-500">cm</span>
                <IconButton
                  icon={<X />}
                  variant="danger"
                  title="삭제"
                  onClick={() => removeNozzleDiameter(idx)}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 py-2">등록된 노즐 직경이 없습니다. '추가' 버튼을 눌러 직경을 등록하세요.</p>
        )}
      </div>
    </div>
  );
}