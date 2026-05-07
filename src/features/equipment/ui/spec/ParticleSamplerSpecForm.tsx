import type { ParticleSamplerSpec } from "@/entities/agency/equipment/model";

import { InputField } from "@shared/ui";
import type { FieldType } from "@shared/model";

interface ParticleSamplerSpecFormProps {
  spec: ParticleSamplerSpec;
  isSubmitting: boolean;
  onSpecChange: (
    name: keyof ParticleSamplerSpec,
    value: string,
    type: FieldType
  ) => void;
}

export const ParticleSamplerSpecForm = ({
  spec,
  isSubmitting,
  onSpecChange
}: ParticleSamplerSpecFormProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-700 border-b pb-2">
        입자상 시료채취장비 스펙
      </h3>

      <InputField
        label="적산량 (m³)"
        type="number"
        name="totalVolume"
        value={spec.totalVolume}
        onChange={(value) => onSpecChange("totalVolume", String(value), "number")}
        disabled={isSubmitting}
      />
      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="오리피스관 보정계수 (△H@)"
          type="number"
          name="orificeDp"
          value={spec.orificeDp}
          onChange={(value) => onSpecChange("orificeDp", String(value), "number")}
          disabled={isSubmitting}
          min={0.0000}
          step={0.0001}
        />
        <InputField
          label="가스미터 보정계수 (Yd)"
          type="number"
          name="yd"
          value={spec.yd}
          onChange={(value) => onSpecChange("yd", String(value), "number")}
          disabled={isSubmitting}
          min={0.0000}
          step={0.0001}
        />
      </div>
    </div>
  );
};
