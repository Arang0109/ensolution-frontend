import { useState, useMemo } from 'react';

import { useEquipments } from '@equipment/hooks/useEquipments';
import { EquipmentCreateModal, EquipmentEditModal, EquipmentTable } from '@equipment/ui';
import { EquipType, EQUIP_TYPE_TABS, EQUIP_TYPE_LABELS } from '@entities/agency/equipment/model';
import type {
  EquipmentResponse,
} from '@entities/agency/equipment/model';

import { Button, Tabs, Breadcrumbs } from '@shared/ui';

export const EquipmentPage = () => {
  const { equipments, loading, refetch } = useEquipments();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editEquipment, setEditEquipment] = useState<EquipmentResponse | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>(EquipType.PARTICLE_SAMPLER);

  const filteredEquipments = useMemo(() => {
    return equipments.filter((eq) => eq.type === activeTab);
  }, [equipments, activeTab]);

  const handleRowClick = (equipmentId: string) => {
    setExpandedId(expandedId === equipmentId ? null : equipmentId);
  };

  const handleEdit = (equipment: EquipmentResponse) => {
    setEditEquipment(equipment);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">로딩 중...</div>
      </div>
    );
  }

  const breadcrumbsContents = [
    {title: "대시보드", path: "/dashboard"},
    {title: "측정장비", path: "/equipment"},
  ]

  return (
    <div className="px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-2">
        <Breadcrumbs
          contents={breadcrumbsContents}
        />

        <Button
          label="장비 추가"
          onClick={() => setShowAddModal(true)}
          variant="primary"
          size="md"
          type="button"
        />
      </div>

      {/* Tabs */}
      <Tabs
        tabs={EQUIP_TYPE_TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Equipment Table */}
      <div className="mt-6">
        {filteredEquipments.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500 text-lg">
              등록된 {EQUIP_TYPE_LABELS[activeTab as EquipType]} 장비가 없습니다.
            </p>
            <p className="text-gray-400 text-sm mt-2">
              장비 추가 버튼을 눌러 새로운 장비를 등록하세요.
            </p>
          </div>
        ) : (
          <EquipmentTable
            equipments={filteredEquipments}
            expandedId={expandedId}
            onRowClick={handleRowClick}
            onEdit={handleEdit}
          />
        )}
      </div>

      {/* Add Equipment Modal */}
      {showAddModal && (
        <EquipmentCreateModal
          onClose={() => setShowAddModal(false)}
          onSuccess={() => refetch()}
        />
      )}

      {/* Edit Equipment Modal */}
      {editEquipment && (
        <EquipmentEditModal
          equipment={editEquipment}
          onClose={() => setEditEquipment(null)}
          onSuccess={() => refetch()}
        />
      )}
    </div>
  );
};