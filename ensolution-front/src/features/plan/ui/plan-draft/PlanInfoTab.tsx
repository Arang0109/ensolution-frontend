import { TEAM_TYPE_OPTIONS } from "@entities/agency/team/model";
import {
  MEASUREMENT_TYPE_OPTIONS, MEASUREMENT_FIELD_OPTIONS
} from "@/entities/plan/model";
import type { PlanInfoEditForm, MeasurementItemEditForm } from "@/entities/plan/model";

import { SHAPE_LABELS_OPTIONS, ORIENTATION_LABELS_OPTIONS, CYCLE_LABELS, type StackDetailResponse, type StackMeasurementResponse } from "@/entities/stack/model";
import { GRADE_LABELS_OPTIONS } from "@shared/model";
import { TableInputCell, TableSelectableCell, TableLabelCell, SectionAccordion } from "@shared/ui";

interface PlanInfoTabProps {
  planInfo: PlanInfoEditForm;
  measurementItems: MeasurementItemEditForm[];
  stack: StackDetailResponse | undefined;
  onChange: (name: keyof PlanInfoEditForm, value: string) => void;
  onMeasurementItemsChange: (items: StackMeasurementResponse[]) => void;
}

const mobileSectionWrap = "sm:hidden overflow-hidden";
const desktopSectionWrap = "hidden sm:block overflow-hidden";

