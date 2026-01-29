import { useEquipmentForm } from '@equipment/hooks';
import { EquipType, EQUIP_TYPE_OPTIONS } from '@equipment/model';
import type { ParticleSamplerSpec, GasSamplerSpec, PitotTubeSpec, NozzleSpec } from '@equipment/model';

import { useToast } from "@app/providers/toast";

interface EquipmentAddModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const EquipmentAddModal = ({ onClose, onSuccess }: EquipmentAddModalProps) => {
  const {
    form,
    isSubmitting,
    onChange,
    onSpecChange,
    onSubmit,
    resetForm,
    addCoefficient,
    updateCoefficient,
    removeCoefficient,
    addNozzleDiameter,
    updateNozzleDiameter,
    removeNozzleDiameter,
  } = useEquipmentForm();
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const result = await onSubmit(e);

    if (result?.success) {
      showToast('장비가 등록되었습니다.', 'success');
      resetForm();
      onSuccess();
      onClose();
    } else {
      showToast(
        result?.message ?? '장비 등록 중 오류가 발생했습니다.',
        'error'
      );
    }
  };

  const renderSpecFields = () => {
    switch (form.type) {
      case EquipType.PARTICLE_SAMPLER: {
        const spec = form.spec as ParticleSamplerSpec;
        return (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-700 border-b pb-2">먼지 시료채취기 스펙</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  적산량 (m<sup>3</sup>)
                </label>
                <input
                  type="number"
                  name="totalVolume"
                  value={spec.totalVolume}
                  onChange={onSpecChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  오리피스 보정계수
                </label>
                <input
                  type="number"
                  name="orificeDp"
                  value={spec.orificeDp}
                  onChange={onSpecChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  YD
                </label>
                <input
                  type="number"
                  name="yd"
                  value={spec.yd}
                  onChange={onSpecChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>
        );
      }
      case EquipType.GAS_SAMPLER: {
        const spec = form.spec as GasSamplerSpec;
        return (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-700 border-b pb-2">가스 시료채취기 스펙</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                총 용량 (L)
              </label>
              <input
                type="number"
                name="totalVolume"
                value={spec.totalVolume}
                onChange={onSpecChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                disabled={isSubmitting}
              />
            </div>
          </div>
        );
      }
      case EquipType.PITOT_TUBE: {
        const spec = form.spec as PitotTubeSpec;
        return (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-700 border-b pb-2">피토관 스펙</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                피토관 타입
              </label>
              <input
                type="text"
                name="type"
                value={spec.type}
                onChange={onSpecChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="예: S형, L형"
                disabled={isSubmitting}
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  계수 목록
                </label>
                <button
                  type="button"
                  onClick={addCoefficient}
                  disabled={isSubmitting}
                  className="px-3 py-1 text-sm bg-neutral-800 text-white rounded hover:bg-neutral-900 transition-colors disabled:opacity-50"
                >
                  + 추가
                </button>
              </div>
              {spec?.coefficients && spec.coefficients.length > 0 ? (
                <div className="space-y-2">
                  {spec.coefficients.map((coef, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <label className="block text-xs text-gray-500 mb-1">속도</label>
                        <input
                          type="number"
                          value={coef.velocity}
                          onChange={(e) => updateCoefficient(idx, 'velocity', Number(e.target.value))}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-xs text-gray-500 mb-1">계수</label>
                        <input
                          type="number"
                          step="0.001"
                          value={coef.coefficient}
                          onChange={(e) => updateCoefficient(idx, 'coefficient', Number(e.target.value))}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                          disabled={isSubmitting}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeCoefficient(idx)}
                        disabled={isSubmitting}
                        className="mt-5 p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 py-2">등록된 계수가 없습니다. '추가' 버튼을 눌러 계수를 등록하세요.</p>
              )}
            </div>
          </div>
        );
      }
      case EquipType.NOZZLE: {
        const spec = form.spec as NozzleSpec;
        return (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-700 border-b pb-2">노즐 스펙</h3>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  노즐 직경 목록
                </label>
                <button
                  type="button"
                  onClick={addNozzleDiameter}
                  disabled={isSubmitting}
                  className="px-3 py-1 text-sm bg-neutral-800 text-white rounded hover:bg-neutral-900 transition-colors disabled:opacity-50"
                >
                  + 추가
                </button>
              </div>
              {spec?.nozzleDiameters && spec.nozzleDiameters.length > 0 ? (
                <div className="grid grid-cols-3 gap-2">
                  {spec.nozzleDiameters.map((nozzle, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <input
                          type="number"
                          step="0.01"
                          value={nozzle.diameter}
                          onChange={(e) => updateNozzleDiameter(idx, Number(e.target.value))}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                          placeholder="직경"
                          disabled={isSubmitting}
                        />
                      </div>
                      <span className="text-sm text-gray-500">cm</span>
                      <button
                        type="button"
                        onClick={() => removeNozzleDiameter(idx)}
                        disabled={isSubmitting}
                        className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 py-2">등록된 노즐 직경이 없습니다. '추가' 버튼을 눌러 직경을 등록하세요.</p>
              )}
            </div>
          </div>
        );
      }
      case EquipType.OTHER:
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">장비 추가</h2>
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
          {/* 장비 타입 선택 */}
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
              장비 타입 <span className="text-red-500">*</span>
            </label>
            <select
              id="type"
              name="type"
              value={Object.keys(EquipType).find(key => EquipType[key as keyof typeof EquipType] === form.type)}
              onChange={onChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              disabled={isSubmitting}
            >
              {EQUIP_TYPE_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* 기본 정보 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="equipmentName" className="block text-sm font-medium text-gray-700 mb-1">
                장비명 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="equipmentName"
                name="equipmentName"
                value={form.equipmentName}
                onChange={onChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="장비명을 입력하세요"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="alias" className="block text-sm font-medium text-gray-700 mb-1">
                별칭
              </label>
              <input
                type="text"
                id="alias"
                name="alias"
                value={form.alias}
                onChange={onChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="별칭 (선택사항)"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="managementNumber" className="block text-sm font-medium text-gray-700 mb-1">
                관리번호 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="managementNumber"
                name="managementNumber"
                value={form.managementNumber}
                onChange={onChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="관리번호"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="serialNumber" className="block text-sm font-medium text-gray-700 mb-1">
                시리얼번호
              </label>
              <input
                type="text"
                id="serialNumber"
                name="serialNumber"
                value={form.serialNumber}
                onChange={onChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="시리얼번호"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="modelName" className="block text-sm font-medium text-gray-700 mb-1">
                모델명
              </label>
              <input
                type="text"
                id="modelName"
                name="modelName"
                value={form.modelName}
                onChange={onChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="모델명"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="manufacturer" className="block text-sm font-medium text-gray-700 mb-1">
                제조사
              </label>
              <input
                type="text"
                id="manufacturer"
                name="manufacturer"
                value={form.manufacturer}
                onChange={onChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="제조사"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label htmlFor="originCountry" className="block text-sm font-medium text-gray-700 mb-1">
                원산지
              </label>
              <input
                type="text"
                id="originCountry"
                name="originCountry"
                value={form.originCountry}
                onChange={onChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="원산지"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                가격 (원)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={form.price}
                onChange={onChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="가격"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="purchaseDate" className="block text-sm font-medium text-gray-700 mb-1">
                구매일
              </label>
              <input
                type="date"
                id="purchaseDate"
                name="purchaseDate"
                value={form.purchaseDate}
                onChange={onChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div>
            <label htmlFor="calibrationCycle" className="block text-sm font-medium text-gray-700 mb-1">
              교정 주기 (개월)
            </label>
            <input
              type="number"
              id="calibrationCycle"
              name="calibrationCycle"
              value={form.calibrationCycle}
              onChange={onChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              disabled={isSubmitting}
            />
          </div>

          {/* 타입별 스펙 필드 */}
          {renderSpecFields()}

          <div>
            <label htmlFor="remark" className="block text-sm font-medium text-gray-700 mb-1">
              비고
            </label>
            <textarea
              id="remark"
              name="remark"
              value={form.remark}
              onChange={onChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              placeholder="추가 정보를 입력하세요 (선택사항)"
              disabled={isSubmitting}
            />
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
              {isSubmitting ? '추가 중...' : '추가'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
