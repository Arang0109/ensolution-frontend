import { Button } from "@shared/ui";

interface DetailPageHeaderProps {
  isEditMode: boolean;
  isDeleting: boolean;
  onDelete: () => void;
  onUpdate?: () => void;
  onSave?: () => void;
  onCancel?: () => void; 
}

export const EditButtonGroup = ({
  isEditMode,
  isDeleting,
  onDelete,
  onUpdate,
  onSave,
  onCancel,
}: DetailPageHeaderProps) => {
  return (
    <div className="flex gap-2">
      {isEditMode ? (
        <>
          <Button
            label="취소"
            variant="secondary"
            onClick={onCancel}
          />
          <Button
            label="저장"
            variant="primary"
            onClick={onSave}
          />
        </>
      ) : (
        <>
          <Button
            label="수정"
            variant="primary"
            onClick={onUpdate}
          />
          <Button
            label="삭제"
            variant="danger"
            onClick={onDelete}
            disabled={isDeleting}
          />
        </>
      )}
    </div>
  );
};