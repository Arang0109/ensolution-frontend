import { useState } from 'react';

import { useStacks } from '@stack/hooks';
import { useSearch } from '@shared/lib';

import { WorkplaceStackListCard } from '@workplace/ui';

export const StackListPage = () => {
  const { stacks, loading } = useStacks();
  const [showAddModal, setShowAddModal] = useState(false);

  const { searchTerm, setSearchTerm, filtered: filteredStacks } = useSearch(
    stacks,
    ['name', 'semsNumber']
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
        <div className="grid grid-cols-1 gap-4">
          <WorkplaceStackListCard 
            stacks={filteredStacks}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
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
