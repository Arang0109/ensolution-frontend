import { useNavigate } from 'react-router-dom';

interface DetailPageHeaderProps {
  title: string;
  isDeleting: boolean;
  onDelete: () => void;
  backUrl?: string;
}

export const DetailPageHeader = ({
  title,
  isDeleting,
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
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-gray-900 leading-tight">
            {title}
          </h1>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onDelete}
          disabled={isDeleting}
          className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isDeleting ? '삭제 중...' : '삭제'}
        </button>
      </div>
    </div>
  );
};