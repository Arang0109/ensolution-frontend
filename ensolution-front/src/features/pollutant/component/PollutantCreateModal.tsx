import { Modal } from "@shared/ui";
import { PollutantCreateContent } from "@pollutant/component";

interface PollutantFormModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const PollutantCreateModal = ({
  onClose, onSuccess
}: PollutantFormModalProps) => {
  return (
    <Modal size="xl">
      <PollutantCreateContent onClose={onClose} onSuccess={onSuccess} />
    </Modal>
  );
};