export const PlanInfoTab = ({
  planInfo,
  measurementItems,
  stack,
  onChange,
  onMeasurementItemsChange,
}: PlanInfoTabProps) => {

  return (
    <div className="space-y-6">
      {/* 측정항목 */}
      <SectionAccordion title="0. 측정항목" defaultOpen={true}>
        {stack ? (() => {
          const selectedIds = measurementItems.map((i) => i.stackMeasurementId);
          const grouped = stack.stackMeasurements.reduce<Record<string, typeof stack.stackMeasurements>>((acc, sm) => {
            if (!acc[sm.cycle]) acc[sm.cycle] = [];
            acc[sm.cycle].push(sm);
            return acc;
          }, {});

          return (
            <div className="space-y-2 mt-2">
              {Object.entries(grouped).map(([cycle, items]) => (
                <div key={cycle} className="space-y-1">
                  <p className="text-xs text-gray-600 font-medium">{CYCLE_LABELS[cycle as keyof typeof CYCLE_LABELS]}</p>
                  <div className="flex flex-wrap gap-2">
                    {items.map((sm) => {
                      const isSelected = selectedIds.includes(sm.id);
                      return (
                        <span
                          key={sm.id}
                          onClick={() => {
                            const next = isSelected
                              ? (stack.stackMeasurements ?? []).filter((s) => selectedIds.includes(s.id) && s.id !== sm.id)
                              : (stack.stackMeasurements ?? []).filter((s) => [...selectedIds, sm.id].includes(s.id));
                            onMeasurementItemsChange(next);
                          }}
                          className={`inline-flex items-center px-3 py-2 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                            isSelected ? "bg-blue-50 text-blue-700" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                          }`}
                        >
                          {sm.pollutant.nameKr}
                        </span>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          );
        })() : (
          <p className="text-xs text-gray-400">측정시설을 선택하면 항목이 표시됩니다.</p>
        )}
      </SectionAccordion>

      {/* 측정 사전 정보 */}
      <SectionAccordion title="1. 사전정보" defaultOpen={true}>
        {/* Mobile */}
        <div className={mobileSectionWrap}>
          <table className="w-full border-collapse text-sm">
            <tbody>
              <tr>
                <TableLabelCell>측정일</TableLabelCell>
                <TableInputCell type="date" value={planInfo.measureDate} onChange={(value) => onChange("measureDate", value)} />
              </tr>
              <tr>
                <TableLabelCell>접수번호</TableLabelCell>
                <TableInputCell value={planInfo.referenceNumber} onChange={(value) => onChange("referenceNumber", value)}/>
              </tr>
              <tr>
                <TableLabelCell>측정분야</TableLabelCell>
                <TableSelectableCell value={planInfo.measurementField} onChange={(value) => onChange("measurementField", value)} options={MEASUREMENT_FIELD_OPTIONS} />
              </tr>
              <tr>
                <TableLabelCell>측정용도</TableLabelCell>
                <TableSelectableCell value={planInfo.measurementType} onChange={(value) => onChange("measurementType", value)} options={MEASUREMENT_TYPE_OPTIONS} />
              </tr>
              <tr>
                <TableLabelCell>채취인력(정)</TableLabelCell>
                <TableInputCell value={planInfo.mentor} onChange={(value) => onChange("mentor", value)} />
              </tr>
              <tr>
                <TableLabelCell>채취인력(부)</TableLabelCell>
                <TableInputCell value={planInfo.mentee} onChange={(value) => onChange("mentee", value)} />
              </tr>
              <tr>
                <TableLabelCell>채취팀</TableLabelCell>
                <TableSelectableCell value={planInfo.teamName} onChange={(value) => onChange("teamName", value)} options={TEAM_TYPE_OPTIONS} />
              </tr>
              <tr>
                <TableLabelCell>차량번호</TableLabelCell>
                <TableInputCell value={planInfo.vehicleNumber} onChange={(value) => onChange("vehicleNumber", value)} />
              </tr>
            </tbody>
          </table>
        </div>

        {/* Desktop */}
        <div className={desktopSectionWrap}>
          <table className="w-full border-collapse text-sm">
            <tbody>
              <tr>
                <TableLabelCell>접수번호</TableLabelCell>
                <TableInputCell value={planInfo.referenceNumber} onChange={(value) => onChange("referenceNumber", value)} />
                <TableLabelCell>측정일</TableLabelCell>
                <TableInputCell type="date" value={planInfo.measureDate} onChange={(value) => onChange("measureDate", value)} />
              </tr>
              <tr>
                <TableLabelCell>측정분야</TableLabelCell>
                <TableSelectableCell value={planInfo.measurementField} onChange={(value) => onChange("measurementField", value)} options={MEASUREMENT_FIELD_OPTIONS} />
                <TableLabelCell>측정용도</TableLabelCell>
                <TableSelectableCell value={planInfo.measurementType} onChange={(value) => onChange("measurementType", value)} options={MEASUREMENT_TYPE_OPTIONS} />
              </tr>
              <tr>
                <TableLabelCell>채취자(사수)</TableLabelCell>
                <TableInputCell value={planInfo.mentor} onChange={(value) => onChange("mentor", value)} />
                <TableLabelCell>채취자(부사수)</TableLabelCell>
                <TableInputCell value={planInfo.mentee} onChange={(value) => onChange("mentee", value)} />
              </tr>
              <tr>
                <TableLabelCell>측정팀</TableLabelCell>
                <TableSelectableCell value={planInfo.teamName} onChange={(value) => onChange("teamName", value)} options={TEAM_TYPE_OPTIONS} />
                <TableLabelCell>차량번호</TableLabelCell>
                <TableInputCell value={planInfo.vehicleNumber} onChange={(value) => onChange("vehicleNumber", value)} colSpan={3} />
              </tr>
            </tbody>
          </table>
        </div>
      </SectionAccordion>

      {/* 의뢰기관 정보 */}
      <SectionAccordion title="2. 의뢰기관정보">
        {/* Mobile */}
        <div className={mobileSectionWrap}>
          <table className="w-full border-collapse text-sm">
            <tbody>
              <tr>
                <TableLabelCell>의뢰기관</TableLabelCell>
                <TableInputCell colSpan={3} value={planInfo.companyName} onChange={(value) => onChange("companyName", value)} />
              </tr>
              <tr>
                <TableLabelCell>사업장</TableLabelCell>
                <TableInputCell colSpan={3} value={planInfo.workplaceName} onChange={(value) => onChange("workplaceName", value)} />
              </tr>
              <tr>
                <TableLabelCell>주소</TableLabelCell>
                <TableInputCell colSpan={3} value={planInfo.address} onChange={(value) => onChange("address", value)} />
              </tr>
              <tr>
                <TableLabelCell>사업자번호</TableLabelCell>
                <TableInputCell colSpan={3} value={planInfo.bizNumber} onChange={(value) => onChange("bizNumber", value)} />
              </tr>
              <tr>
                <TableLabelCell>대표자</TableLabelCell>
                <TableLabelCell>담당자</TableLabelCell>
                <TableLabelCell>업종</TableLabelCell>
                <TableLabelCell>사업장 종별</TableLabelCell>
              </tr>
              <tr>
                <TableInputCell value={planInfo.ceoName} onChange={(value) => onChange("ceoName", value)} />
                <TableInputCell value={planInfo.manager} onChange={(value) => onChange("manager", value)} />
                <TableInputCell value={planInfo.businessCategory} onChange={(value) => onChange("businessCategory", value)} />
                <TableSelectableCell value={planInfo.workplaceGrade} onChange={(value) => onChange("workplaceGrade", value)} options={GRADE_LABELS_OPTIONS} />
              </tr>
            </tbody>
          </table>
        </div>

        {/* Desktop */}
        <div className={desktopSectionWrap}>
          <table className="w-full border-collapse text-sm">
            <tbody>
              <tr>
                <TableLabelCell>의뢰기관</TableLabelCell>
                <TableInputCell value={planInfo.companyName} onChange={(value) => onChange("companyName", value)} />
                <TableLabelCell>사업장</TableLabelCell>
                <TableInputCell value={planInfo.workplaceName} onChange={(value) => onChange("workplaceName", value)} />
              </tr>
              <tr>
                <TableLabelCell>주소</TableLabelCell>
                <TableInputCell value={planInfo.address} onChange={(value) => onChange("address", value)} />
                <TableLabelCell>사업자번호</TableLabelCell>
                <TableInputCell value={planInfo.bizNumber} onChange={(value) => onChange("bizNumber", value)} />
              </tr>
              <tr>
                <TableLabelCell>대표자</TableLabelCell>
                <TableInputCell value={planInfo.ceoName} onChange={(value) => onChange("ceoName", value)} />
                <TableLabelCell>담당자</TableLabelCell>
                <TableInputCell value={planInfo.manager} onChange={(value) => onChange("manager", value)} />
              </tr>
              <tr>
                <TableLabelCell>업종</TableLabelCell>
                <TableInputCell value={planInfo.businessCategory} onChange={(value) => onChange("businessCategory", value)} />
                <TableLabelCell>사업장 종별</TableLabelCell>
                <TableSelectableCell value={planInfo.workplaceGrade} onChange={(value) => onChange("workplaceGrade", value)} options={GRADE_LABELS_OPTIONS} />
              </tr>
            </tbody>
          </table>
        </div>
      </SectionAccordion>

      {/* 굴뚝 정보 */}
      <SectionAccordion title="3. 측정시설정보">
        {/* Mobile */}
        <div className={mobileSectionWrap}>
          <table className="w-full border-collapse text-sm">
            <tbody>
              <tr>
                <TableLabelCell>측정시설</TableLabelCell>
                <TableInputCell colSpan={3} value={planInfo.stackName} onChange={(value) => onChange("stackName", value)} />
              </tr>
              <tr>
                <TableLabelCell>SEMS 번호</TableLabelCell>
                <TableLabelCell>측정공 높이 (m)</TableLabelCell>
                <TableLabelCell>기준산소농도 (%)</TableLabelCell>
                <TableLabelCell>사업장 종별</TableLabelCell>
              </tr>
              <tr>
                <TableInputCell
                  type="number"
                  value={planInfo.semsNumber}
                  onChange={(value) => onChange("semsNumber", value)}
                  min={0}
                  step={1}
                  />
                <TableInputCell
                  type="number"
                  value={planInfo.height}
                  onChange={(value) => onChange("height", value)}
                  min={0.1}
                  step={0.1}
                  />
                <TableInputCell
                  type="number"
                  value={planInfo.standardOxygen}
                  onChange={(value) => onChange("standardOxygen", value)}
                  min={0}
                  step={1}
                  />
                <TableSelectableCell value={planInfo.stackGrade} onChange={(value) => onChange("stackGrade", value)} options={GRADE_LABELS_OPTIONS} />
              </tr>
              <tr>
                <TableLabelCell>측정시설 방향</TableLabelCell>
                <TableLabelCell>측정시설 형태</TableLabelCell>
                {planInfo.shape === "CIRCULAR" ?
                  <>
                    <TableLabelCell>지름 (m)</TableLabelCell>
                    <TableLabelCell> </TableLabelCell>
                  </>
                :
                  <>
                    <TableLabelCell>가로 (m)</TableLabelCell>
                    <TableLabelCell>세로 (m)</TableLabelCell>
                  </>
                }
              </tr>
              <tr>
                <TableSelectableCell value={planInfo.orientation} onChange={(value) => onChange("orientation", value)} options={ORIENTATION_LABELS_OPTIONS} />
                <TableSelectableCell value={planInfo.shape} onChange={(value) => onChange("shape", value)} options={SHAPE_LABELS_OPTIONS} />
                {planInfo.shape === "CIRCULAR" ?
                  <>
                    <TableInputCell
                      type="number"
                      value={planInfo.horizontalLength}
                      onChange={(value) => onChange("horizontalLength", value)}
                      min={0.1}
                      step={0.1}
                    />
                    <TableLabelCell> </TableLabelCell>
                  </>
                :
                  <>
                    <TableInputCell
                      type="number"
                      value={planInfo.horizontalLength}
                      onChange={(value) => onChange("horizontalLength", value)}
                      min={0.1}
                      step={0.1}
                    />
                    <TableInputCell
                      type="number"
                      value={planInfo.verticalLength}
                      onChange={(value) => onChange("verticalLength", value)}
                      min={0.1}
                      step={0.1}
                    />
                  </>
                }
              </tr>
            </tbody>
          </table>
        </div>

        {/* Desktop */}
        <div className={desktopSectionWrap}>
          <table className="w-full border-collapse text-sm">
            <tbody>
              <tr>
                <TableLabelCell>굴뚝명</TableLabelCell>
                <TableInputCell value={planInfo.stackName} onChange={(value) => onChange("stackName", value)} />
                <TableLabelCell>SEMS 번호</TableLabelCell>
                <TableInputCell value={planInfo.semsNumber} onChange={(value) => onChange("semsNumber", value)} />
              </tr>
              <tr>
                <TableLabelCell>측정공 높이 (m)</TableLabelCell>
                <TableInputCell value={planInfo.height} onChange={(value) => onChange("height", value)} />
                <TableLabelCell>측정시설 방향</TableLabelCell>
                <TableSelectableCell value={planInfo.orientation} onChange={(value) => onChange("orientation", value)} options={ORIENTATION_LABELS_OPTIONS} />
              </tr>
              <tr>
                <TableLabelCell>측정시설 형태</TableLabelCell>
                <TableSelectableCell value={planInfo.shape} onChange={(value) => onChange("shape", value)} options={SHAPE_LABELS_OPTIONS} />
                <TableLabelCell>기준산소농도 (%)</TableLabelCell>
                <TableInputCell value={planInfo.standardOxygen} onChange={(value) => onChange("standardOxygen", value)} />
              </tr>
              <tr>
                {planInfo.shape === "CIRCULAR" ?
                  <>
                    <TableLabelCell>직경 (m)</TableLabelCell>
                    <TableInputCell value={planInfo.horizontalLength} onChange={(value) => onChange("horizontalLength", value)} />
                  </>
                :
                  <>
                    <TableLabelCell>가로 (m)</TableLabelCell>
                    <TableInputCell value={planInfo.horizontalLength} onChange={(value) => onChange("horizontalLength", value)} />
                    <TableLabelCell>세로 (m)</TableLabelCell>
                    <TableInputCell value={planInfo.verticalLength} onChange={(value) => onChange("verticalLength", value)} />
                  </>
                }
              </tr>
              <tr>
                <TableLabelCell>사업장 종별</TableLabelCell>
                <TableSelectableCell colSpan={3} value={planInfo.stackGrade} onChange={(value) => onChange("stackGrade", value)} options={GRADE_LABELS_OPTIONS} />
              </tr>
            </tbody>
          </table>
        </div>
      </SectionAccordion>
    </div>
  );
};
