import { useState, useMemo, Fragment } from 'react';

import { Button } from '@common/ui';
import { Tabs } from '@common/components';
import { useEquipments } from '@equipment/hooks/useEquipments';
import { EquipmentAddModal, EquipmentEditModal } from '@equipment/components';
import { EquipType, EQUIP_TYPE_TABS, EQUIP_TYPE_LABELS, PITOT_TUBE_OPTIONS } from '@equipment/model';
import type {
  EquipmentResponse,
  ParticleSamplerSpec,
  GasSamplerSpec,
  PitotTubeSpec,
  NozzleSpec,
} from '@equipment/model';

export const EquipmentListPage = () => {
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

  return (
    <div className="px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">장비 관리</h1>
        <Button label="장비 추가" onClick={() => setShowAddModal(true)} />
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
        <EquipmentAddModal
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

interface EquipmentTableProps {
  equipments: EquipmentResponse[];
  expandedId: string | null;
  onRowClick: (equipmentId: string) => void;
  onEdit: (equipment: EquipmentResponse) => void;
}

const EquipmentTable = ({ equipments, expandedId, onRowClick, onEdit }: EquipmentTableProps) => {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="w-10 px-4 py-3"></th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              관리번호
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              모델명
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              별칭
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              제조사
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              S/N
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              최근 교정일
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              교정주기
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {equipments.map((equipment) => {
            const isExpanded = expandedId === equipment.id;
            return (
              <Fragment key={equipment.id}>
                <tr
                  onClick={() => onRowClick(equipment.id)}
                  className={`hover:bg-gray-50 cursor-pointer transition-colors ${isExpanded ? 'bg-gray-50' : ''}`}
                >
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    <svg
                      className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {equipment.managementNumber || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {equipment.modelName || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {equipment.alias || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {equipment.manufacturer || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {equipment.serialNumber || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {equipment.lastCalibrationDate || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {equipment.calibrationCycle ? `${equipment.calibrationCycle}개월` : '-'}
                  </td>
                </tr>
                {isExpanded && (
                  <tr>
                    <td colSpan={9} className="px-6 py-4 bg-gray-50">
                      <EquipmentDetailSpec equipment={equipment} onEdit={() => onEdit(equipment)} />
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

interface EquipmentDetailSpecProps {
  equipment: EquipmentResponse;
  onEdit: () => void;
}

const EquipmentDetailSpec = ({ equipment, onEdit }: EquipmentDetailSpecProps) => {
  const renderSpec = () => {
    switch (equipment.type) {
      case EquipType.PARTICLE_SAMPLER: {
        const spec = equipment.spec as ParticleSamplerSpec;
        return (
          <div className="grid grid-cols-3 gap-4">
            <div>
              <span className="text-gray-500 text-sm">적산량</span>
              <p className="font-medium">{spec?.totalVolume ?? '-'} m<sup>3</sup></p>
            </div>
            <div>
              <span className="text-gray-500 text-sm">오리피스 보정계수</span>
              <p className="font-medium">{spec?.orificeDp ?? '-'}</p>
            </div>
            <div>
              <span className="text-gray-500 text-sm">YD</span>
              <p className="font-medium">{spec?.yd ?? '-'}</p>
            </div>
          </div>
        );
      }
      case EquipType.GAS_SAMPLER: {
        const spec = equipment.spec as GasSamplerSpec;
        return (
          <div className="grid grid-cols-3 gap-4">
            <div>
              <span className="text-gray-500 text-sm">적산량</span>
              <p className="font-medium">{spec?.totalVolume ?? '-'} L</p>
            </div>
          </div>
        );
      }
      case EquipType.PITOT_TUBE: {
        const spec = equipment.spec as PitotTubeSpec;
        return (
          <div className="space-y-4">
            <div>
              <span className="text-gray-500 text-sm">피토우관 용도</span>
              <p className="font-medium">{PITOT_TUBE_OPTIONS.find(v => v.value === spec?.type)?.label ?? '-'}</p>
            </div>
            {spec?.coefficients && spec.coefficients.length > 0 && (
              <div>
                <span className="text-gray-500 text-sm">유속 별 적용되는 피토우관 계수</span>
                <div className="mt-2 grid grid-cols-4 gap-2">
                  {spec.coefficients.map((coef, idx) => (
                    <div key={idx} className="bg-white p-2 rounded border text-sm">
                      <span className="text-gray-500">Velocity.</span> {coef.velocity} <small>m/sec</small> | <span className="text-gray-500">Co.</span> {coef.coefficient}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      }
      case EquipType.NOZZLE: {
        const spec = equipment.spec as NozzleSpec;
        return (
          <div>
            <span className="text-gray-500 text-sm">노즐 직경 목록</span>
            {spec?.nozzleDiameters && spec.nozzleDiameters.length > 0 ? (
              <div className="mt-2 flex flex-wrap gap-2">
                {spec.nozzleDiameters.map((nozzle, idx) => (
                  <span key={idx} className="bg-white px-3 py-1 rounded border text-sm">
                    {nozzle.diameter} cm
                  </span>
                ))}
              </div>
            ) : (
              <p className="font-medium">-</p>
            )}
          </div>
        );
      }
      default:
        return <p className="text-gray-500">상세 스펙 정보가 없습니다.</p>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-semibold text-gray-800 mb-3">상세 스펙</h4>
          {renderSpec()}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="px-4 py-2 bg-neutral-800 text-white text-sm rounded-lg hover:bg-neutral-900 transition-colors"
        >
          수정
        </button>
      </div>

      {/* 추가 정보 */}
      <div className="pt-4 border-t border-gray-200">
        <h4 className="font-semibold text-gray-800 mb-3">추가 정보</h4>
        <div className="grid grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-gray-500">장비명</span>
            <p className="font-medium">{equipment.equipmentName || '-'}</p>
          </div>
          <div>
            <span className="text-gray-500">원산지</span>
            <p className="font-medium">{equipment.originCountry || '-'}</p>
          </div>
          <div>
            <span className="text-gray-500">가격</span>
            <p className="font-medium">{equipment.price ? `${equipment.price.toLocaleString()}원` : '-'}</p>
          </div>
          <div>
            <span className="text-gray-500">구매일</span>
            <p className="font-medium">{equipment.purchaseDate || '-'}</p>
          </div>
        </div>
        {equipment.remark && (
          <div className="mt-3">
            <span className="text-gray-500 text-sm">비고</span>
            <p className="font-medium text-sm">{equipment.remark}</p>
          </div>
        )}
      </div>
    </div>
  );
};
