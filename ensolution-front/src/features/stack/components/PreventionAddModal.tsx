import { useState } from "react";
import { registerPrevention } from "@stack/api/preventionApi";
import type {
  FacilityForm,
  TargetForm,
} from "@stack/model";

interface PreventionAddModalProps {
  stackId: number;
  onClose: () => void;
  onSuccess: () => void;
}

export const PreventionAddModal = ({ stackId, onClose, onSuccess }: PreventionAddModalProps) => {
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
      removalEfficiency: 0,
    },
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePreventionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "name") {
      setPreventionName(value);
    } else if (name === "remark") {
      setPreventionRemark(value);
    }
  };

  const handleFacilityChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFacilities((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [name]: value };
      return updated;
    });
  };

  const handleTargetChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setTargets((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [name]: name === "removalEfficiency" ? Number(value) : value,
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
        removalEfficiency: 0,
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
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            disabled={isSubmitting}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 방지시설 정보 */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">방지시설 정보</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  방지시설명 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={preventionName}
                  onChange={handlePreventionChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500 focus:border-transparent"
                  placeholder="방지시설명을 입력하세요"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="remark" className="block text-sm font-medium text-gray-700 mb-1">
                  비고
                </label>
                <textarea
                  id="remark"
                  name="remark"
                  value={preventionRemark}
                  onChange={handlePreventionChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500 focus:border-transparent resize-none"
                  placeholder="추가 정보를 입력하세요 (선택사항)"
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>

          {/* 배출시설 정보 */}
          <div className="border-b pb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">배출시설</h3>
              <button
                type="button"
                onClick={addFacility}
                className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
                disabled={isSubmitting}
              >
                + 배출시설 추가
              </button>
            </div>

            <div className="space-y-4">
              {facilities.map((facility, index) => (
                <div key={index} className="border rounded-lg p-4 bg-gray-50 relative">
                  {facilities.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFacility(index)}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                      disabled={isSubmitting}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        배출시설명
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={facility.name}
                        onChange={(e) => handleFacilityChange(index, e)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
                        placeholder="배출시설명"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        연료사용량
                      </label>
                      <input
                        type="text"
                        name="fuelUsage"
                        value={facility.fuelUsage}
                        onChange={(e) => handleFacilityChange(index, e)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
                        placeholder="연료사용량"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        제품생산량
                      </label>
                      <input
                        type="text"
                        name="itemOutput"
                        value={facility.itemOutput}
                        onChange={(e) => handleFacilityChange(index, e)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
                        placeholder="제품생산량"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        연료투입량
                      </label>
                      <input
                        type="text"
                        name="fuelInput"
                        value={facility.fuelInput}
                        onChange={(e) => handleFacilityChange(index, e)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
                        placeholder="연료투입량"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        연료종류
                      </label>
                      <input
                        type="text"
                        name="fuelType"
                        value={facility.fuelType}
                        onChange={(e) => handleFacilityChange(index, e)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
                        placeholder="연료종류"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        비고
                      </label>
                      <input
                        type="text"
                        name="remark"
                        value={facility.remark}
                        onChange={(e) => handleFacilityChange(index, e)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
                        placeholder="비고"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 제거대상물질 정보 */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">제거대상물질</h3>
              <button
                type="button"
                onClick={addTarget}
                className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
                disabled={isSubmitting}
              >
                + 제거대상물질 추가
              </button>
            </div>

            <div className="space-y-3">
              {targets.map((target, index) => (
                <div key={index} className="border rounded-lg p-4 bg-gray-50 relative">
                  {targets.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTarget(index)}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                      disabled={isSubmitting}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        제거대상물질
                      </label>
                      <input
                        type="text"
                        name="targetSubstance"
                        value={target.targetSubstance}
                        onChange={(e) => handleTargetChange(index, e)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
                        placeholder="제거대상물질"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        제거효율 (%)
                      </label>
                      <input
                        type="number"
                        name="removalEfficiency"
                        value={target.removalEfficiency}
                        onChange={(e) => handleTargetChange(index, e)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
                        placeholder="제거효율"
                        min="0"
                        max="100"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 버튼 */}
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
              className="flex-1 px-4 py-2 bg-gradient-to-r from-brown-500 to-brown-600 text-white rounded-lg hover:from-brown-600 hover:to-brown-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? "등록 중..." : "등록"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
