import { useTeamEditForm } from '@agency/hooks/useTeamEditForm';
import { useEquipments } from '@equipment/hooks/useEquipments';
import { EquipType, EQUIP_TYPE_LABELS } from '@equipment/model';
import { useToast } from "@app/providers/toast";

import type { TeamResponse } from '@agency/model';

interface TeamEditModalProps {
  team: TeamResponse;
  onClose: () => void;
  onSuccess: () => void;
}

export const TeamEditModal = ({ team, onClose, onSuccess }: TeamEditModalProps) => {
  const {
    form,
    isSubmitting,
    onChange,
    onSubmit,
  } = useTeamEditForm(team);
  const { showToast } = useToast();
  const { equipments } = useEquipments();

  const particleSamplers = equipments.filter(eq => eq.type === EquipType.PARTICLE_SAMPLER);
  const gasSamplers = equipments.filter(eq => eq.type === EquipType.GAS_SAMPLER);
  const pitotTubes = equipments.filter(eq => eq.type === EquipType.PITOT_TUBE);
  const nozzles = equipments.filter(eq => eq.type === EquipType.NOZZLE);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const result = await onSubmit(e);

    if (result?.success) {
      showToast('팀이 수정되었습니다.', 'success');
      onSuccess();
      onClose();
    } else {
      showToast(
        result?.message ?? '팀 수정 중 오류가 발생했습니다.',
        'error'
      );
    }
  };

  if (!form) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">팀 수정</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            disabled={isSubmitting}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 팀 이름 */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              팀 이름 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={onChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="예: 1팀"
              disabled={isSubmitting}
              required
            />
          </div>

          {/* 장비 선택 섹션 */}
          <div className="space-y-4 pt-4 border-t">
            <h3 className="text-sm font-semibold text-gray-700">장비 배정</h3>

            {/* 먼지 시료채취기 */}
            <div>
              <label htmlFor="particleSamplerId" className="block text-sm font-medium text-gray-700 mb-1">
                {EQUIP_TYPE_LABELS[EquipType.PARTICLE_SAMPLER]}
              </label>
              <select
                id="particleSamplerId"
                name="particleSamplerId"
                value={form.particleSamplerId}
                onChange={onChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                disabled={isSubmitting}
              >
                <option value="">선택 안함</option>
                {particleSamplers.map(eq => (
                  <option key={eq.id} value={eq.id}>
                    {eq.alias || eq.equipmentName} ({eq.managementNumber})
                  </option>
                ))}
              </select>
            </div>

            {/* 가스 시료채취기 */}
            <div>
              <label htmlFor="gasSamplerId" className="block text-sm font-medium text-gray-700 mb-1">
                {EQUIP_TYPE_LABELS[EquipType.GAS_SAMPLER]}
              </label>
              <select
                id="gasSamplerId"
                name="gasSamplerId"
                value={form.gasSamplerId}
                onChange={onChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                disabled={isSubmitting}
              >
                <option value="">선택 안함</option>
                {gasSamplers.map(eq => (
                  <option key={eq.id} value={eq.id}>
                    {eq.alias || eq.equipmentName} ({eq.managementNumber})
                  </option>
                ))}
              </select>
            </div>

            {/* 피토관 */}
            <div>
              <label htmlFor="pitotTubeId" className="block text-sm font-medium text-gray-700 mb-1">
                {EQUIP_TYPE_LABELS[EquipType.PITOT_TUBE]}
              </label>
              <select
                id="pitotTubeId"
                name="pitotTubeId"
                value={form.pitotTubeId}
                onChange={onChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                disabled={isSubmitting}
              >
                <option value="">선택 안함</option>
                {pitotTubes.map(eq => (
                  <option key={eq.id} value={eq.id}>
                    {eq.alias || eq.equipmentName} ({eq.managementNumber})
                  </option>
                ))}
              </select>
            </div>

            {/* 노즐 */}
            <div>
              <label htmlFor="nozzleId" className="block text-sm font-medium text-gray-700 mb-1">
                {EQUIP_TYPE_LABELS[EquipType.NOZZLE]}
              </label>
              <select
                id="nozzleId"
                name="nozzleId"
                value={form.nozzleId}
                onChange={onChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                disabled={isSubmitting}
              >
                <option value="">선택 안함</option>
                {nozzles.map(eq => (
                  <option key={eq.id} value={eq.id}>
                    {eq.alias || eq.equipmentName} ({eq.managementNumber})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              disabled={isSubmitting}
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-gradient-to-r from-neutral-800 to-neutral-900 text-white rounded-lg hover:from-neutral-900 hover:to-neutral-950 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? '수정 중...' : '수정'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
