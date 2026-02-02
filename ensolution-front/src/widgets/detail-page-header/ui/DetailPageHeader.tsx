import { Button } from "@shared/ui";

interface DetailPageHeaderProps {
  title: string;
  isEditMode: boolean;
  isDeleting: boolean;
  onDelete: () => void;
  onUpdate?: () => void;
  onSave?: () => void;
  onCancel?: () => void; 
  backUrl: () => void;
}

export const DetailPageHeader = ({
  title,
  isEditMode,
  isDeleting,
  onDelete,
  onUpdate,
  onSave,
  onCancel,
  backUrl,
}: DetailPageHeaderProps) => {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={backUrl}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-gray-900 leading-tight">
            {title}
          </h1>
        </div>
      </div>

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
    </div>
  );
};