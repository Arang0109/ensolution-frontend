import { useState } from "react";

import { useVehicles, useVehicleActions } from "@agency/hooks";
import { VehicleListCard } from "@agency/components/VehicleListCard";

export const VehicleListPage = () => {
  const { vehicles, loading, refetch } = useVehicles();
  const { handleEdit, handleDelete } = useVehicleActions(refetch);
  const [showAddModal, setShowAddModal] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">차량 관리</h1>
          <p className="text-gray-600 mt-1">총 {vehicles.length}대의 차량이 등록되어 있습니다.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-gradient-to-r from-brown-500 to-brown-600 text-white rounded-lg hover:from-brown-600 hover:to-brown-700 transition-colors flex items-center gap-2 shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          차량 추가
        </button>
      </div>

      <VehicleListCard
        vehicles={vehicles}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* TODO: 차량 추가 모달 구현 */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">차량 추가</h2>
            <p className="text-gray-600 mb-4">차량 추가 기능은 추후 구현 예정입니다.</p>
            <button
              onClick={() => setShowAddModal(false)}
              className="w-full px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
