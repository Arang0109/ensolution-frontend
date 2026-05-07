import { Modal } from "@shared/ui";
import { PreventionCreateContent } from "@/features/stack/component";

interface AddPreventionModalProps {
  stackId: number,
  onClose: () => void;
  onSuccess: () => void;
}

export const PreventionCreateModal = ({
  stackId,
  onClose,
  onSuccess,
}: AddPreventionModalProps) => {
  return (
    <Modal size="xl">
      <PreventionCreateContent onClose={onClose} onSuccess={onSuccess} stackId={stackId} />
    </Modal>
  );
};