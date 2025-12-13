import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useWorkplaces } from "@workplace/hooks/useWorkplaces";

import { GRADE_LABELS } from '@/common/constants';

export const WorkplaceListPage = () => {
  const navigate = useNavigate();
  const { workplaces, loading } = useWorkplaces();
  const [showAddModal, setShowAddModal] = useState(false);

  const handleClick = (id: number) => {
    navigate(`/workplace/${id}`);
  };

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
        <h1 className="text-3xl font-bold text-gray-800">측정대상 사업장</h1>
      </div>

      {/* Workplace List */}
      {workplaces.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">등록된 사업장이 없습니다.</p>
          <p className="text-gray-400 text-sm mt-2">
            사업장 추가 버튼을 눌러 새로운 사업장을 등록하세요.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {workplaces.map((w) => (
            <div
              key={w.id}
              onClick={() => handleClick(w.id)}
              className="bg-white border border-sand-200 rounded-lg p-5 hover:shadow-lg hover:border-brown-400 transition-all cursor-pointer"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold text-gray-800">{w.name}</h3>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  ID: {w.id}
                </span>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="line-clamp-1">{w.address}</span>
                </div>

                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>사업자번호: {w.bizNumber}</span>
                </div>

                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>업종: {w.businessCategory}</span>
                </div>

                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="px-2 py-0.5 rounded bg-brown-100 text-brown-800">
                    사업장 규모: {GRADE_LABELS[w.grade] ?? w.grade}</span>
                </div>

                {w.remark && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-gray-500 text-xs line-clamp-2">{w.remark}</p>
                  </div>
                )}
              </div>

              <div className="mt-4 text-xs text-gray-400">
                등록일: {new Date(w.createdAt).toLocaleDateString("ko-KR")}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Workplace Modal Placeholder */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4">사업장 추가</h2>
            <p className="text-gray-600 mb-4">추가 폼이 여기에 구현됩니다.</p>

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
