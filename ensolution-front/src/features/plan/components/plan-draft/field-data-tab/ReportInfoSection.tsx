import type { MeasurementSheetEditForm } from "@plan/model";
import { CATEGORY_OPTIONS } from "@plan/model";

import {
  TableLabelCell, TableInputCell, TableSelectableCell
} from "@shared/ui";

interface ReportInfoSectionProps {
  mobileWrap: string;
  desktopWrap: string;

  sheet: MeasurementSheetEditForm;
  onChange: (name: keyof MeasurementSheetEditForm, value: string) => void;
}

export const ReportInfoSection = ({
  mobileWrap,
  desktopWrap,

  sheet,
  onChange
}: ReportInfoSectionProps) => {
  return (
    <section>
      <h3 className="text-sm font-semibold text-gray-700 mb-2">기록지정보</h3>
      
      {/* Mobile */}
      <div className={mobileWrap}>
        <table className="w-full table-fixed border-collapse text-sm">
          <tbody>
            <tr>
              <TableLabelCell>문서번호</TableLabelCell>
              <TableInputCell
                value={sheet.referenceNumber}
                onChange={(value) => onChange("referenceNumber", value)}
              />
              <TableLabelCell>분류</TableLabelCell>
              <TableSelectableCell
                value={sheet.category} 
                options={CATEGORY_OPTIONS} 
                onChange={(value) => onChange("category", value)} 
              />
            </tr>
            <tr>
              <TableLabelCell>측정시작</TableLabelCell>
              <TableInputCell
                value=""
                type="time"
                onChange={(value) => console.log(value)}
              />
            </tr>
          </tbody>
        </table>
      </div>

      {/* Desktop */}
      <div className={desktopWrap}>
        <table className="w-full table-fixed border-collapse text-sm">
          <tbody>
            <tr>
              <TableLabelCell>문서번호</TableLabelCell>
              <TableInputCell
                value={sheet.referenceNumber}
                onChange={(value) => onChange("referenceNumber", value)}
              />
              <TableLabelCell>분류</TableLabelCell>
              <TableSelectableCell
                value={sheet.category} 
                options={CATEGORY_OPTIONS} 
                onChange={(value) => onChange("category", value)} 
              />
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}