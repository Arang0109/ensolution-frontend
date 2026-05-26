import { Modal } from "@shared/ui";
import { CompanyCreateContent } from "@/features/company/components";

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