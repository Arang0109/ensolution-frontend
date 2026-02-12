import type { GasSamplerSpec } from "@equipment/model";

import { InputField } from "@shared/ui";
import type { FieldType } from "@shared/model";

interface GasSamplerSpecFormProps {
  spec: GasSamplerSpec;
  isSubmitting: boolean;
  onSpecChange: (
    name: keyof GasSamplerSpec,
    value: string,
    type: FieldType
  ) => void;
}

export const GasSamplerSpecForm = ({
  spec,
  isSubmitting,
  onSpecChange
}: GasSamplerSpecFormProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-700 border-b pb-2">
        가스상 시료채취장비 스펙</h3>

      <InputField
        label="적산량 (m³)"
        type="number"
        name="totalVolume"
        value={spec.totalVolume}
        onChange={(value) => onSpecChange("totalVolume", String(value), "number")}
        disabled={isSubmitting}
      />
    </div>
  );
}
