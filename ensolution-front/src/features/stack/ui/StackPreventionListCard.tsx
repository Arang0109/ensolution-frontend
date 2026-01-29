import type { PreventionDetailResponse } from '@stack/model';

import { Button } from '@shared/ui';
import { formatDate } from '@/shared/lib/formatter/dateFormatter';

interface StackPreventionListCardProps {
  preventions: PreventionDetailResponse[];
  onAddPrevention: () => void;
  onPreventionClick: (prevention: PreventionDetailResponse) => void;
}

export const StackPreventionListCard = ({
  preventions,
  onAddPrevention,
  onPreventionClick,
}: StackPreventionListCardProps) => {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-neutral-900">방지시설 목록</h2>
        <Button
                    label="방지시설추가"
                    onClick={onAddPrevention}
                    variant="add"
                    size="md"
                    type="button"
                  />
      </div>

      {preventions.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">등록된 방지시설이 없습니다.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {preventions.map((preventionDetail) => (
            <div
              key={preventionDetail.prevention.id}
              onClick={() => onPreventionClick(preventionDetail)}
              className="border border-slate-200 rounded-lg p-4 hover:shadow-md hover:border-neutral-400 transition-all cursor-pointer"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-gray-800 text-lg">
                  {preventionDetail.prevention.name}
                </h3>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  ID: {preventionDetail.prevention.id}
                </span>
              </div>
              {preventionDetail.prevention.remark && (
                <p className="text-sm text-gray-600 mb-3">
                  {preventionDetail.prevention.remark}
                </p>
              )}

              {/* 배출시설 목록 */}
              <div className="mt-3 pt-3 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-neutral-800 mb-2">
                  배출시설 ({preventionDetail.facilities.length})
                </h4>
                {preventionDetail.facilities.length === 0 ? (
                  <p className="text-xs text-gray-500 italic">등록된 배출시설이 없습니다.</p>
                ) : (
                  <div className="space-y-2">
                    {preventionDetail.facilities.map((facility) => (
                      <div key={facility.id} className="bg-slate-50 rounded p-3 text-sm">
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-medium text-gray-800">{facility.name}</span>
                          <span className="text-xs text-gray-500">ID: {facility.id}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-2 text-xs text-gray-600">
                          <div>
                            <span className="font-medium">연료종류:</span> {facility.fuelType}
                          </div>
                          <div>
                            <span className="font-medium">연료사용량:</span> {facility.fuelUsage}
                          </div>
                          <div>
                            <span className="font-medium">연료투입량:</span> {facility.fuelInput}
                          </div>
                          <div>
                            <span className="font-medium">제품생산량:</span> {facility.itemOutput}
                          </div>
                        </div>
                        {facility.remark && (
                          <p className="text-xs text-gray-500 mt-2 italic">{facility.remark}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 제거대상물질 목록 */}
              <div className="mt-3 pt-3 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-neutral-800 mb-2">
                  제거대상물질 ({preventionDetail.targets.length})
                </h4>
                {preventionDetail.targets.length === 0 ? (
                  <p className="text-xs text-gray-500 italic">등록된 제거대상물질이 없습니다.</p>
                ) : (
                  <div className="space-y-2">
                    {preventionDetail.targets.map((target) => (
                      <div key={target.id} className="bg-primary-50 rounded p-3 text-sm">
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="font-medium text-gray-800">
                              {target.targetSubstance}
                            </span>
                            <span className="ml-3 text-xs">
                              <span className="font-medium text-primary-700">제거효율:</span>{' '}
                              <span className="font-semibold text-primary-800">
                                {target.removalEfficiency}%
                              </span>
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">ID: {target.id}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="text-xs text-gray-400 mt-3 pt-3 border-t border-gray-100">
                등록일: {formatDate(preventionDetail.prevention.createdAt)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
