import { EquipType } from "@equipment/model";
import {
  ParticleSamplerSpecForm,
  GasSamplerSpecForm,
  NozzleSpecForm,
  PitotTubeSpecForm
} from "@equipment/ui";

interface EquipmentSpecFieldsProps {
  type: EquipType;
  spec: unknown;
  isSubmitting: boolean;

  onSpecChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >;
  addCoefficient: () => void;
  updateCoefficient: (idx: number, key: 'velocity' | 'coefficient', value: number) => void;
  removeCoefficient: (idx: number) => void;

  addNozzleDiameter: () => void;
  updateNozzleDiameter: (idx: number, value: number) => void;
  removeNozzleDiameter: (idx: number) => void;
}

export const EquipmentSpecFields = (props: EquipmentSpecFieldsProps) => {
  switch (props.type) {
    case EquipType.PARTICLE_SAMPLER:
      return <ParticleSamplerSpecForm {...props} />;

    case EquipType.GAS_SAMPLER:
      return <GasSamplerSpecForm {...props} />;

    case EquipType.PITOT_TUBE:
      return <PitotTubeSpecForm {...props} />;

    case EquipType.NOZZLE:
      return <NozzleSpecForm {...props} />;

    default:
      return null;
  }
};