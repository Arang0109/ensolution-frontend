import type { PlanInfoEditForm } from "@plan/model"

import { SHAPE_LABELS_OPTIONS, ORIENTATION_LABELS_OPTIONS } from "@/entities/stack/model";

import { TableInputCell, TableLabelCell, TableResultCell, TableSelectableCell } from "@shared/ui";
import { display } from "@shared/lib";

interface StackProfileSectionProps {
  mobileWrap: string;
  desktopWrap: string;

  planInfo: PlanInfoEditForm;
  onChange: (name: keyof PlanInfoEditForm, value: string) => void;

  stackArea: number | null;
  measurePointCnt: number;
}

export const StackProfileSection = ({
  mobileWrap,
  desktopWrap,

  planInfo: preInfo,
  onChange,

  stackArea,
  measurePointCnt
}: StackProfileSectionProps) => {
  return (
    <>
      <section>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">시설정보</h3>

        {/* Mobile */}
        <div className={mobileWrap}>
          <table className="w-full table-fixed border-collapse text-sm">
            <tbody>
              <tr>
                <TableLabelCell>높이</TableLabelCell>
                <TableInputCell colSpan={3} value={preInfo.height} onChange={(value) => onChange("height", value)} unit="m" />
              </tr>
              <tr>
                <TableLabelCell>형태</TableLabelCell>
                <TableSelectableCell
                  colSpan={3} value={preInfo.shape}
                  options={SHAPE_LABELS_OPTIONS}
                  onChange={(value) => {
                    onChange("shape", value);
                    if (value === "CIRCULAR") onChange("verticalLength", "");
                  }}
                />
              </tr>
              <tr>
                {preInfo.shape === "CIRCULAR" ? (
                  <>
                    <TableLabelCell>지름</TableLabelCell>
                    <TableInputCell colSpan={3} value={preInfo.horizontalLength} onChange={(value) => onChange("horizontalLength", value)} unit="m" />
                    
                  </>
                ) : (
                  <>
                    <TableLabelCell>가로</TableLabelCell>
                    <TableInputCell value={preInfo.horizontalLength} onChange={(value) => onChange("horizontalLength", value)} unit="m" />
                    <TableLabelCell>세로</TableLabelCell>
                    <TableInputCell value={preInfo.verticalLength} onChange={(value) => onChange("verticalLength", value)} unit="m" />
                  </>
                )}
              </tr>
              <tr>
                <TableLabelCell>방향</TableLabelCell>
                <TableSelectableCell
                  colSpan={3}
                  value={preInfo.orientation}
                  options={ORIENTATION_LABELS_OPTIONS}
                  onChange={(value) => onChange("orientation", value)}
                />
              </tr>
              <tr>
                <TableLabelCell>면적</TableLabelCell>
                <TableResultCell value={display(stackArea)} unit={<>m<sup>2</sup></>} />
                <TableLabelCell>측정점</TableLabelCell>
                <TableResultCell value={display(measurePointCnt)} unit="지점" />
              </tr>
            </tbody>
          </table>
        </div>

        {/* Desktop */}
        <div className={desktopWrap}>
          <table className="w-full table-fixed border-collapse text-sm">
            <tbody>
              <tr>
                <TableLabelCell>높이</TableLabelCell>
                <TableInputCell value={preInfo.height} onChange={(value) => onChange("height", value)} unit="m" />
                <TableLabelCell>형태</TableLabelCell>
                <TableSelectableCell
                  value={preInfo.shape}
                  options={SHAPE_LABELS_OPTIONS}
                  onChange={(value) => {
                    onChange("shape", value);
                    if (value === "CIRCULAR") onChange("verticalLength", "");
                  }}
                />
                {preInfo.shape === "CIRCULAR" ? (
                  <>
                    <TableLabelCell>지름</TableLabelCell>
                    <TableInputCell value={preInfo.horizontalLength} onChange={(value) => onChange("horizontalLength", value)} unit="m" />
                    <TableLabelCell> </TableLabelCell>
                    <TableLabelCell> </TableLabelCell>
                  </>
                ) : (
                  <>
                    <TableLabelCell>가로</TableLabelCell>
                    <TableInputCell value={preInfo.horizontalLength} onChange={(value) => onChange("horizontalLength", value)} unit="m" />
                    <TableLabelCell>세로</TableLabelCell>
                    <TableInputCell value={preInfo.verticalLength} onChange={(value) => onChange("verticalLength", value)} unit="m" />
                  </>
                )}
                <TableLabelCell>방향</TableLabelCell>
                <TableSelectableCell
                  value={preInfo.orientation}
                  options={ORIENTATION_LABELS_OPTIONS}
                  onChange={(value) => onChange("orientation", value)}
                />
              </tr>
              <tr>
                <TableLabelCell>면적</TableLabelCell>
                <TableResultCell colSpan={4} value={display(stackArea)} unit={<>m<sup>2</sup></>} />
                <TableLabelCell>측정점</TableLabelCell>
                <TableResultCell colSpan={4} value={display(measurePointCnt)} unit="지점" />
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}