export const ClientSummary = () => {

  return (
    <div className="w-full max-w-7xl mx-auto px-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">고객 요약</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* 고객 카드 예시 */}
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-700">총 고객 수</h3>
          <p className="text-2xl font-bold text-primary-500">1,234</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-700">활성 고객 수</h3>
          <p className="text-2xl font-bold text-primary-500">890</p>
        </div>
      </div>
    </div>
  );
};