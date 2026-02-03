import type {
  EquipmentResponse,
  ParticleSamplerSpec,
  GasSamplerSpec,
  PitotTubeSpec,
  NozzleSpec,
} from '@equipment/model';
import { EquipType, PITOT_TUBE_OPTIONS } from '@equipment/model';

import { Button } from '@shared/ui';

interface EquipmentDetailSpecProps {
  equipment: EquipmentResponse;
  onEdit: () => void;
}

export const EquipmentDetailSpec = ({ equipment, onEdit }: EquipmentDetailSpecProps) => {
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
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Button label="수정" onClick={onEdit} />
        </div>
      </div>

      {/* 추가 정보 */}
      <div className="pt-4 border-t border-gray-200">
        <h4 className="font-semibold text-gray-800 mb-3">추가 정보</h4>
        <div>
          <span className="text-gray-500">장비명</span>
          <p className="font-medium">{equipment.equipmentName || '-'}</p>
        </div>
        <div className="grid grid-cols-3 gap-4 text-sm">
          
          <div>
            <span className="text-gray-500">제조국가</span>
            <p className="font-medium">{equipment.originCountry || '-'}</p>
          </div>
          <div>
            <span className="text-gray-500">구입가격</span>
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