import { Modal } from "@shared/ui";
import { CompanyCreateContent } from "@/features/company/component";

interface CompanyAddModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const CompanyCreateModal = ({ onClose, onSuccess }: CompanyAddModalProps) => {
  return (
    <Modal>
      <CompanyCreateContent onClose={onClose} onSuccess={onSuccess} />
    </Modal>
  );
};