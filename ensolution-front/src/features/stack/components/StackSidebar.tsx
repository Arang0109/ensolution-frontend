import { useNavigate } from 'react-router-dom';
import { formatDateTime } from '@/common/utils/formatters';

interface StackSidebarProps {
  preventionCount: number;
  facilityCount: number;
  targetCount: number;
  modifiedAt: Date | string;
  workplaceId: number;
}

export const StackSidebar = ({
  preventionCount,
  facilityCount,
  targetCount,
  modifiedAt,
  workplaceId,
}: StackSidebarProps) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* 통계 */}
      <div className="bg-white border border-sand-200 rounded-lg p-6 shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-brown-900">통계</h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-brown-600">방지시설 수</span>
            <span className="text-lg font-bold text-brown-700">{preventionCount}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-brown-600">배출시설 수</span>
            <span className="text-lg font-bold text-brown-700">{facilityCount}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-brown-600">제거대상물질 수</span>
            <span className="text-lg font-bold text-terracotta-600">{targetCount}</span>
          </div>
        </div>
      </div>

      {/* 최근 수정 */}
      <div className="bg-white border border-sand-200 rounded-lg p-6 shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-brown-900">최근 수정</h2>
        <p className="text-sm text-gray-600">
          {formatDateTime(modifiedAt)}
        </p>
      </div>

      {/* 사업장 정보 */}
      <div className="bg-white border border-sand-200 rounded-lg p-6 shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-brown-900">사업장 정보</h2>
        <button
          onClick={() => navigate(`/workplace/${workplaceId}`)}
          className="w-full px-4 py-2 bg-gradient-to-r from-brown-500 to-brown-600 text-white rounded-lg hover:from-brown-600 hover:to-brown-700 transition-colors text-sm shadow-md"
        >
          사업장 상세 보기
        </button>
      </div>
    </div>
  );
};
