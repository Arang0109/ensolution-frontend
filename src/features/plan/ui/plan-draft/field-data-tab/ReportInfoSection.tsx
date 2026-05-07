import type { MeasurementSheetEditForm } from "@/entities/plan/model";
import { CATEGORY_OPTIONS } from "@/entities/plan/model";

import {
  TableLabelCell, TableSelectableCell, SectionAccordion
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
    <SectionAccordion title="Part 0. 시료채취기록지 기본정보" defaultOpen={true}>
      {/* Mobile */}
      <div className={mobileWrap}>
        <table className="w-full table-fixed border-collapse text-sm">
          <tbody>
            <tr>
              <TableLabelCell>분류</TableLabelCell>
            </tr>
            <tr>
              <TableSelectableCell
                value={sheet.category}
                options={CATEGORY_OPTIONS}
                onChange={(value) => onChange("category", value)}
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
    </SectionAccordion>
  )
}
