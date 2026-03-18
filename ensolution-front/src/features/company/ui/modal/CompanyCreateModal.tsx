import { Modal } from "@shared/ui";
import { CompanyCreateContent } from "@company/ui";

interface CompanyCreateModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const CompanyCreateModal = ({ onClose, onSuccess }: CompanyCreateModalProps) => {
  return (
    <Modal size="xl">
      <CompanyCreateContent onClose={onClose} onSuccess={onSuccess} />
    </Modal>
  );
};