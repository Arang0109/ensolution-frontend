import { useToast } from "@app/providers/toast";
import { X, Plus, Trash2 } from "lucide-react";

import { usePreventSubmitOnEnter } from "@shared/hooks";

import { mapPreventionCreateBundleFormToRequest } from "@stack/model";
import { usePreventionActions, usePreventionCreateForm } from "@stack/hooks";

import { IconButton, Button, InputField, TextAreaField } from "@shared/ui";

interface PreventionCreateContentProps {
  stackId: number;
  onClose: () => void;
  onSuccess: () => void;
}

export const PreventionCreateContent = ({ stackId, onClose, onSuccess }: PreventionCreateContentProps) => {

  const {
    form,
    errors,

    onChangePrevention,  
    onChangeFacility, 
    onChangeTarget,

    addFacility, 
    removeFacility,
    
    addTarget, 
    removeTarget, 

    validate
  } = usePreventionCreateForm(stackId);
  const { creating,  handleCreate } = usePreventionActions();
  const { showToast } = useToast();

  const preventSubmitOnEnter = usePreventSubmitOnEnter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;
    
    const payload = mapPreventionCreateBundleFormToRequest(form);
    const result = await handleCreate(payload);

    if (result?.success) {
      showToast('방지시설이 등록되었습니다.', 'success');
      onSuccess();
      onClose();
    } else {
      showToast(result?.message,'error');
    }
  };

  return (
    <>
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

      <form onSubmit={handleSubmit} onKeyDown={preventSubmitOnEnter} className="space-y-6">
        {/* 방지시설 정보 */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">방지시설 정보</h3>
          <div className="space-y-4">
            <InputField
              id="name"
              label="방지시설명"
              type="text"
              name="name"
              value={form.prevention.name}
              onChange={(value) => onChangePrevention("name", value)}
              placeholder="방지시설명을 입력하세요"
              disabled={creating}
              helperText={errors.preventionName}
              required
            />
            <TextAreaField
              label="비고"
              value={form.prevention.remark}
              onChange={(value) => onChangePrevention("remark", value)}
              placeholder="추가 정보를 입력하세요 (선택사항)"
              disabled={creating}
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
            {form.facilities.map((facility, index) => (
              <div key={index} className="border rounded-lg p-4 bg-gray-50 relative">
                <IconButton
                  icon={<Trash2/>}
                  title="삭제"
                  variant="danger"
                  onClick={() => removeFacility(index)}
                  size="sm"
                  className="absolute top-2 right-2"
                />
                <InputField
                  id="name"
                  label="배출시설명"
                  type="text"
                  name="name"
                  value={facility.name}
                  onChange={(value) => onChangeFacility(index, "name", value)}
                  placeholder="배출시설명을 입력하세요"
                  disabled={creating}
                  required
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    id="fuelType"
                    label="연료종류"
                    type="text"
                    name="fuelType"
                    value={facility.fuelType}
                    onChange={(value) => onChangeFacility(index, "fuelType", value)}
                    placeholder="연료종류를 입력하세요"
                    disabled={creating}
                  />
                  <InputField
                    id="fuelUsage"
                    label="연료사용량"
                    type="text"
                    name="fuelUsage"
                    value={facility.fuelUsage}
                    onChange={(value) => onChangeFacility(index, "fuelUsage", value)}
                    placeholder="연료사용량을 입력하세요"
                    disabled={creating}
                  />
                  <InputField
                    id="itemOutput"
                    label="제품생산량"
                    type="text"
                    name="itemOutput"
                    value={facility.itemOutput}
                    onChange={(value) => onChangeFacility(index, "itemOutput", value)}
                    placeholder="제품생산량을 입력하세요"
                    disabled={creating}
                  />
                  <InputField
                    id="fuelInput"
                    label="연료투입량"
                    type="text"
                    name="fuelInput"
                    value={facility.fuelInput}
                    onChange={(value) => onChangeFacility(index, "fuelInput", value)}
                    placeholder="제품투입량을 입력하세요"
                    disabled={creating}
                  />
                </div>
                <TextAreaField
                    label="비고"
                    value={facility.remark}
                    onChange={(value) => onChangeFacility(index, "remark", value)}
                    placeholder="추가 정보를 입력하세요 (선택사항)"
                    disabled={creating}
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
            {form.targets.map((target, index) => (
              <div key={index} className="border rounded-lg p-4 bg-gray-50 relative">
                <IconButton
                  icon={<Trash2/>}
                  title="삭제"
                  variant="danger"
                  onClick={() => removeTarget(index)}
                  size="sm"
                  className="absolute top-2 right-2"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    id="targetSubstance"
                    label="제거대상물질"
                    type="text"
                    name="targetSubstance"
                    value={target.targetSubstance}
                    onChange={(value) => onChangeTarget(index, "targetSubstance", value)}
                    placeholder="제거대상물질을 입력하세요"
                    disabled={creating}
                    required
                  />
                  <InputField
                    id="removalEfficiency"
                    label="제거효율 (%)"
                    type="number"
                    name="removalEfficiency"
                    value={target.removalEfficiency}
                    onChange={(value) => onChangeTarget(index, "removalEfficiency", value)}
                    placeholder="제거효율을 입력하세요"
                    min={0}
                    max={100}
                    step={0.1}
                    disabled={creating}
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
            disabled={creating}
            width="full"
          />
          <Button
            type="submit"
            label="등록"
            variant="primary"
            disabled={creating}
            width="full"
          />
        </div>
      </form>
    </>
  );
};
