import { useNavigate } from 'react-router-dom';

interface DetailPageHeaderProps {
  title: string;
  isEditMode: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
  onDelete: () => void;
  backUrl?: string;
}

export const DetailPageHeader = ({
  title,
  isEditMode,
  isUpdating,
  isDeleting,
  onEdit,
  onCancel,
  onSave,
  onDelete,
  backUrl = "/",
}: DetailPageHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(backUrl)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
      </div>

      <div className="flex gap-2">
        {isEditMode ? (
          <>
            <button
              onClick={onSave}
              disabled={isUpdating}
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUpdating ? '저장 중...' : '저장'}
            </button>

            <button
              onClick={onCancel}
              disabled={isUpdating}
              className="px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              취소
            </button>
          </>
        ) : (
          <>
            <button
              onClick={onEdit}
              className="px-4 py-2 bg-gradient-to-r from-brown-500 to-brown-600 text-white rounded-lg hover:from-brown-600 hover:to-brown-700 transition-colors shadow-md"
            >
              수정
            </button>

            <button
              onClick={onDelete}
              disabled={isDeleting}
              className="px-4 py-2 bg-gradient-to-r from-terracotta-500 to-terracotta-600 text-white rounded-lg hover:from-terracotta-600 hover:to-terracotta-700 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDeleting ? '삭제 중...' : '삭제'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};