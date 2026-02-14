import { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";

import { registerPrevention } from "@stack/api";
import type { FacilityForm, TargetForm } from "@stack/model";

import { IconButton, Button, InputField, TextAreaField } from "@shared/ui";

interface PreventionCreateModalProps {
  stackId: number;
  onClose: () => void;
  onSuccess: () => void;
}

export const PreventionCreateModal = ({ stackId, onClose, onSuccess }: PreventionCreateModalProps) => {
  const [preventionName, setPreventionName] = useState("");
  const [preventionRemark, setPreventionRemark] = useState("");

  const [facilities, setFacilities] = useState<FacilityForm[]>([
    {
      name: "",
      fuelUsage: "",
      itemOutput: "",
      fuelInput: "",
      fuelType: "",
      remark: "",
    },
  ]);

  const [targets, setTargets] = useState<TargetForm[]>([
    {
      targetSubstance: "",
      removalEfficiency: null,
    },
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePreventionChange = (
    name: string,
    value: string,
  ) => {
    if (name === "name") {
      setPreventionName(value);
    } else if (name === "remark") {
      setPreventionRemark(value);
    }
  };

  const handleFacilityChange = (
    index: number,
    name: string,
    value: string,
  ) => {
    setFacilities((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [name]: value };
      return updated;
    });
  };

  const handleTargetChange = (
    index: number,
    name: string,
    value: string,
  ) => {
    setTargets((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [name]: name === "removalEfficiency"
          ? (value === "" ? null : Number(value))
          : value,
      };
      return updated;
    });
  };

  const addFacility = () => {
    setFacilities((prev) => [
      ...prev,
      {
        name: "",
        fuelUsage: "",
        itemOutput: "",
        fuelInput: "",
        fuelType: "",
        remark: "",
      },
    ]);
  };

  const removeFacility = (index: number) => {
    setFacilities((prev) => prev.filter((_, i) => i !== index));
  };

  const addTarget = () => {
    setTargets((prev) => [
      ...prev,
      {
        targetSubstance: "",
        removalEfficiency: null,
      },
    ]);
  };

  const removeTarget = (index: number) => {
    setTargets((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 유효한 배출시설 필터링 (이름이 입력된 것만)
      const validFacilities = facilities
        .filter((f) => f.name.trim() !== "")
        .map((facility) => ({
          name: facility.name,
          fuelUsage: facility.fuelUsage,
          itemOutput: facility.itemOutput,
          fuelInput: facility.fuelInput,
          fuelType: facility.fuelType,
          remark: facility.remark,
        }));

      // 유효한 제거대상물질 필터링 (물질명이 입력된 것만)
      const validTargets = targets
        .filter((t) => t.targetSubstance.trim() !== "")
        .map((target) => ({
          targetSubstance: target.targetSubstance,
          removalEfficiency: target.removalEfficiency,
        }));

      // PreventionRegisterRequest 타입에 맞게 데이터 구성
      const requestData = {
        prevention: {
          name: preventionName,
          stackId: stackId,
          remark: preventionRemark,
        },
        facilities: validFacilities,
        targets: validTargets,
      };

      const preventionRes = await registerPrevention(requestData);

      if (!preventionRes.status) {
        alert(preventionRes.message ?? "방지시설 등록 실패");
        setIsSubmitting(false);
        return;
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error("등록 중 오류:", error);
      alert("등록 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 my-8 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">방지시설 추가</h2>
          <IconButton 
            icon={<X/>}
            title="닫기"
            variant="ghost"
            onClick={onClose}
            size="md"
            className="text-gray-500 hover:text-gray-700 transition-colors"
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 방지시설 정보 */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">방지시설 정보</h3>
            <div className="space-y-4">
              <InputField
                id="name"
                label="방지시설명"
                type="text"
                name="name"
                value={preventionName}
                onChange={(value) => handlePreventionChange("name", value)}
                placeholder="방지시설명을 입력하세요"
                disabled={isSubmitting}
                required
              />
              <TextAreaField
                label="비고"
                value={preventionRemark}
                onChange={(value) => handlePreventionChange("remark", value)}
                placeholder="추가 정보를 입력하세요 (선택사항)"
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* 배출시설 정보 */}
          <div className="border-b pb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">배출시설</h3>
              <Button
                type="button"
                label="배출시설 추가"
                onClick={addFacility}
                icon={<Plus className="h-4 w-4" />}
                variant="primary"
                size="sm"
              />
            </div>

            <div className="space-y-4">
              {facilities.map((facility, index) => (
                <div key={index} className="border rounded-lg p-4 bg-gray-50 relative">
                  {facilities.length > 1 && (
                    <IconButton 
                      icon={<Trash2/>}
                      title="삭제"
                      variant="danger"
                      onClick={() => removeFacility(index)}
                      size="sm"
                      className="absolute top-2 right-2"
                    />
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                      id="name"
                      label="배출시설명"
                      type="text"
                      name="name"
                      value={facility.name}
                      onChange={(value) => handleFacilityChange(index, "name", value)}
                      placeholder="배출시설명을 입력하세요"
                      disabled={isSubmitting}
                      required
                    />
                    <InputField
                      id="fuelUsage"
                      label="연료사용량"
                      type="text"
                      name="fuelUsage"
                      value={facility.fuelUsage}
                      onChange={(value) => handleFacilityChange(index, "fuelUsage", value)}
                      placeholder="연료사용량을 입력하세요"
                      disabled={isSubmitting}
                    />
                    <InputField
                      id="itemOutput"
                      label="제품생산량"
                      type="text"
                      name="itemOutput"
                      value={facility.itemOutput}
                      onChange={(value) => handleFacilityChange(index, "itemOutput", value)}
                      placeholder="제품생산량을 입력하세요"
                      disabled={isSubmitting}
                    />
                    <InputField
                      id="fuelInput"
                      label="연료투입량"
                      type="text"
                      name="fuelInput"
                      value={facility.fuelInput}
                      onChange={(value) => handleFacilityChange(index, "fuelInput", value)}
                      placeholder="제품투입량을 입력하세요"
                      disabled={isSubmitting}
                    />
                    <InputField
                      id="fuelType"
                      label="연료종류"
                      type="text"
                      name="fuelType"
                      value={facility.fuelType}
                      onChange={(value) => handleFacilityChange(index, "fuelType", value)}
                      placeholder="연료종류를 입력하세요"
                      disabled={isSubmitting}
                    />
                  </div>
                  <TextAreaField
                      label="비고"
                      value={facility.remark}
                      onChange={(value) => handleFacilityChange(index, "remark", value)}
                      placeholder="추가 정보를 입력하세요 (선택사항)"
                      disabled={isSubmitting}
                    />
                </div>
              ))}
            </div>
          </div>

          {/* 제거대상물질 정보 */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">제거대상물질</h3>
              <Button
                type="button"
                label="제거대상물질 추가"
                onClick={addTarget}
                icon={<Plus className="h-4 w-4" />}
                variant="primary"
                size="sm"
              />
            </div>

            <div className="space-y-3">
              {targets.map((target, index) => (
                <div key={index} className="border rounded-lg p-4 bg-gray-50 relative">
                  {targets.length > 1 && (
                    <IconButton 
                      icon={<Trash2/>}
                      title="삭제"
                      variant="danger"
                      onClick={() => removeTarget(index)}
                      size="sm"
                      className="absolute top-2 right-2"
                    />
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                      id="targetSubstance"
                      label="제거대상물질"
                      type="text"
                      name="targetSubstance"
                      value={target.targetSubstance}
                      onChange={(value) => handleTargetChange(index, "targetSubstance", value)}
                      placeholder="제거대상물질을 입력하세요"
                      disabled={isSubmitting}
                      required
                    />
                    <InputField
                      id="removalEfficiency"
                      label="제거효율 (%)"
                      type="number"
                      name="removalEfficiency"
                      value={Number(target.removalEfficiency)}
                      onChange={(value) => handleTargetChange(index, "removalEfficiency", String(value))}
                      placeholder="제거효율을 입력하세요"
                      min={0}
                      max={100}
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 버튼 */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              label="취소"
              onClick={onClose}
              variant="secondary"
              disabled={isSubmitting}
              width="full"
            />
            <Button
              type="submit"
              label="등록"
              variant="primary"
              disabled={isSubmitting}
              width="full"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
