import { Modal } from "@shared/ui";
import { ReportPreviewContent } from "./ReportPreviewContent";
import type { MeasurementSheetEditForm, PlanInfoEditForm } from "@/entities/plan/model";
import type { OrificeDpRecord } from "../../util";

interface ReportPreviewModalProps {
  onClose: () => void;
  planId: number;
  sheetIndex: number;
  sheet: MeasurementSheetEditForm;
  planInfo: PlanInfoEditForm;

  area: number | null;
  Pa: number | null;
  Xw: number | null;
  Cp: number | null;

  Tg: number | null;
  Pv: number | null;
  Ps: number | null;
  inTm: number | null;
  outTm: number | null;

  o2: number;
  co2: number;
  
  orificeDpRecord: OrificeDpRecord;
}

export const ReportPreviewModal = ({
  onClose,
  planId,
  sheetIndex,
  sheet,
  planInfo,

  area,
  Pa,
  Xw,
  Cp,

  Tg: AvgTg, // 평균 배출가스 온도 (K)
  Pv: AvgPv, // 평균 배출가스 동압 (mmH2O)
  Ps: AvgPs, // 평균 배출가스 동압 (mmHg)
  inTm: avgInTm,
  outTm: avgOutTm,

  o2,
  co2,

  orificeDpRecord,
}: ReportPreviewModalProps) => {
  return (
    <Modal size="xxl">
      <ReportPreviewContent
        onClose={onClose}
        planId={planId}
        sheetIndex={sheetIndex}
        sheet={sheet}
        planInfo={planInfo}

        area={area}
        Pa={Pa}
        Xw={Xw}
        Cp={Cp}

        Tg={AvgTg}
        Pv={AvgPv}
        Ps={AvgPs}
        inTm={avgInTm}
        outTm={avgOutTm}

        o2={o2}
        co2={co2}

        orificeDpRecord={orificeDpRecord}
      />
    </Modal>
  );
};