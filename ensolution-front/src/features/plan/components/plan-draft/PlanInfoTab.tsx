
import { TEAM_TYPE_OPTIONS } from "@agency/model";
import {
  MEASUREMENT_TYPE_OPTIONS, MEASUREMENT_FIELD_OPTIONS
} from "@plan/model";
import type { PreInfoEditForm, MeasurementItemEditForm } from "@plan/model";

import { SHAPE_LABELS_OPTIONS, ORIENTATION_LABELS_OPTIONS, type StackDetailResponse } from "@stack/model";
import { GRADE_LABELS_OPTIONS } from "@shared/model";
import { MultiSelectField, TableEditableCell, TableSelectableCell, TableLabelCell } from "@shared/ui";

interface PlanInfoTabProps {
  preInfo: PreInfoEditForm;
  measurementItems: MeasurementItemEditForm;
  stack: StackDetailResponse | undefined;
  onChange: (name: keyof PreInfoEditForm, value: string) => void;
  onMeasurementItemsChange: (ids: number[]) => void;
}

const mobileSectionWrap = "sm:hidden rounded-lg border border-gray-200 overflow-hidden";
const desktopSectionWrap = "hidden sm:block rounded-lg border border-gray-200 overflow-hidden";

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
          value={measurementItems.measurementItems}
          onChange={onMeasurementItemsChange}
          getOptionValue={(item) => item.id}
          getOptionLabel={(item) => item.pollutant?.nameKr ?? ''}
          placeholder="측정항목을 선택하세요"
        />
      </section>

      {/* 측정 사전 정보 */}
      <section>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">측정 사전 정보</h3>

        {/* Mobile */}
        <div className={mobileSectionWrap}>
          <table className="w-full border-collapse text-sm">
            <tbody>
              <tr>
                <TableEditableCell colSpan={3} label="접수번호" value={preInfo.referenceNumber} onChange={(value) => onChange("referenceNumber", value)} />
              </tr>
              <tr>
                <TableEditableCell colSpan={3} label="측정일" value={preInfo.measureDate} onChange={(value) => onChange("measureDate", value)} />
              </tr>
              <tr>
                <TableLabelCell>측정분야</TableLabelCell>
                <TableSelectableCell value={preInfo.measurementField} onChange={(value) => onChange("measurementField", value)} options={MEASUREMENT_FIELD_OPTIONS} />
                <TableLabelCell>측정용도</TableLabelCell>
                <TableSelectableCell value={preInfo.measurementType} onChange={(value) => onChange("measurementType", value)} options={MEASUREMENT_TYPE_OPTIONS} />
              </tr>
              <tr>
                <TableEditableCell label="채취자(사수)" value={preInfo.mentor} onChange={(value) => onChange("mentor", value)} />
                <TableEditableCell label="채취자(부사수)" value={preInfo.mentee} onChange={(value) => onChange("mentee", value)} />
              </tr>
              <tr>
                <TableLabelCell>측정팀</TableLabelCell>
                <TableSelectableCell value={preInfo.teamName} onChange={(value) => onChange("teamName", value)} options={TEAM_TYPE_OPTIONS} />
                <TableEditableCell label="차량번호" value={preInfo.vehicleNumber} onChange={(value) => onChange("vehicleNumber", value)} />
              </tr>
            </tbody>
          </table>
        </div>

        {/* Desktop */}
        <div className={desktopSectionWrap}>
          <table className="w-full border-collapse text-sm">
            <tbody>
              <tr>
                <TableEditableCell label="접수번호" value={preInfo.referenceNumber} onChange={(value) => onChange("referenceNumber", value)} />
                <TableEditableCell label="측정일" value={preInfo.measureDate} onChange={(value) => onChange("measureDate", value)} />
              </tr>
              <tr>
                <TableLabelCell>측정분야</TableLabelCell>
                <TableSelectableCell value={preInfo.measurementField} onChange={(value) => onChange("measurementField", value)} options={MEASUREMENT_FIELD_OPTIONS} />
                <TableLabelCell>측정용도</TableLabelCell>
                <TableSelectableCell value={preInfo.measurementType} onChange={(value) => onChange("measurementType", value)} options={MEASUREMENT_TYPE_OPTIONS} />
              </tr>
              <tr>
                <TableEditableCell label="채취자(사수)" value={preInfo.mentor} onChange={(value) => onChange("mentor", value)} />
                <TableEditableCell label="채취자(부사수)" value={preInfo.mentee} onChange={(value) => onChange("mentee", value)} />
              </tr>
              <tr>
                <TableLabelCell>측정팀</TableLabelCell>
                <TableSelectableCell value={preInfo.teamName} onChange={(value) => onChange("teamName", value)} options={TEAM_TYPE_OPTIONS} />
                <TableEditableCell label="차량번호" value={preInfo.vehicleNumber} onChange={(value) => onChange("vehicleNumber", value)} colSpan={3} />
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 의뢰기관 정보 */}
      <section>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">의뢰기관 정보</h3>

        {/* Mobile */}
        <div className={mobileSectionWrap}>
          <table className="w-full border-collapse text-sm">
            <tbody>
              <tr>
                <TableEditableCell colSpan={3} label="의뢰기관명" value={preInfo.companyName} onChange={(value) => onChange("companyName", value)} />
              </tr>
              <tr>
                <TableEditableCell colSpan={3} label="사업장명" value={preInfo.workplaceName} onChange={(value) => onChange("workplaceName", value)} />
              </tr>
              <tr>
                <TableEditableCell colSpan={3} label="주소" value={preInfo.address} onChange={(value) => onChange("address", value)} />
              </tr>
              <tr>
                <TableEditableCell colSpan={3} label="사업자번호" value={preInfo.bizNumber} onChange={(value) => onChange("bizNumber", value)} />
              </tr>
              <tr>
                <TableEditableCell label="대표자" value={preInfo.ceoName} onChange={(value) => onChange("ceoName", value)} />
                <TableEditableCell label="담당자" value={preInfo.manager} onChange={(value) => onChange("manager", value)} />
              </tr>
              <tr>
                <TableEditableCell label="업종" value={preInfo.businessCategory} onChange={(value) => onChange("businessCategory", value)} />
                <TableLabelCell>사업장 종별</TableLabelCell>
                <TableSelectableCell value={preInfo.workplaceGrade} onChange={(value) => onChange("workplaceGrade", value)} options={GRADE_LABELS_OPTIONS} />
              </tr>
            </tbody>
          </table>
        </div>

        {/* Desktop */}
        <div className={desktopSectionWrap}>
          <table className="w-full border-collapse text-sm">
            <tbody>
              <tr>
                <TableEditableCell label="의뢰기관명" value={preInfo.companyName} onChange={(value) => onChange("companyName", value)} />
                <TableEditableCell label="사업장명" value={preInfo.workplaceName} onChange={(value) => onChange("workplaceName", value)} />
              </tr>
              <tr>
                <TableEditableCell label="주소" value={preInfo.address} onChange={(value) => onChange("address", value)} />
                <TableEditableCell label="사업자번호" value={preInfo.bizNumber} onChange={(value) => onChange("bizNumber", value)} />
              </tr>
              <tr>
                <TableEditableCell label="대표자" value={preInfo.ceoName} onChange={(value) => onChange("ceoName", value)} />
                <TableEditableCell label="담당자" value={preInfo.manager} onChange={(value) => onChange("manager", value)} />
              </tr>
              <tr>
                <TableEditableCell label="업종" value={preInfo.businessCategory} onChange={(value) => onChange("businessCategory", value)} />
                <TableLabelCell>사업장 종별</TableLabelCell>
                <TableSelectableCell value={preInfo.workplaceGrade} onChange={(value) => onChange("workplaceGrade", value)} options={GRADE_LABELS_OPTIONS} />
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 굴뚝 정보 */}
      <section>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">굴뚝 정보</h3>

        {/* Mobile */}
        <div className={mobileSectionWrap}>
          <table className="w-full border-collapse text-sm">
            <tbody>
              <tr>
                <TableEditableCell colSpan={3} label="굴뚝명" value={preInfo.stackName} onChange={(value) => onChange("stackName", value)} />
              </tr>
              <tr>
                <TableEditableCell colSpan={3} label="SEMS 번호" value={preInfo.semsNumber} onChange={(value) => onChange("semsNumber", value)} />
              </tr>
              <tr>
                <TableEditableCell label="측정공 높이 (m)" value={preInfo.height} onChange={(value) => onChange("height", value)} />
                <TableLabelCell>측정시설 방향</TableLabelCell>
                <TableSelectableCell value={preInfo.orientation} onChange={(value) => onChange("orientation", value)} options={ORIENTATION_LABELS_OPTIONS} />
              </tr>
              <tr>
                <TableLabelCell>측정시설 형태</TableLabelCell>
                <TableSelectableCell value={preInfo.shape} onChange={(value) => onChange("shape", value)} options={SHAPE_LABELS_OPTIONS} />
                <TableEditableCell label="기준산소농도 (%)" value={preInfo.standardOxygen} onChange={(value) => onChange("standardOxygen", value)} />
              </tr>
              <tr>
                <TableEditableCell label="가로 (m)" value={preInfo.horizontalLength} onChange={(value) => onChange("horizontalLength", value)} />
                <TableEditableCell label="세로 (m)" value={preInfo.verticalLength} onChange={(value) => onChange("verticalLength", value)} />
              </tr>
              <tr>
                <TableLabelCell>사업장 종별</TableLabelCell>
                <TableSelectableCell colSpan={3} value={preInfo.stackGrade} onChange={(value) => onChange("stackGrade", value)} options={GRADE_LABELS_OPTIONS} />
              </tr>
            </tbody>
          </table>
        </div>

        {/* Desktop */}
        <div className={desktopSectionWrap}>
          <table className="w-full border-collapse text-sm">
            <tbody>
              <tr>
                <TableEditableCell label="굴뚝명" value={preInfo.stackName} onChange={(value) => onChange("stackName", value)} />
                <TableEditableCell label="SEMS 번호" value={preInfo.semsNumber} onChange={(value) => onChange("semsNumber", value)} />
              </tr>
              <tr>
                <TableEditableCell label="측정공 높이 (m)" value={preInfo.height} onChange={(value) => onChange("height", value)} />
                <TableLabelCell>측정시설 방향</TableLabelCell>
                <TableSelectableCell value={preInfo.orientation} onChange={(value) => onChange("orientation", value)} options={ORIENTATION_LABELS_OPTIONS} />
              </tr>
              <tr>
                <TableLabelCell>측정시설 형태</TableLabelCell>
                <TableSelectableCell value={preInfo.shape} onChange={(value) => onChange("shape", value)} options={SHAPE_LABELS_OPTIONS} />
                <TableEditableCell label="기준산소농도 (%)" value={preInfo.standardOxygen} onChange={(value) => onChange("standardOxygen", value)} />
              </tr>
              <tr>
                <TableEditableCell label="가로 (m)" value={preInfo.horizontalLength} onChange={(value) => onChange("horizontalLength", value)} />
                <TableEditableCell label="세로 (m)" value={preInfo.verticalLength} onChange={(value) => onChange("verticalLength", value)} />
              </tr>
              <tr>
                <TableLabelCell>사업장 종별</TableLabelCell>
                <TableSelectableCell colSpan={3} value={preInfo.stackGrade} onChange={(value) => onChange("stackGrade", value)} options={GRADE_LABELS_OPTIONS} />
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
