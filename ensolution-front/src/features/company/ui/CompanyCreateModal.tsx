import { Modal } from "@shared/ui";
import { CompanyCreateForm } from "@company/ui";

interface CompanyAddModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const CompanyCreateModal = ({ onClose, onSuccess }: CompanyAddModalProps) => {
  return (
    <Modal>
      <CompanyCreateForm onClose={onClose} onSuccess={onSuccess} />
    </Modal>
  );
};