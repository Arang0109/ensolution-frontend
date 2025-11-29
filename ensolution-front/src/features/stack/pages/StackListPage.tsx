import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useStacks } from '@stack/hooks';

export const StackListPage = () => {
  const navigate = useNavigate();
  const { stacks, loading } = useStacks();
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const gradeLabel: Record<string, string> = {
    TYPE_1: "1종",
    TYPE_2: "2종",
    TYPE_3: "3종",
    TYPE_4: "4종",
    TYPE_5: "5종",
  };

  const shapeLabel: Record<string, string> = {
    CIRCULAL: "원형",
    RECTANGULAR: "사각형",
    OTHER: "기타",
  };

  const orientationLabel: Record<string, string> = {
    VERTICAL: "수직",
    HORIZONTAL: "수평",
  };

  const handleStackClick = (stackId: number) => {
    navigate(`/stack/${stackId}`);
  };

  const filteredStacks = stacks.filter((stack) =>
    stack.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stack.semsNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">측정시설</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-gradient-to-r from-brown-500 to-brown-600 text-white rounded-lg hover:from-brown-600 hover:to-brown-700 transition-colors flex items-center gap-2 shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          시설 추가
        </button>
      </div>

      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="시설명 또는 Sems 번호로 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-sand-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
        />
      </div>

      {/* Stack List */}
      {filteredStacks.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">
            {searchTerm ? '검색 결과가 없습니다.' : '등록된 측정 대상 시설이 없습니다.'}
          </p>
          {!searchTerm && (
            <p className="text-gray-400 text-sm mt-2">시설 추가 버튼을 눌러 새로운 시설을 등록하세요.</p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStacks.map((stack) => (
            <div
              key={stack.id}
              onClick={() => handleStackClick(stack.id)}
              className="bg-white border border-sand-200 rounded-lg p-5 hover:shadow-lg hover:border-brown-400 transition-all cursor-pointer"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold text-gray-800">{stack.name}</h3>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  ID: {stack.id}
                </span>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                  </svg>
                  <span>Sems 번호: {stack.semsNumber}</span>
                </div>

                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span>
                    배출시설 규모: {' '}
                    <span className="px-2 py-0.5 rounded bg-brown-100 text-brown-800">
                      {gradeLabel[stack.grade] ?? stack.grade}
                    </span>
                  </span>
                </div>

                <div className="flex gap-4 text-xs">
                  <span>높이: {stack.height}m</span>
                  <span>가로: {stack.horizontalLength}m</span>
                  <span>세로: {stack.verticalLength}m</span>
                </div>

                <div className="flex gap-4 text-xs">
                  <span>형상: {shapeLabel[stack.shape] ?? stack.shape}</span>
                  <span>방향: {orientationLabel[stack.orientation] ?? stack.orientation}</span>
                </div>

                {stack.remark && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-gray-500 text-xs line-clamp-2">{stack.remark}</p>
                  </div>
                )}
              </div>

              <div className="mt-4 text-xs text-gray-400">
                등록일: {new Date(stack.createdAt).toLocaleDateString('ko-KR')}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Stack Modal - Placeholder */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4">시설 추가</h2>
            <p className="text-gray-600 mb-4">시설 추가 폼이 여기에 구현됩니다.</p>
            <button
              onClick={() => setShowAddModal(false)}
              className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
