import { useState } from 'react';
import { patchPrevention, deletePrevention } from '@stack/api/preventionApi';
import { patchFacility, deleteFacility, registerFacility } from '@stack/api/FacilityApi';
import { patchTarget, deleteTarget, registerTarget } from '@stack/api/TargetApi';
import type {
  PreventionDetailResponse,
  PreventionUpdateRequest,
  FacilityUpdateRequest,
  FacilityRegisterRequest,
  TargetUpdateRequest,
  TargetRegisterRequest,
} from '@stack/model';

interface PreventionEditModalProps {
  preventionDetail: PreventionDetailResponse;
  onClose: () => void;
  onSuccess: () => void;
}

type TabType = 'prevention' | 'facilities' | 'targets';

interface FacilityFormData extends FacilityUpdateRequest {
  id?: number;
  isNew?: boolean;
}

interface TargetFormData extends TargetUpdateRequest {
  id?: number;
  isNew?: boolean;
}

export const PreventionEditModal = ({
  preventionDetail,
  onClose,
  onSuccess,
}: PreventionEditModalProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('prevention');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Prevention form state
  const [preventionForm, setPreventionForm] = useState<PreventionUpdateRequest>({
    name: preventionDetail.prevention.name,
    remark: preventionDetail.prevention.remark,
  });

  // Facilities form state
  const [facilities, setFacilities] = useState<FacilityFormData[]>(
    preventionDetail.facilities.map(f => ({
      id: f.id,
      name: f.name,
      fuelUsage: f.fuelUsage,
      itemOutput: f.itemOutput,
      fuelInput: f.fuelInput,
      fuelType: f.fuelType,
      remark: f.remark,
      isNew: false,
    }))
  );

  // Targets form state
  const [targets, setTargets] = useState<TargetFormData[]>(
    preventionDetail.targets.map(t => ({
      id: t.id,
      targetSubstance: t.targetSubstance,
      removalEfficiency: t.removalEfficiency,
      isNew: false,
    }))
  );

  const handlePreventionSubmit = async () => {
    try {
      setIsSubmitting(true);
      await patchPrevention(preventionDetail.prevention.id, preventionForm);
      alert('방지시설 정보가 수정되었습니다.');
      onSuccess();
    } catch (error) {
      console.error('Failed to update prevention:', error);
      alert('방지시설 수정에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFacilitySubmit = async (index: number) => {
    const facility = facilities[index];
    if (!facility) return;

    try {
      setIsSubmitting(true);
      if (facility.isNew) {
        // Create new facility
        const data: FacilityRegisterRequest = {
          preventionId: preventionDetail.prevention.id,
          name: facility.name,
          fuelUsage: facility.fuelUsage,
          itemOutput: facility.itemOutput,
          fuelInput: facility.fuelInput,
          fuelType: facility.fuelType,
          remark: facility.remark,
        };
        await registerFacility(data);
        alert('배출시설이 추가되었습니다.');
      } else if (facility.id) {
        // Update existing facility
        const data: FacilityUpdateRequest = {
          name: facility.name,
          fuelUsage: facility.fuelUsage,
          itemOutput: facility.itemOutput,
          fuelInput: facility.fuelInput,
          fuelType: facility.fuelType,
          remark: facility.remark,
        };
        await patchFacility(facility.id, data);
        alert('배출시설이 수정되었습니다.');
      }
      onSuccess();
    } catch (error) {
      console.error('Failed to save facility:', error);
      alert('배출시설 저장에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFacilityDelete = async (index: number) => {
    const facility = facilities[index];
    if (!facility) return;

    if (facility.isNew) {
      // Just remove from local state
      setFacilities(facilities.filter((_, i) => i !== index));
      return;
    }

    if (!facility.id || !confirm('이 배출시설을 삭제하시겠습니까?')) return;

    try {
      setIsSubmitting(true);
      await deleteFacility(facility.id);
      alert('배출시설이 삭제되었습니다.');
      onSuccess();
    } catch (error) {
      console.error('Failed to delete facility:', error);
      alert('배출시설 삭제에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTargetSubmit = async (index: number) => {
    const target = targets[index];
    if (!target) return;

    try {
      setIsSubmitting(true);
      if (target.isNew) {
        // Create new target
        const data: TargetRegisterRequest = {
          preventionId: preventionDetail.prevention.id,
          targetSubstance: target.targetSubstance,
          removalEfficiency: target.removalEfficiency,
        };
        await registerTarget(data);
        alert('제거대상물질이 추가되었습니다.');
      } else if (target.id) {
        // Update existing target
        const data: TargetUpdateRequest = {
          targetSubstance: target.targetSubstance,
          removalEfficiency: target.removalEfficiency,
        };
        await patchTarget(target.id, data);
        alert('제거대상물질이 수정되었습니다.');
      }
      onSuccess();
    } catch (error) {
      console.error('Failed to save target:', error);
      alert('제거대상물질 저장에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTargetDelete = async (index: number) => {
    const target = targets[index];
    if (!target) return;

    if (target.isNew) {
      // Just remove from local state
      setTargets(targets.filter((_, i) => i !== index));
      return;
    }

    if (!target.id || !confirm('이 제거대상물질을 삭제하시겠습니까?')) return;

    try {
      setIsSubmitting(true);
      await deleteTarget(target.id);
      alert('제거대상물질이 삭제되었습니다.');
      onSuccess();
    } catch (error) {
      console.error('Failed to delete target:', error);
      alert('제거대상물질 삭제에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePreventionDelete = async () => {
    if (!confirm('이 방지시설과 연관된 모든 데이터가 삭제됩니다. 계속하시겠습니까?')) {
      return;
    }

    try {
      setIsSubmitting(true);
      await deletePrevention(preventionDetail.prevention.id);
      alert('방지시설이 삭제되었습니다.');
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Failed to delete prevention:', error);
      alert('방지시설 삭제에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const addNewFacility = () => {
    setFacilities([
      ...facilities,
      {
        name: '',
        fuelUsage: '',
        itemOutput: '',
        fuelInput: '',
        fuelType: '',
        remark: '',
        isNew: true,
      },
    ]);
  };

  const addNewTarget = () => {
    setTargets([
      ...targets,
      {
        targetSubstance: '',
        removalEfficiency: 0,
        isNew: true,
      },
    ]);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-brown-50 to-sand-50">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-brown-900">
              방지시설 수정
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
              disabled={isSubmitting}
            >
              ×
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-1">{preventionDetail.prevention.name}</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 bg-gray-50 px-6">
          <button
            onClick={() => setActiveTab('prevention')}
            className={`px-4 py-3 font-medium text-sm transition-colors border-b-2 ${
              activeTab === 'prevention'
                ? 'border-brown-600 text-brown-700'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            방지시설 정보
          </button>
          <button
            onClick={() => setActiveTab('facilities')}
            className={`px-4 py-3 font-medium text-sm transition-colors border-b-2 ${
              activeTab === 'facilities'
                ? 'border-brown-600 text-brown-700'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            배출시설 ({facilities.length})
          </button>
          <button
            onClick={() => setActiveTab('targets')}
            className={`px-4 py-3 font-medium text-sm transition-colors border-b-2 ${
              activeTab === 'targets'
                ? 'border-brown-600 text-brown-700'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            제거대상물질 ({targets.length})
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Prevention Tab */}
          {activeTab === 'prevention' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  시설명 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={preventionForm.name}
                  onChange={(e) =>
                    setPreventionForm({ ...preventionForm, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-transparent"
                  placeholder="방지시설명 입력"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  비고
                </label>
                <textarea
                  value={preventionForm.remark}
                  onChange={(e) =>
                    setPreventionForm({ ...preventionForm, remark: e.target.value })
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-transparent"
                  placeholder="비고 입력"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  onClick={handlePreventionSubmit}
                  disabled={isSubmitting || !preventionForm.name.trim()}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-brown-500 to-brown-600 text-white rounded-lg hover:from-brown-600 hover:to-brown-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md"
                >
                  {isSubmitting ? '저장 중...' : '저장'}
                </button>
                <button
                  onClick={handlePreventionDelete}
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md"
                >
                  방지시설 삭제
                </button>
              </div>
            </div>
          )}

          {/* Facilities Tab */}
          {activeTab === 'facilities' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">배출시설 목록</h3>
                <button
                  onClick={addNewFacility}
                  className="px-3 py-1.5 bg-gradient-to-r from-brown-500 to-brown-600 text-white text-sm rounded-lg hover:from-brown-600 hover:to-brown-700 transition-colors shadow-md"
                >
                  + 배출시설 추가
                </button>
              </div>

              {facilities.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">등록된 배출시설이 없습니다.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {facilities.map((facility, index) => (
                    <div
                      key={facility.id || `new-${index}`}
                      className="border border-sand-200 rounded-lg p-4 bg-sand-50"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium text-gray-800">
                          {facility.isNew ? '새 배출시설' : `배출시설 #${facility.id}`}
                        </h4>
                        <button
                          onClick={() => handleFacilityDelete(index)}
                          disabled={isSubmitting}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          삭제
                        </button>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            시설명 <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={facility.name}
                            onChange={(e) => {
                              const newFacilities = [...facilities];
                              newFacilities[index] = { ...facility, name: e.target.value };
                              setFacilities(newFacilities);
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-transparent text-sm"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              연료종류
                            </label>
                            <input
                              type="text"
                              value={facility.fuelType}
                              onChange={(e) => {
                                const newFacilities = [...facilities];
                                newFacilities[index] = { ...facility, fuelType: e.target.value };
                                setFacilities(newFacilities);
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-transparent text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              연료사용량
                            </label>
                            <input
                              type="text"
                              value={facility.fuelUsage}
                              onChange={(e) => {
                                const newFacilities = [...facilities];
                                newFacilities[index] = { ...facility, fuelUsage: e.target.value };
                                setFacilities(newFacilities);
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-transparent text-sm"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              연료투입량
                            </label>
                            <input
                              type="text"
                              value={facility.fuelInput}
                              onChange={(e) => {
                                const newFacilities = [...facilities];
                                newFacilities[index] = { ...facility, fuelInput: e.target.value };
                                setFacilities(newFacilities);
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-transparent text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              제품생산량
                            </label>
                            <input
                              type="text"
                              value={facility.itemOutput}
                              onChange={(e) => {
                                const newFacilities = [...facilities];
                                newFacilities[index] = { ...facility, itemOutput: e.target.value };
                                setFacilities(newFacilities);
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-transparent text-sm"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            비고
                          </label>
                          <textarea
                            value={facility.remark}
                            onChange={(e) => {
                              const newFacilities = [...facilities];
                              newFacilities[index] = { ...facility, remark: e.target.value };
                              setFacilities(newFacilities);
                            }}
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-transparent text-sm"
                          />
                        </div>

                        <button
                          onClick={() => handleFacilitySubmit(index)}
                          disabled={isSubmitting || !facility.name.trim()}
                          className="w-full px-4 py-2 bg-gradient-to-r from-brown-500 to-brown-600 text-white rounded-lg hover:from-brown-600 hover:to-brown-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md text-sm"
                        >
                          {isSubmitting ? '저장 중...' : facility.isNew ? '추가' : '수정'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Targets Tab */}
          {activeTab === 'targets' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">제거대상물질 목록</h3>
                <button
                  onClick={addNewTarget}
                  className="px-3 py-1.5 bg-gradient-to-r from-brown-500 to-brown-600 text-white text-sm rounded-lg hover:from-brown-600 hover:to-brown-700 transition-colors shadow-md"
                >
                  + 제거대상물질 추가
                </button>
              </div>

              {targets.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">등록된 제거대상물질이 없습니다.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {targets.map((target, index) => (
                    <div
                      key={target.id || `new-${index}`}
                      className="border border-terracotta-200 rounded-lg p-4 bg-terracotta-50"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium text-gray-800">
                          {target.isNew ? '새 제거대상물질' : `제거대상물질 #${target.id}`}
                        </h4>
                        <button
                          onClick={() => handleTargetDelete(index)}
                          disabled={isSubmitting}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          삭제
                        </button>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            대상물질명 <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={target.targetSubstance}
                            onChange={(e) => {
                              const newTargets = [...targets];
                              newTargets[index] = { ...target, targetSubstance: e.target.value };
                              setTargets(newTargets);
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta-500 focus:border-transparent text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            제거효율 (%) <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            step="0.1"
                            value={target.removalEfficiency}
                            onChange={(e) => {
                              const newTargets = [...targets];
                              newTargets[index] = {
                                ...target,
                                removalEfficiency: Number(e.target.value),
                              };
                              setTargets(newTargets);
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta-500 focus:border-transparent text-sm"
                          />
                        </div>

                        <button
                          onClick={() => handleTargetSubmit(index)}
                          disabled={
                            isSubmitting ||
                            !target.targetSubstance.trim() ||
                            target.removalEfficiency < 0 ||
                            target.removalEfficiency > 100
                          }
                          className="w-full px-4 py-2 bg-gradient-to-r from-terracotta-500 to-terracotta-600 text-white rounded-lg hover:from-terracotta-600 hover:to-terracotta-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md text-sm"
                        >
                          {isSubmitting ? '저장 중...' : target.isNew ? '추가' : '수정'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            disabled={isSubmitting}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
