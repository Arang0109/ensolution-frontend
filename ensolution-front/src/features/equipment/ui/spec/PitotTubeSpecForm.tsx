import type { PitotTubeSpec } from "@/entities/agency/equipment/model";
import { PITOT_TUBE_OPTIONS } from "@/entities/agency/equipment/model";

import { InputField, SelectField, Button, IconButton } from "@shared/ui";
import type { FieldType } from "@shared/model";
import { Plus, Trash2 } from "lucide-react";

interface PitotTubeSpecFormProps {
  spec: PitotTubeSpec;
  isSubmitting: boolean;
  onSpecChange: (
    name: keyof PitotTubeSpec,
    value: string,
    type: FieldType
  ) => void;
  addCoefficient: () => void;
  updateCoefficient: (
    idx: number,
    field: 'coefficient' | 'velocity',
    value: string
  ) => void;
  removeCoefficient: (idx: number) => void;
}

export const PitotTubeSpecForm = ({
  spec,
  isSubmitting,
  onSpecChange,
  addCoefficient,
  updateCoefficient,
  removeCoefficient
}: PitotTubeSpecFormProps) => {

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-700 border-b pb-2">
        피토우관 스펙</h3>
      <SelectField
        id="pitotTubeType"
        label="피토우관타입"
        name="pitotTubeType"
        value={spec.pitotTubeType}
        onChange={(value) => onSpecChange("pitotTubeType", value, "text")}
        disabled={isSubmitting}
        options={PITOT_TUBE_OPTIONS}
        getOptionLabel={(v) => v.label}
        getOptionValue={(v) => v.value}
      />
      <div>
        <div className="flex justify-between items-center p-3 rounded-lg">
          <label className="block text-sm font-medium text-gray-700">
            계수 목록
          </label>
          <Button
            label="추가"
            icon={<Plus />}
            onClick={addCoefficient}
            size="sm"
          />
        </div>
        {spec?.coefficients && spec.coefficients.length > 0 ? (
          <div className="space-y-2">
            {spec.coefficients.map((coef, idx) => (
              <div key={idx} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <InputField
                  label="속도 (m/s)"
                  name="number"
                  value={coef.velocity}
                  onChange={(value) => updateCoefficient(idx, 'velocity', value)}
                  disabled={isSubmitting}
                />
                <InputField
                  label="피토우관 계수"
                  name="number"
                  value={coef.coefficient}
                  onChange={(value) => updateCoefficient(idx, 'coefficient', value)}
                  disabled={isSubmitting}
                  min={0.000}
                  step={0.001}
                />
                <IconButton
                  icon={<Trash2 />}
                  title="삭제"
                  variant="danger"
                  onClick={() => removeCoefficient(idx)}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 py-2">등록된 계수가 없습니다. '추가' 버튼을 눌러 계수를 등록하세요.</p>
        )}
      </div>
    </div>
  );
}
