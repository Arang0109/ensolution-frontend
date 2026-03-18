import { Modal } from "@shared/ui";
import { MeasurementEditContent } from "@stack/component";
import type { StackMeasurementResponse } from "@/entities/stack/model";

interface StackMeasurementEditModalProps {
  measurement: StackMeasurementResponse;
  onClose: () => void;
  onSuccess: () => void;
}

export const MeasurementEditModal = ({ measurement, onClose, onSuccess }: StackMeasurementEditModalProps) => {
  return (
    <Modal>
      <MeasurementEditContent onClose={onClose} onSuccess={onSuccess} measurement={measurement} />
    </Modal>
  )
};
