interface CompanySidebarProps {
  workplaceNum: number;
  modifiedAt: string;
}

export const CompanySidebar = ({
  workplaceNum,
  modifiedAt
}: CompanySidebarProps) => {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-sand-200 rounded-lg p-6 shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-brown-900">통계</h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-brown-600">사업장 수</span>
            <span className="text-lg font-bold text-brown-700">{workplaceNum}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-brown-600">총 측정 건수</span>
            <span className="text-lg font-bold text-brown-700">-</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-brown-600">진행 중인 측정</span>
            <span className="text-lg font-bold text-terracotta-600">-</span>
          </div>
        </div>
      </div>

      <div className="bg-white border border-sand-200 rounded-lg p-6 shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-brown-900">최근 수정</h2>
        <p className="text-sm text-gray-600">
          {modifiedAt}
        </p>
      </div>
    </div>
  );
}