import { Modal } from "@shared/ui";
import { PreventionEditContent } from "@stack/component";

import type { PreventionDetailResponse } from "@/entities/stack/model";

interface EditPreventionModalProps {
  preventionDetail: PreventionDetailResponse;
  onClose: () => void;
  onSuccess: () => void;
}

export const PreventionEditModal = ({
  preventionDetail,
  onClose,
  onSuccess,
}: EditPreventionModalProps) => {
  return (
    <Modal size="xl">
      <PreventionEditContent preventionDetail={preventionDetail} onClose={onClose} onSuccess={onSuccess} />
    </Modal>
  );
};