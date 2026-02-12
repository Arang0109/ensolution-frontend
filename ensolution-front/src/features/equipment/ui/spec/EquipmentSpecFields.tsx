import type { EquipType, ParticleSamplerSpec, GasSamplerSpec, PitotTubeSpec, NozzleSpec } from "@equipment/model";
import { EquipType as EquipTypeConst } from "@equipment/model";
import {
  ParticleSamplerSpecForm,
  GasSamplerSpecForm,
  NozzleSpecForm,
  PitotTubeSpecForm
} from "@equipment/ui";

import type { FieldType } from "@shared/model";

interface EquipmentSpecFieldsProps {
  type: EquipType;
  spec: unknown;
  isSubmitting: boolean;

  onSpecChange: (name: string, value: string, type: FieldType) => void;
  addCoefficient: () => void;
  updateCoefficient: (idx: number, key: 'velocity' | 'coefficient', value: number) => void;
  removeCoefficient: (idx: number) => void;

  addNozzleDiameter: () => void;
  updateNozzleDiameter: (idx: number, value: number) => void;
  removeNozzleDiameter: (idx: number) => void;
}

export const EquipmentSpecFields = (props: EquipmentSpecFieldsProps) => {
  switch (props.type) {
    case EquipTypeConst.PARTICLE_SAMPLER:
      return (
        <ParticleSamplerSpecForm
          spec={props.spec as ParticleSamplerSpec}
          isSubmitting={props.isSubmitting}
          onSpecChange={props.onSpecChange}
        />
      );

    case EquipTypeConst.GAS_SAMPLER:
      return (
        <GasSamplerSpecForm
          spec={props.spec as GasSamplerSpec}
          isSubmitting={props.isSubmitting}
          onSpecChange={props.onSpecChange}
        />
      );

    case EquipTypeConst.PITOT_TUBE:
      return (
        <PitotTubeSpecForm
          spec={props.spec as PitotTubeSpec}
          isSubmitting={props.isSubmitting}
          onSpecChange={props.onSpecChange}
          addCoefficient={props.addCoefficient}
          updateCoefficient={props.updateCoefficient}
          removeCoefficient={props.removeCoefficient}
        />
      );

    case EquipTypeConst.NOZZLE:
      return (
        <NozzleSpecForm
          spec={props.spec as NozzleSpec}
          isSubmitting={props.isSubmitting}
          addNozzleDiameter={props.addNozzleDiameter}
          updateNozzleDiameter={props.updateNozzleDiameter}
          removeNozzleDiameter={props.removeNozzleDiameter}
        />
      );

    default:
      return null;
  }
};
