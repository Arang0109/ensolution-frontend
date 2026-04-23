import { useTeamForm } from '@/features/agency/hooks';

import { useEquipments } from '@/features/equipment/hooks';
import { EquipType } from '@entities/agency/equipment/model';

import { useToast } from "@app/providers/toast";

import { IconButton, Button, InputField, SelectField } from '@shared/ui';
import { X } from 'lucide-react';

interface TeamCreateFormProps {
  onClose: () => void;
  onSuccess: () => void;
}
export const TeamCreateForm = ({
  onClose,
  onSuccess
}: TeamCreateFormProps) => {
  const {
    form,
    isSubmitting,
    onChange,
    onSubmit,
    resetForm,
  } = useTeamForm();
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
      showToast('팀이 등록되었습니다.', 'success');
      resetForm();
      onSuccess();
      onClose();
    } else {
      showToast(
        result?.message ?? '팀 등록 중 오류가 발생했습니다.',
        'error'
      );
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">팀 추가</h2>
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
        />
        <InputField
          label='차량번호'
          name="vehicleNumber"
          value={form.vehicleNumber}
          onChange={(value) => onChange("vehicleNumber", value)}
          disabled={isSubmitting}
        />
        <InputField
          label='사수'
          name="mentor"
          value={form.mentor}
          onChange={(value) => onChange("mentor", value)}
          disabled={isSubmitting}
        />
        <InputField
          label='부사수'
          name="mentee"
          value={form.mentee}
          onChange={(value) => onChange("mentee", value)}
          disabled={isSubmitting}
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
            getOptionLabel={(v) => v.label}
            getOptionValue={(v) => v.value}
            onChange={(value) => onChange("particleSamplerId", value)}
          />
          <SelectField
            id="gasSamplerId"
            label='가스상 시료채취장비'
            name="gasSamplerId"
            value={form.gasSamplerId}
            options={gasSamplerOptions}
            getOptionLabel={(v) => v.label}
            getOptionValue={(v) => v.value}
            onChange={(value) => onChange("gasSamplerId", value)}
          />
          <SelectField
            id="pitotTubeId"
            label='피토우관'
            name="pitotTubeId"
            value={form.pitotTubeId}
            options={pitotTubeOptions}
            getOptionLabel={(v) => v.label}
            getOptionValue={(v) => v.value}
            onChange={(value) => onChange("pitotTubeId", value)}
          />
          <SelectField
            id="nozzleId"
            label='노즐'
            name="nozzleId"
            value={form.nozzleId}
            options={nozzleOptions}
            getOptionLabel={(v) => v.label}
            getOptionValue={(v) => v.value}
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