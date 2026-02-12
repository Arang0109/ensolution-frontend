import { Modal } from "@shared/ui";
import { PollutantCreateForm } from "@pollutant/ui";

interface PollutantFormModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const PollutantCreateModal = ({
  onClose, onSuccess
}: PollutantFormModalProps) => {
  return (
    <Modal size="xl">
      <PollutantCreateForm onClose={onClose} onSuccess={onSuccess} />
    </Modal>
  );
};
