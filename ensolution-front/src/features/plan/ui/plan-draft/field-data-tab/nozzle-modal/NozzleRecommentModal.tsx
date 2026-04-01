import { Modal } from "@shared/ui";
import { NozzleRecommendContent } from "./NozzleRecommendContent";
import type { MeasurementSheetEditForm, ParticleSampleEditForm } from "@/entities/plan/model";

interface RecommendItem {
  nozzle: number;
  orificeDp: number | null;
  Vm: number | null;
  Vlc: number | null;
  samplingTime: number | null;
}

interface ModalProps {
  onClose: () => void;
  onSuccess: () => void;
  recommendList: RecommendItem[];
  sheet: MeasurementSheetEditForm;
  onParticleSampleChange: (name: keyof ParticleSampleEditForm, value: string | null) => void;
}

export const NozzleRecommendModal = ({ onClose, onSuccess, recommendList, sheet, onParticleSampleChange }: ModalProps) => {
  return (
    <Modal size="xl">
      <NozzleRecommendContent
        onClose={onClose}
        onSuccess={onSuccess}
        recommendList={recommendList}
        sheet={sheet}
        onParticleSampleChange={onParticleSampleChange}
      />
    </Modal>
  );
};