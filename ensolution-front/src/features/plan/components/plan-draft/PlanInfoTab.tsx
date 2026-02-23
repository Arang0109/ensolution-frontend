
import { TEAM_TYPE_OPTIONS } from "@agency/model";
import {
  MEASUREMENT_TYPE_OPTIONS, MEASUREMENT_FIELD_OPTIONS
} from "@plan/model";
import type { PreInfoEditForm, MeasurementItemEditForm } from "@plan/model";

import { SHAPE_LABELS_OPTIONS, ORIENTATION_LABELS_OPTIONS, type StackDetailResponse } from "@stack/model";
import { GRADE_LABELS_OPTIONS } from "@shared/model";
import { MultiSelectField, TableEditableCell, TableSelectableCell} from "@shared/ui";

interface PlanInfoTabProps {
  preInfo: PreInfoEditForm;
  measurementItems: MeasurementItemEditForm;
  stack: StackDetailResponse | null;
  onChange: (name: keyof PreInfoEditForm, value: string) => void;
  onMeasurementItemsChange: (ids: number[]) => void;
}

export const PlanInfoTab = ({
  preInfo,
  measurementItems,
  stack,
  onChange,
  onMeasurementItemsChange,
}: PlanInfoTabProps) => {

  return (
    <div className="space-y-6">
      {/* 측정항목 */}
      <section>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">측정항목</h3>
        <MultiSelectField
          options={stack?.stackMeasurements ?? []}
          value={measurementItems.pollutantIdList}
          onChange={onMeasurementItemsChange}
          getOptionValue={(item) => item.id}
          getOptionLabel={(item) => item.pollutant?.nameKr ?? ''}
          placeholder="측정항목을 선택하세요"
        />
      </section>
      {/* 측정 사전 정보 - 수정 가능 */}
      <section>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">측정 사전 정보</h3>
        <div className="rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full border-collapse text-sm block sm:table">
            <tbody className="block sm:table-row-group">
              <tr className="grid grid-cols-[8rem_1fr] sm:table-row">
                <TableEditableCell label="접수번호" value={preInfo.referenceNumber} onChange={(value) => onChange("referenceNumber", value)} />
                <TableEditableCell label="측정일" value={preInfo.measureDate} onChange={(value) => onChange("measureDate", value)} />
              </tr>
              <tr className="grid grid-cols-[8rem_1fr] sm:table-row">
                <TableSelectableCell
                  label="측정분야"
                  value={preInfo.measurementField}
                  onChange={(value) => onChange("measurementField", value)}
                  options={MEASUREMENT_FIELD_OPTIONS}
                />
                <TableSelectableCell
                  label="측정용도"
                  value={preInfo.measurementType}
                  onChange={(value) => onChange("measurementType", value)}
                  options={MEASUREMENT_TYPE_OPTIONS}
                />
              </tr>
              <tr className="grid grid-cols-[8rem_1fr] sm:table-row">
                <TableEditableCell label="채취자(사수)" value={preInfo.mentor} onChange={(value) => onChange("mentor", value)} />
                <TableEditableCell label="채취자(부사수)" value={preInfo.mentee} onChange={(value) => onChange("mentee", value)} />
              </tr>
              <tr className="grid grid-cols-[8rem_1fr] sm:table-row">
                <TableSelectableCell
                  label="측정팀"
                  value={preInfo.teamName}
                  onChange={(value) => onChange("teamName", value)}
                  options={TEAM_TYPE_OPTIONS}
                />
                <TableEditableCell label="차량번호" value={preInfo.vehicleNumber} onChange={(value) => onChange("vehicleNumber", value)} colSpan={3} />
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">의뢰기관 정보</h3>
        <div className="rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full border-collapse text-sm block sm:table">
            <tbody className="block sm:table-row-group">
              <tr className="grid grid-cols-[8rem_1fr] sm:table-row">
                <TableEditableCell label="의뢰기관명" value={preInfo.companyName} onChange={(value) => onChange("companyName", value)} />
                <TableEditableCell label="사업장명" value={preInfo.workplaceName} onChange={(value) => onChange("workplaceName", value)} />
              </tr>
              <tr className="grid grid-cols-[8rem_1fr] sm:table-row">
                <TableEditableCell label="주소" value={preInfo.address} onChange={(value) => onChange("address", value)} />
                <TableEditableCell label="사업자번호" value={preInfo.bizNumber} onChange={(value) => onChange("bizNumber", value)} />
              </tr>
              <tr className="grid grid-cols-[8rem_1fr] sm:table-row">
                <TableEditableCell label="대표자" value={preInfo.ceoName} onChange={(value) => onChange("ceoName", value)} />
                <TableEditableCell label="담당자" value={preInfo.manager} onChange={(value) => onChange("manager", value)} />
              </tr>
              <tr className="grid grid-cols-[8rem_1fr] sm:table-row">
                <TableEditableCell label="업종" value={preInfo.businessCategory} onChange={(value) => onChange("businessCategory", value)} />
                <TableSelectableCell
                  label="사업장 종별"
                  value={preInfo.workplaceGrade}
                  onChange={(value) => onChange("workplaceGrade", value)}
                  options={GRADE_LABELS_OPTIONS}
                />
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 굴뚝 정보 - 스냅샷(읽기 전용) */}
      <section>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">굴뚝 정보</h3>
        <div className="rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full border-collapse text-sm block sm:table">
            <tbody className="block sm:table-row-group">
              <tr className="grid grid-cols-[8rem_1fr] sm:table-row">
                <TableEditableCell label="굴뚝명" value={preInfo.stackName} onChange={(value) => onChange("stackName", value)} />
                <TableEditableCell label="SEMS 번호" value={preInfo.semsNumber} onChange={(value) => onChange("semsNumber", value)} />
              </tr>
              <tr className="grid grid-cols-[8rem_1fr] sm:table-row">
                <TableEditableCell label="측정공 높이 (m)" value={preInfo.height} onChange={(value) => onChange("height", value)} />
                <TableSelectableCell
                  label="측정시설 방향"
                  value={preInfo.orientation}
                  onChange={(value) => onChange("orientation", value)}
                  options={ORIENTATION_LABELS_OPTIONS}
                />
              </tr>
              <tr className="grid grid-cols-[8rem_1fr] sm:table-row">
                <TableSelectableCell
                  label="측정시설 형태"
                  value={preInfo.shape}
                  onChange={(value) => onChange("shape", value)}
                  options={SHAPE_LABELS_OPTIONS}
                />
                <TableEditableCell label="기준산소농도 (%)" value={preInfo.standardOxygen} onChange={(value) => onChange("standardOxygen", value)} />
              </tr>
              <tr className="grid grid-cols-[8rem_1fr] sm:table-row">
                <TableEditableCell label="가로 (m)" value={preInfo.horizontalLength} onChange={(value) => onChange("horizontalLength", value)} />
                <TableEditableCell label="세로 (m)" value={preInfo.verticalLength} onChange={(value) => onChange("verticalLength", value)} />
              </tr>
              <tr className="grid grid-cols-[8rem_1fr] sm:table-row">
                <TableSelectableCell
                  label="사업장 종별"
                  value={preInfo.stackGrade}
                  onChange={(value) => onChange("stackGrade", value)}
                  options={GRADE_LABELS_OPTIONS}
                />
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};