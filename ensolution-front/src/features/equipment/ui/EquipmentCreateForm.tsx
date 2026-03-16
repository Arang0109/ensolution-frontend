import { useToast } from "@app/providers/toast";

import { EquipType, EQUIP_TYPE_OPTIONS } from '@equipment/model';
import { useEquipmentForm } from "@equipment/hooks";
import type { ParticleSamplerSpec, GasSamplerSpec, PitotTubeSpec, NozzleSpec } from '@equipment/model';
import {
  ParticleSamplerSpecForm,
  GasSamplerSpecForm,
  PitotTubeSpecForm,
  NozzleSpecForm
} from '@equipment/ui';

import { Button, IconButton, InputField, SelectField, TextAreaField } from "@shared/ui";
import { X } from "lucide-react";

interface EquipmentCreateFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const EquipmentCreateForm = ({
  onClose,
  onSuccess
}: EquipmentCreateFormProps) => {
  const { showToast } = useToast();

  const {
    form,
    isSubmitting,
    onChange,
    onSpecChange,
    onSubmit,
    addCoefficient,
    updateCoefficient,
    removeCoefficient,
    addNozzleDiameter,
    updateNozzleDiameter,
    removeNozzleDiameter,
  } = useEquipmentForm();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const result = await onSubmit();

    if (result?.success) {
      showToast('측정장비가 등록되었습니다.','success');
      onSuccess();
      onClose();
    } else {
      showToast(result?.message ?? '측정장비 등록 중 오류가 발생했습니다.','error');
    }
  };

  const preventEnterSubmit = (
    e: React.KeyboardEvent
  ) => {
    if (e.key === "Enter") e.preventDefault();
  };

  const renderSpecFields = () => {
    switch (form.type) {
      case EquipType.PARTICLE_SAMPLER: {
        const spec = form.spec as ParticleSamplerSpec;
        return (
          <ParticleSamplerSpecForm
            spec={spec}
            isSubmitting={isSubmitting}
            onSpecChange={onSpecChange}
          />
        );
      }
      case EquipType.GAS_SAMPLER: {
        const spec = form.spec as GasSamplerSpec;
        return (
          <GasSamplerSpecForm
            spec={spec}
            isSubmitting={isSubmitting}
            onSpecChange={onSpecChange}
          />
        );
      }
      case EquipType.PITOT_TUBE: {
        const spec = form.spec as PitotTubeSpec;
        return (
          <PitotTubeSpecForm
            spec={spec}
            isSubmitting={isSubmitting}
            onSpecChange={onSpecChange}
            addCoefficient={addCoefficient}
            updateCoefficient={updateCoefficient}
            removeCoefficient={removeCoefficient}
          />
        );
      }
      case EquipType.NOZZLE: {
        const spec = form.spec as NozzleSpec;
        return (
          <NozzleSpecForm
            spec={spec}
            isSubmitting={isSubmitting}
            addNozzleDiameter={addNozzleDiameter}
            updateNozzleDiameter={updateNozzleDiameter}
            removeNozzleDiameter={removeNozzleDiameter}
          />
        );
      }
      case EquipType.OTHER:
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">장비 추가</h2>
        <IconButton
          icon={<X />}
          title="닫기"
          size="md"
          onClick={onClose}
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" onKeyDown={preventEnterSubmit}>
        {/* 장비 타입 선택 */}
        <SelectField
          id="type"
          label="장비타입"
          name="type"
          value={form.type}
          options={EQUIP_TYPE_OPTIONS}
          getOptionLabel={(v) => v.label}
          getOptionValue={(v) => v.value}
          onChange={(value) => onChange("type", value, "text")}
          disabled={isSubmitting}
          required
        />
        {/* 기본 정보 */}
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="장비명"
            name="equipmentName"
            value={form.equipmentName}
            onChange={(value) => onChange("equipmentName", value, "text")}
            placeholder="장비명을 입력하세요"
            disabled={isSubmitting}
            required
          />
          <InputField
            label="모델명"
            name="modelName"
            value={form.modelName}
            onChange={(value) => onChange("modelName", value, "text")}
            disabled={isSubmitting}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="관리번호"
            name="managementNumber"
            value={form.managementNumber}
            onChange={(value) => onChange("managementNumber", value, "text")}
            placeholder="Aa-000-000"
            disabled={isSubmitting}
          />
          <InputField
            label="시리얼번호"
            name="serialNumber"
            value={form.serialNumber}
            onChange={(value) => onChange("serialNumber", value, "text")}
            disabled={isSubmitting}
          />
        </div>
        <InputField
            label="별칭"
            name="alias"
            value={form.alias}
            onChange={(value) => onChange("alias", value, "text")}
            placeholder="별칭 (선택사항)"
            disabled={isSubmitting}
          />
        <div className="grid grid-cols-2 gap-4">
          
          <InputField
            label="제조사"
            name="manufacturer"
            value={form.manufacturer}
            onChange={(value) => onChange("manufacturer", value, "text")}
            disabled={isSubmitting}
          />
          <InputField
            label="제조국가"
            name="originCountry"
            value={form.originCountry}
            onChange={(value) => onChange("originCountry", value, "text")}
            disabled={isSubmitting}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="가격 (원)"
            type="number"
            id="price"
            name="price"
            value={form.price}
            onChange={(value) => onChange("price", String(value), "number")}
            disabled={isSubmitting}
          />
          <InputField
            label="구매일"
            type="date"
            name="purchaseDate"
            value={form.purchaseDate}
            onChange={(value) => onChange("purchaseDate", value, "date")}
            disabled={isSubmitting}
          />
        </div>
        <InputField
          label="교정 주기 (개월)"
          type="number"
          id="calibrationCycle"
          name="calibrationCycle"
          value={form.calibrationCycle}
          onChange={(value) => onChange("calibrationCycle", String(value), "number")}
          disabled={isSubmitting}
        />

        {/* 타입별 스펙 필드 */}
        {renderSpecFields()}

        <TextAreaField
          label="비고"
          value={form.remark}
          onChange={(v) => onChange("remark", v, "text")}
          placeholder="추가 정보를 입력하세요 (선택사항)"
          disabled={isSubmitting}
        />

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