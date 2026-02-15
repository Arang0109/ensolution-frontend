import { useState } from 'react';
import { patchPrevention, deletePrevention } from '@stack/api/preventionApi';
import { 
  patchFacility, deleteFacility, registerFacility,
  patchTarget, deleteTarget, registerTarget
} from '@stack/api';
import {
  type PreventionDetailResponse,
  type PreventionUpdate,
  type PreventionUpdateRequest,
  type FacilityUpdateRequest,
  type FacilityRegisterRequest,
  type TargetUpdateRequest,
  type TargetRegisterRequest,
} from '@stack/model';

import { X, Plus, Trash2 } from "lucide-react";
import { PREVENTION_TABS } from "@shared/model";
import { Button, IconButton, Tabs, InputField, TextAreaField } from '@/shared/ui';

interface PreventionEditModalProps {
  preventionDetail: PreventionDetailResponse;
  onClose: () => void;
  onSuccess: () => void;
}

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
  const [activeTab, setActiveTab] = useState('PREVENTION');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Prevention form state
  const [preventionForm, setPreventionForm] = useState<PreventionUpdate>({
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
      const data: PreventionUpdateRequest = {
        prevention: preventionForm,
        facilities: facilities.map((f) => ({
          name: f.name,
          fuelUsage: f.fuelUsage,
          itemOutput: f.itemOutput,
          fuelInput: f.fuelInput,
          fuelType: f.fuelType,
          remark: f.remark,
        })),
        targets: targets.map((t) => ({
          targetSubstance: t.targetSubstance,
          removalEfficiency: t.removalEfficiency,
        })),
      };
      await patchPrevention(preventionDetail.prevention.id, data);
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
        removalEfficiency: null,
        isNew: true,
      },
    ]);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-neutral-50 to-slate-50">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-neutral-900">
              방지시설 수정
            </h2>
            <IconButton 
              icon={<X/>}
              title="닫기"
              variant="ghost"
              onClick={onClose}
              size="md"
              className="text-gray-500 hover:text-gray-700 transition-colors"
            />
          </div>
          <p className="text-sm text-gray-600 mt-1">{preventionDetail.prevention.name}</p>
        </div>

        {/* Tabs */}
        <div className="px-6">
          <Tabs
            tabs={PREVENTION_TABS}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Prevention Tab */}
          {activeTab === 'PREVENTION' && (
            <div className="space-y-4">
              <InputField
                id="name"
                label="방지시설명"
                type="text"
                name="name"
                value={preventionForm.name}
                onChange={(value) =>
                  setPreventionForm({ ...preventionForm, name: value })
                }
                placeholder="방지시설명을 입력하세요"
                disabled={isSubmitting}
                required
              />
              <TextAreaField
                label="비고"
                value={preventionForm.remark}
                onChange={(value) =>
                  setPreventionForm({ ...preventionForm, remark: value })
                }
                placeholder="추가 정보를 입력하세요 (선택사항)"
                disabled={isSubmitting}
              />
              <div className="flex gap-2 pt-4">
                <Button
                  type='button'
                  label="방지시설 삭제"
                  onClick={handlePreventionDelete}
                  disabled={isSubmitting}
                  variant="danger"
                  width='full'
                  size="sm"
                />
                <Button
                  type='button'
                  label="수정"
                  onClick={handlePreventionSubmit}
                  disabled={isSubmitting || !preventionForm.name.trim()}
                  variant="primary"
                  width='full'
                  size="sm"
                />
              </div>
            </div>
          )}

          {/* Facilities Tab */}
          {activeTab === 'FACILITY' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">배출시설 목록</h3>
                <Button
                  type="button"
                  label="배출시설 추가"
                  onClick={addNewFacility}
                  icon={<Plus className="h-4 w-4" />}
                  variant="primary"
                  size="sm"
                />
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
                      className="border border-slate-200 rounded-lg p-4 bg-slate-50"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium text-gray-800">
                          {facility.isNew ? '새 배출시설' : `배출시설 #${facility.id}`}
                        </h4>
                        <IconButton 
                          icon={<Trash2/>}
                          title="삭제"
                          variant="danger"
                          onClick={() => handleFacilityDelete(index)}
                          size="md"
                        />
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
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
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
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
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
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
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
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
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                          />
                        </div>

                        <Button
                          type="button"
                          label={isSubmitting ? '저장 중...' : facility.isNew ? '추가' : '수정'}
                          variant="primary"
                          onClick={() => handleFacilitySubmit(index)}
                          disabled={isSubmitting || !facility.name.trim()}
                          width="full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Targets Tab */}
          {activeTab === 'TARGET' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">제거대상물질 목록</h3>
                <Button
                  type="button"
                  label="제거대상물질 추가"
                  onClick={addNewTarget}
                  icon={<Plus className="h-4 w-4" />}
                  variant="primary"
                  size="sm"
                />
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
                      className="border border-primary-200 rounded-lg p-4 bg-primary-50"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium text-gray-800">
                          {target.isNew ? '새 제거대상물질' : `제거대상물질 #${target.id}`}
                        </h4>
                        <IconButton 
                          icon={<Trash2/>}
                          title="삭제"
                          variant="danger"
                          onClick={() => handleTargetDelete(index)}
                          size="md"
                        />
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            제거효율 (%)
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            step="0.1"
                            value={target.removalEfficiency ?? ""}
                            onChange={(e) => {
                              const newTargets = [...targets];
                              newTargets[index] = {
                                ...target,
                                removalEfficiency: e.target.value === "" ? null : Number(e.target.value),
                              };
                              setTargets(newTargets);
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                            placeholder="제거효율 (선택사항)"
                          />
                        </div>

                        <Button
                          type="button"
                          label={isSubmitting ? '저장 중...' : target.isNew ? '추가' : '수정'}
                          variant="primary"
                          onClick={() => handleTargetSubmit(index)}
                          disabled={
                            isSubmitting ||
                            !target.targetSubstance.trim() ||
                            (target.removalEfficiency != null && (target.removalEfficiency < 0 || target.removalEfficiency > 100))
                          }
                          width="full"
                        />
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
          <Button
            type="button"
            label="닫기"
            onClick={onClose}
            variant="secondary"
            disabled={isSubmitting}
            width="full"
          />
        </div>
      </div>
    </div>
  );
};
