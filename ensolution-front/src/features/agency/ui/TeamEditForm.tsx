import { useTeamEditForm } from '@agency/hooks';
import type { TeamResponse } from '@agency/model';

import { EquipType } from '@equipment/model';
import { useEquipments } from '@equipment/hooks';

import { useToast } from "@app/providers/toast";

import { IconButton, Button, InputField, SelectField } from '@shared/ui';
import { X } from 'lucide-react';

interface TeamEditFormProps {
  team: TeamResponse;
  onClose: () => void;
  onSuccess: () => void;
}

export const TeamEditForm = ({
  team,
  onClose,
  onSuccess
}: TeamEditFormProps) => {
  const {
    form,
    isSubmitting,
    onChange,
    onSubmit,
  } = useTeamEditForm(team);
  const { showToast } = useToast();
  const { equipments } = useEquipments();

  const particleSamplerOptions = equipments
    .filter(eq => eq.type === EquipType.PARTICLE_SAMPLER)
    .map(eq => ({
      value: eq.id,
      label: eq.alias
        ? `${eq.managementNumber} | ${eq.alias}`
        : eq.managementNumber,
    }));
  const gasSamplerOptions = equipments
    .filter(eq => eq.type === EquipType.GAS_SAMPLER)
    .map(eq => ({
      value: eq.id,
      label: eq.alias
        ? `${eq.managementNumber} | ${eq.alias}`
        : eq.managementNumber,
    }));
  const pitotTubeOptions = equipments
    .filter(eq => eq.type === EquipType.PITOT_TUBE)
    .map(eq => ({
      value: eq.id,
      label: eq.alias
        ? `${eq.managementNumber} | ${eq.alias}`
        : eq.managementNumber,
    }));
  const nozzleOptions = equipments
    .filter(eq => eq.type === EquipType.NOZZLE)
    .map(eq => ({
      value: eq.id,
      label: eq.alias
        ? `${eq.managementNumber} | ${eq.alias}`
        : eq.managementNumber,
    }));

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

  if (!form) return;

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">팀 수정</h2>
        <IconButton
          icon={<X />}
          size='md'
          onClick={onClose}
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 팀 이름 */}
        <InputField
          label='팀명'
          name="name"
          value={form.name}
          onChange={(value) => onChange("name", value)}
          disabled={isSubmitting}
          required
        />
        <InputField
          label='차량번호'
          name="vehicleNumber"
          value={form.vehicleNumber}
          onChange={(value) => onChange("vehicleNumber", value)}
          disabled={isSubmitting}
          required
        />

        {/* 장비 선택 섹션 */}
        <div className="space-y-4 pt-4 border-t">
          <h3 className="text-sm font-semibold text-gray-700">장비 배정</h3>
          <SelectField
            id="particleSamplerId"
            label='입자상 시료채취장비'
            name="particleSamplerId"
            value={form.particleSamplerId}
            options={particleSamplerOptions}
            onChange={(value) => onChange("particleSamplerId", value)}
          />
          <SelectField
            id="gasSamplerId"
            label='가스상 시료채취장비'
            name="gasSamplerId"
            value={form.gasSamplerId}
            options={gasSamplerOptions}
            onChange={(value) => onChange("gasSamplerId", value)}
          />
          <SelectField
            id="pitotTubeId"
            label='피토우관'
            name="pitotTubeId"
            value={form.pitotTubeId}
            options={pitotTubeOptions}
            onChange={(value) => onChange("pitotTubeId", value)}
          />
          <SelectField
            id="nozzleId"
            label='노즐'
            name="nozzleId"
            value={form.nozzleId}
            options={nozzleOptions}
            onChange={(value) => onChange("nozzleId", value)}
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            label="취소"
            onClick={onClose}
            variant="secondary"
            size="md"
            width="full"
            type="button"
            disabled={isSubmitting}
          />
          <Button
            label="추가"
            variant="primary"
            size="md"
            width="full"
            type="submit"
            disabled={isSubmitting}
          />
        </div>
      </form>
    </>
  );
}