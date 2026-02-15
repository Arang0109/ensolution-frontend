import { Modal } from "@shared/ui";
import { MeasurementCreateContent } from "@stack/component";

interface StackMeasurementCreateModalProps {
  stackId: number;
  onClose: () => void;
  onSuccess: () => void;
}

export const MeasurementCreateModal = ({ stackId, onClose, onSuccess }: StackMeasurementCreateModalProps) => {
  return (
    <Modal>
      <MeasurementCreateContent onClose={onClose} onSuccess={onSuccess} stackId={stackId} />
    </Modal>
  )

};
