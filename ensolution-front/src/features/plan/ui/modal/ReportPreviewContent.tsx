import type { MeasurementSheetEditForm, PlanInfoEditForm } from "@/entities/plan/model";
import { useReportPreviewViewModel } from "../../hooks";
import type { OrificeDpRecord } from "../../util";

import { calculator } from "@/shared/lib";

import { formatTime } from "@/shared/lib";
import { IconButton, ReportLabelCell, ReportValueCell } from "@shared/ui";
import { X } from "lucide-react";

const cell = "border border-gray-800 p-1 text-center align-middle";

interface ReportPreviewContentProps {
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

export const ReportPreviewContent = ({
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
}: ReportPreviewContentProps) => {
  const {
      client,
      equipment,
      weatherLabel,
      windDirectionLabel,
      categoryLabel,
      formattedMeasureDate,
      orderedItems,
    } = useReportPreviewViewModel(planId, sheetIndex);

  const stack = client?.stack;
  const preventionName =
    stack?.preventions?.[0]?.name ?? "방지시설 설치의무 면제";

  const moisture = sheet.moisture;
  const particleSample = sheet.particleSample;
  const samples = sheet.samples;
  const measurementPoints = sheet.measurementPoints;

  const { calcArea ,calcAverage, safeCalc, round, toNumber, toNumbers, toNumberRecord, validValues, calcPsMmHg } = calculator;

  const AvgTm = safeCalc([avgInTm, avgOutTm], () => round(calcAverage([avgInTm!, avgOutTm!]), 1));
  const AvgTs = safeCalc([AvgTg], () => AvgTg! - 273);
  const vaccumList = toNumberRecord(measurementPoints.map((p) => p.vacuumGaugePressure));
  const finalImpingerTempList = toNumberRecord(measurementPoints.map((p) => p.finalImpingerTemperature));
  const kFactorList = toNumberRecord(measurementPoints.map((p) => p.kFactor));
  const orificeDpList = toNumberRecord(measurementPoints.map((p) => p.orificeDp));
  const orificeDpEntries = Object.entries(orificeDpRecord).sort(([a], [b]) => Number(a) - Number(b));
  const isoKineticList = validValues(orificeDpEntries.map(([, entry]) => entry.isokineticRatio))

  const AvgVaccum = safeCalc([validValues(vaccumList)], () => calcAverage(validValues(vaccumList!)));
  const AvgFinalImpingerTemp = safeCalc([validValues(finalImpingerTempList)], () => calcAverage(validValues(finalImpingerTempList!)));
  const AvgKFactor = safeCalc([validValues(kFactorList)], () => calcAverage(validValues(kFactorList!)));
  const AvgOrificeDp = safeCalc([validValues(orificeDpList)], () => calcAverage(validValues(orificeDpList!)));
  const AvgIsoKinetic = safeCalc([validValues(isoKineticList)], () => calcAverage(validValues(isoKineticList!)));

  const moistureBDV = toNumber(moisture.beforeDryVolume);
  const moistureADV = toNumber(moisture.afterDryVolume);
  const moistureSuctionV = toNumber(moisture.suctionVelocity);

  const moistureVolume = safeCalc([moistureBDV, moistureADV], () =>
    moistureADV! - moistureBDV!
  );

  const moistureSamplingTime = safeCalc([moistureVolume, moistureSuctionV], () =>
    moistureVolume! / moistureSuctionV!
  );

  const nozzleSize = toNumber(particleSample.nozzleSize);
  const nozzleArea = safeCalc([nozzleSize], () => round(calcArea("CIRCULAR", [nozzleSize!]), 3));

  const t = toNumbers(measurementPoints.map((p) => p.samplingTime));
  const totalTime = t?.reduce((acc, cur) => acc + cur, 0);

  const GAS_ROW_COUNT = 8;
  const gasRows = Array.from({ length: GAS_ROW_COUNT }, (_, i) => ({
    sample: samples[i] ?? null,
    item: orderedItems[i] ?? null,
  }));

  const unit = (value: React.ReactNode) => {
    return (<><i>{value}</i></>)
  };

  const formatResult = (value: number | null, scale: number): string => {
    return value != null && !isNaN(value) ? value.toFixed(scale) : ''
  };

  const isParticle = sheet.category != "GAS";
  let stackLength = "";

  const shape = planInfo.shape;
  const pointCnt = sheet.measurementPoints.length;
  const d = shape == "CIRCULAR" ? toNumber(planInfo.horizontalLength) : toNumber(planInfo.verticalLength);
  const r = safeCalc([d], () => d! / 2);

  const list: (string | undefined)[] = [];

  if (shape == "CIRCULAR") {
    for (let i = 1; i < pointCnt + 1; i++) {
      const calc = safeCalc([r], () => r! * Math.sqrt((2 * i - 1) / (2 * pointCnt)));
      const result = safeCalc([r, calc], () => (r! - calc!) * 100);
      list.push(result?.toFixed(1))
    }

    stackLength = `${toNumber(planInfo.horizontalLength)?.toFixed(3)}`
  }

  if (shape == "RECTANGULAR") {
    list.push(safeCalc([r], () => r! * 100)?.toFixed(1))

    stackLength = `${toNumber(planInfo.horizontalLength)?.toFixed(3)} × ${toNumber(planInfo.verticalLength)?.toFixed(3)}`
  }

  const found = [...measurementPoints].reverse().find(p => p?.afterVm != null && p?.afterVm != "");
  const realV = toNumber(found?.afterVm?? "");
  const suctionVolume = safeCalc([realV, AvgTm, Pa, AvgOrificeDp], () => {
    const deltaH = round(AvgOrificeDp! / 13.6, 2);
    return round(realV! * (273 / (273 + AvgTm!) * ((Pa! + deltaH) / 760)), 3)
  });

  const startVolume = toNumber(measurementPoints[0]?.beforeVm);

  return (
  <>
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-base md:text-2xl font-bold text-gray-800">Preview</h2>
      <IconButton
        icon={<X />}
        title="닫기"
        size="md"
        onClick={onClose}
      />
    </div>

    <div className="max-w-6xl mx-auto bg-white shadow-lg">

      {/* 제목 */}
      <h1 className="text-center text-base md:text-2xl font-bold tracking-widest mb-3">
        대기시료 채취기록지
      </h1>

      <div className="overflow-x-auto mx-auto">
        <table
          className="border-collapse text-[9px] leading-tight"
          style={{ minWidth: "800px" }}
        >
          {/* 총 23 컬럼 */}
          <colgroup>
            {Array.from({ length: 19 }, (_, i) => (
              <col key={i} style={{ width: "4%" }} />
            ))}
            {Array.from({ length: 4 }, (_, i) => (
              <col key={i + 19} style={{ width: "6%" }} />
            ))}
          </colgroup>
          <tbody>

            {/* ── 접수번호 행 ───────────────────────────── */}
            <tr>
              <ReportLabelCell colSpan={15}> </ReportLabelCell>
              <ReportLabelCell colSpan={3}>접수번호</ReportLabelCell>
              <ReportValueCell colSpan={3}>KGAR-26-01-{planInfo.referenceNumber}-{sheet.referenceNumber}</ReportValueCell>
              <ReportValueCell colSpan={2}>{categoryLabel}</ReportValueCell>
            </tr>

            {/* ── 업체명 / 굴뚝단면 / 기상 (5행 묶음) ─── */}
            <tr>
              <ReportLabelCell colSpan={4}>업 체 명</ReportLabelCell>
              <ReportValueCell colSpan={5}>{planInfo?.companyName ?? ""}</ReportValueCell>

              {/* 굴뚝단면도 — 5행 rowspan */}
              <ReportValueCell rowSpan={5} colSpan={6}>
                <div className="mb-1">굴뚝높이: {planInfo?.height ?? "-"} m</div>
                <div className="mb-1">굴뚝단면 및 측정점 배열</div>
                <div className="w-24 h-24 border-2 border-gray-800 rounded-full mx-auto flex items-center justify-center text-gray-400">
                  ○
                </div>
              </ReportValueCell>

              <ReportLabelCell colSpan={3}>대기온도</ReportLabelCell>
              <ReportValueCell colSpan={2}>{sheet.weather.temperature} {unit(<>°C</>)}</ReportValueCell>
              <ReportLabelCell colSpan={2}>습 도</ReportLabelCell>
              <ReportValueCell colSpan={1}>{sheet.weather.humidity} {unit(<>%</>)}</ReportValueCell>
            </tr>
            <tr>
              <ReportLabelCell colSpan={4}>배 출 시 설</ReportLabelCell>
              <ReportValueCell colSpan={5}>
                {planInfo?.semsNumber ?? ""}{planInfo?.stackName ? `(${planInfo.stackName})` : ""}
              </ReportValueCell>

              <ReportLabelCell colSpan={3}>풍 향</ReportLabelCell>
              <ReportValueCell colSpan={2}>{windDirectionLabel}</ReportValueCell>
              <ReportLabelCell colSpan={2}>날 씨</ReportLabelCell>
              <ReportValueCell colSpan={1}>{weatherLabel}</ReportValueCell>
            </tr>
            <tr>
              <ReportLabelCell colSpan={4}>방지시설명</ReportLabelCell>
              <ReportValueCell colSpan={5}>{preventionName}</ReportValueCell>

              <ReportLabelCell colSpan={3}>풍 속</ReportLabelCell>
              <ReportValueCell colSpan={2}>{sheet.weather.windSpeed || "-"} {unit(<>m/s</>)}</ReportValueCell>
              <ReportLabelCell colSpan={2}>피토관계수</ReportLabelCell>
              <ReportValueCell colSpan={1}>{Cp?? "-"}</ReportValueCell>
            </tr>
            <tr>
              <ReportLabelCell colSpan={4}>측 정 일</ReportLabelCell>
              <ReportValueCell colSpan={5}>{formattedMeasureDate}</ReportValueCell>

              <ReportLabelCell colSpan={5}>측정공 위치의 기압</ReportLabelCell>
              <ReportValueCell colSpan={3}>
                {Pa?.toFixed(1)?? "-"} {unit(<>mmHg</>)}
              </ReportValueCell>
            </tr>
            <tr>
              <ReportLabelCell colSpan={4}>채 취 시 간</ReportLabelCell>
              <ReportValueCell colSpan={5}>
                {formatTime(planInfo.measureStartTime)} ~ {formatTime(planInfo.measureEndTime)}
              </ReportValueCell>

              <ReportLabelCell colSpan={3}>ΔH</ReportLabelCell>
              <ReportValueCell colSpan={2}>{Number(equipment?.particleSampler.deltaH).toFixed(1) || "-"}</ReportValueCell>
              <ReportLabelCell colSpan={2}>YD</ReportLabelCell>
              <ReportValueCell colSpan={1}>{Number(equipment?.particleSampler.yd).toFixed(4) || "-"}</ReportValueCell>
            </tr>

            {/* ── 연도 직경 / 벽면거리 / 가스흡입량 ────── */}
            <tr>
              <ReportLabelCell colSpan={4}>연도 직경(m)</ReportLabelCell>
              <ReportValueCell colSpan={5}>{stackLength || "-"}</ReportValueCell>
              <ReportLabelCell colSpan={6}>연도 벽면으로부터 (cm)</ReportLabelCell>
              <ReportLabelCell colSpan={3}>가스흡입량</ReportLabelCell>
              <ReportValueCell colSpan={5}>{suctionVolume || "-"} {unit(<>Sm<sup>3</sup></>)}</ReportValueCell>
            </tr>

            {/* ── 연도 면적 / 1지점 / O2, CO2 ─────────── */}
            <tr>
              <ReportLabelCell colSpan={4}>연도 면적(m²)</ReportLabelCell>
              <ReportValueCell colSpan={5}>{area?.toFixed(3)?? "-"}</ReportValueCell>

              <ReportLabelCell colSpan={2}>1지점</ReportLabelCell>
              <ReportValueCell colSpan={4}>{list[0]?? ''}</ReportValueCell>

              <ReportLabelCell colSpan={3}>O<sub>2</sub> (%)</ReportLabelCell>
              <ReportValueCell colSpan={2}>{o2.toFixed(1)}</ReportValueCell>
              <ReportLabelCell colSpan={2}>CO<sub>2</sub> (%)</ReportLabelCell>
              <ReportValueCell>{co2.toFixed(1)}</ReportValueCell>
            </tr>

            {/* ── 측정여지번호 / 2지점 / 누출검사 / 배출가스정압 */}
            <tr>
              <ReportLabelCell colSpan={4}>측정여지 번호</ReportLabelCell>
              <ReportValueCell colSpan={5}>{`측정 ${particleSample.thimbleFilter}, 바탕 ${particleSample.bgThimbleFilter}`}</ReportValueCell>

              <ReportLabelCell colSpan={2}>2지점</ReportLabelCell>
              <ReportValueCell colSpan={4}>{list[1]?? ''}</ReportValueCell>

              <ReportLabelCell colSpan={3}>누출검사 확인 (mmHg)</ReportLabelCell>
              <ReportValueCell colSpan={2}>{sheet.category == "GAS" ? "-" : 381}</ReportValueCell>
              <ReportLabelCell colSpan={2}>배출가스 정압 (mmHg)</ReportLabelCell>
              <ReportValueCell>{round(calcPsMmHg(Number(AvgPs)), 2)?? "-"}</ReportValueCell>
            </tr>

            {/* ── 기술책임자 / 3지점 / 흡인노즐 ──────── */}
            <tr>
              <ReportLabelCell colSpan={4}>기술책임자 확인</ReportLabelCell>
              <ReportValueCell colSpan={5}>이나영 (서명)</ReportValueCell>

              <ReportLabelCell colSpan={2}>3지점</ReportLabelCell>
              <ReportValueCell colSpan={4}>{list[2]?? ''}</ReportValueCell>

              <ReportLabelCell colSpan={5}>흡인노즐 (mm)</ReportLabelCell>
              <ReportValueCell colSpan={3}>{nozzleSize}</ReportValueCell>
            </tr>

            {/* ── 시료채취자 / 4지점 / 노즐단면적 ─────── */}
            <tr>
              <ReportLabelCell colSpan={4}>시료채취자 확인</ReportLabelCell>
              <ReportValueCell colSpan={5}>{planInfo.mentor || "-"} (서명)<br/>{planInfo.mentee || "-"} (서명)</ReportValueCell>
              <ReportLabelCell colSpan={2}>4지점</ReportLabelCell>
              <ReportValueCell colSpan={4}>{list[3]?? ''}</ReportValueCell>
              <ReportLabelCell colSpan={5}>노즐단면적 (cm<sup>2</sup>)</ReportLabelCell>
              <ReportValueCell colSpan={3}>{nozzleArea}</ReportValueCell>
            </tr>

            {/* ── 환경기술인 / 5지점 / 등속흡인계수 ──── */}
            <tr>
              <ReportLabelCell colSpan={4}>환경기술인</ReportLabelCell>
              <ReportValueCell colSpan={5}>이상직 (서명)</ReportValueCell>
              <ReportLabelCell colSpan={2}>5지점</ReportLabelCell>
              <ReportValueCell colSpan={4}>{list[4]?? ''}</ReportValueCell>
              <ReportLabelCell colSpan={5}>등속흡인계수 (%)</ReportLabelCell>
              <ReportValueCell colSpan={3}>{AvgIsoKinetic != null && !isNaN(AvgIsoKinetic) ? AvgIsoKinetic.toFixed(1) : ""}</ReportValueCell>
            </tr>

            {/* ════════════════════════════════════════════
                [입자상 물질] 섹션
                ═══════════════════════════════════════════ */}
            <tr>
              <ReportLabelCell colSpan={23}>
                [입자상 물질] &nbsp;&nbsp; 측정시간 (&nbsp;&nbsp;
                  {formatTime(particleSample.samplingStartTime) || "  "} ~ {formatTime(particleSample.samplingEndTime) || "  "}
                &nbsp;&nbsp;)
              </ReportLabelCell>
            </tr>

            {/* 컬럼 헤더 (2행) */}
            <tr>
              <ReportLabelCell rowSpan={2} colSpan={2}>채취점<br />번호</ReportLabelCell>
              <ReportLabelCell rowSpan={2} colSpan={2}>채취<br />시간<br />(분)</ReportLabelCell>
              <ReportLabelCell rowSpan={2} colSpan={2}>진공압<br />(mmHg)</ReportLabelCell>
              <ReportLabelCell rowSpan={2} colSpan={2}>정압<br />(mmH₂O)</ReportLabelCell>
              <ReportLabelCell rowSpan={2} colSpan={2}>동압<br />(mmH₂O)</ReportLabelCell>
              <ReportLabelCell colSpan={3}>온 도(°C)</ReportLabelCell>
              <ReportLabelCell rowSpan={2} colSpan={2}>K-Factor</ReportLabelCell>
              <ReportLabelCell rowSpan={2} colSpan={2}>오리피스<br />압차<br />(mmH₂O)</ReportLabelCell>
              <ReportLabelCell rowSpan={2} colSpan={2}>여과지홀더 온도</ReportLabelCell>
              <ReportLabelCell rowSpan={2} colSpan={2}>임핀저<br />출구온도</ReportLabelCell>
              <ReportLabelCell>채취 전</ReportLabelCell>
              <ReportValueCell>{
                safeCalc([startVolume], () => startVolume! * 1000)?.toFixed(2) || "0.00"
              }</ReportValueCell>
            </tr>
            <tr>
              <ReportLabelCell>Ts</ReportLabelCell>
              <ReportLabelCell>Tm(in)</ReportLabelCell>
              <ReportLabelCell>Tm(out)</ReportLabelCell>
              <ReportLabelCell>채취 후</ReportLabelCell>
              <ReportLabelCell>채취량(L)</ReportLabelCell>
            </tr>

            {/* 측정점 데이터 행 (최소 5행 표시) */}
            {Array.from({ length: Math.max(5, measurementPoints.length) }, (_, i) => {
              const mp = measurementPoints[i];
              return (
                <tr key={i}>
                  <ReportLabelCell colSpan={2}>{i + 1}번</ReportLabelCell>
                  <ReportValueCell colSpan={2}>{mp?.samplingTime ?? ""}</ReportValueCell>
                  <ReportValueCell colSpan={2}>{mp?.vacuumGaugePressure != null && !isNaN(Number(mp.vacuumGaugePressure)) ? mp.vacuumGaugePressure : ""}</ReportValueCell>
                  <ReportValueCell colSpan={2}>{mp?.Ps ?? ""}</ReportValueCell>
                  <ReportValueCell colSpan={2}>{mp?.Pv ?? ""}</ReportValueCell>
                  <ReportValueCell>{mp?.Ts ?? ""}</ReportValueCell>
                  <ReportValueCell>{mp?.inTm ?? ""}</ReportValueCell>
                  <ReportValueCell>{mp?.outTm ?? ""}</ReportValueCell>
                  <ReportValueCell colSpan={2}>{mp?.kFactor ?? ""}</ReportValueCell>
                  <ReportValueCell colSpan={2}>{mp?.orificeDp ?? ""}</ReportValueCell>
                  <ReportValueCell colSpan={2}>{sheet.category === "GAS" ? "" : (mp?.Ts ?? "")}</ReportValueCell>
                  <ReportValueCell colSpan={2}>{mp?.finalImpingerTemperature ?? ""}</ReportValueCell>
                  <ReportValueCell>{mp?.afterVm != null && mp.afterVm !== "" ? formatResult(Number(mp.afterVm) * 1000, 2) : ""}</ReportValueCell>
                  <ReportValueCell>
                    {mp?.beforeVm != null && mp?.afterVm != null && mp?.beforeVm !== "" && mp?.afterVm !== ""
                      ? formatResult((Number(mp.afterVm) - Number(mp.beforeVm)) * 1000, 2) : ""}
                  </ReportValueCell>
                </tr>
              );
            })}

            {/* 합계 행 */}
            <tr>
              <ReportLabelCell colSpan={2}>합 계</ReportLabelCell>
              <ReportValueCell colSpan={2}>{totalTime}</ReportValueCell>
              <td colSpan={18} className={`${cell} bg-amber-100`}></td>
              <ReportValueCell>{found ? formatResult(Number(found?.afterVm) * 1000, 2) : ""}</ReportValueCell>
            </tr>

            {/* 평균 행 */}
            <tr>
              <ReportLabelCell colSpan={2}>평 균</ReportLabelCell>
              <td colSpan={2} className={`${cell} bg-amber-100`}></td>
              <ReportValueCell colSpan={2}>{formatResult(AvgVaccum, 1)}</ReportValueCell>
              <ReportValueCell colSpan={2}>{formatResult(AvgPs, 1)}</ReportValueCell>
              <ReportValueCell colSpan={2}>{formatResult(AvgPv, 1)}</ReportValueCell>
              <ReportValueCell colSpan={1}>{formatResult(AvgTs, 1)}</ReportValueCell>
              <ReportValueCell colSpan={2}>{formatResult(AvgTm, 1)}</ReportValueCell>
              <ReportValueCell colSpan={2}>{formatResult(AvgKFactor, 2)}</ReportValueCell>
              <ReportValueCell colSpan={2}>{formatResult(AvgOrificeDp, 2)}</ReportValueCell>
              <ReportValueCell colSpan={2}>{isParticle ? formatResult(AvgTs, 1) : ''}</ReportValueCell>
              <ReportValueCell colSpan={2}>{formatResult(AvgFinalImpingerTemp, 1)}</ReportValueCell>
              <td colSpan={2} className={`${cell} bg-amber-100`}></td>
            </tr>

            {/* ════════════════════════════════════════════
                [수분] 섹션
                ═══════════════════════════════════════════ */}
            <tr>
              <ReportLabelCell colSpan={4}>[ 수 분 ]</ReportLabelCell>
              <ReportLabelCell colSpan={2}>수분량(%)</ReportLabelCell>
              <ReportValueCell colSpan={3}>{Xw ?? ""}</ReportValueCell>
              <ReportLabelCell colSpan={4}>배출가스온도(°C)</ReportLabelCell>
              <ReportValueCell colSpan={4}></ReportValueCell>
              <ReportLabelCell colSpan={4}>포화수증기압</ReportLabelCell>
              <ReportValueCell colSpan={2}></ReportValueCell>
            </tr>
            <tr>
              <ReportLabelCell rowSpan={2} colSpan={3}>흡인유량<br />(L/min)</ReportLabelCell>
              <ReportLabelCell rowSpan={2} colSpan={3}>가스미터압<br />(mmHg)</ReportLabelCell>
              <ReportLabelCell colSpan={4}>온 도(°C)</ReportLabelCell>
              <ReportLabelCell colSpan={4}>무수염화칼슘(g)</ReportLabelCell>
              <ReportLabelCell colSpan={5}>채 취 시 간</ReportLabelCell>
              <ReportValueCell colSpan={3}>{moistureSamplingTime}</ReportValueCell>
              <ReportLabelCell>분</ReportLabelCell>
            </tr>
            <tr>
              <ReportLabelCell colSpan={2}>Tm(in)</ReportLabelCell>
              <ReportLabelCell colSpan={2}>Tm(out)</ReportLabelCell>
              <ReportLabelCell colSpan={2}>전 무게</ReportLabelCell>
              <ReportLabelCell colSpan={2}>후 무게</ReportLabelCell>
              <ReportLabelCell colSpan={3}>채취 전</ReportLabelCell>
              <ReportLabelCell colSpan={3}>채취 후</ReportLabelCell>
              <ReportLabelCell colSpan={3}>채취량(L)</ReportLabelCell>
            </tr>
            <tr>
              <ReportValueCell colSpan={3}>{Number(moisture.suctionVelocity).toFixed(1) || "-"}</ReportValueCell>
              <ReportValueCell colSpan={3}>{round(calcPsMmHg(Number(moisture.gasMeterGaugePressure)), 2)}</ReportValueCell>
              <ReportValueCell colSpan={2}>{moisture.inTemperature || "-"}</ReportValueCell>
              <ReportValueCell colSpan={2}>{moisture.outTemperature || "-"}</ReportValueCell>
              <ReportValueCell colSpan={2}>{Number(moisture.beforeWeight).toFixed(2) || "-"}</ReportValueCell>
              <ReportValueCell colSpan={2}>{Number(moisture.afterWeight).toFixed(2) || "-"}</ReportValueCell>
              <ReportValueCell colSpan={3}>{Number(moisture.beforeDryVolume).toFixed(1) || "-"}</ReportValueCell>
              <ReportValueCell colSpan={3}>{Number(moisture.afterDryVolume).toFixed(1) || "-"}</ReportValueCell>
              <ReportValueCell colSpan={3}>{Number(moistureVolume).toFixed(0)}</ReportValueCell>
            </tr>

            {/* ════════════════════════════════════════════
                [가스상 및 VOCs 물질] 섹션
                ═══════════════════════════════════════════ */}
            <tr>
              <ReportLabelCell colSpan={5}>
                [ 가스상 및 VOCs 물질 ]
              </ReportLabelCell>
              <ReportValueCell colSpan={12}>
                가스분석기 측정시간 ( &nbsp;&nbsp;&nbsp; : &nbsp;&nbsp;&nbsp; ~ &nbsp;&nbsp;&nbsp; : &nbsp;&nbsp;&nbsp; )
              </ReportValueCell>
              <ReportValueCell colSpan={6}>
                THC 측정시간 ( &nbsp;&nbsp;&nbsp; : &nbsp;&nbsp;&nbsp; ~ &nbsp;&nbsp;&nbsp; : &nbsp;&nbsp;&nbsp; )
              </ReportValueCell>
            </tr>
            <tr>
              <ReportLabelCell rowSpan={2} colSpan={3}>항 목</ReportLabelCell>
              <ReportLabelCell rowSpan={2} colSpan={4}>측정시간</ReportLabelCell>
              <ReportLabelCell rowSpan={2}>흡인유량<br />(L/min)</ReportLabelCell>
              <ReportLabelCell rowSpan={2}>가스미터압<br />(mmHg)</ReportLabelCell>
              <ReportLabelCell colSpan={2}>온 도(°C)</ReportLabelCell>
              <ReportLabelCell rowSpan={2} colSpan={2}>채취전</ReportLabelCell>
              <ReportLabelCell rowSpan={2} colSpan={2}>채취후</ReportLabelCell>
              <ReportLabelCell colSpan={4}>Tube No.</ReportLabelCell>
              <ReportLabelCell rowSpan={2} colSpan={2}>채취량(L)</ReportLabelCell>
              <ReportLabelCell colSpan={2}>매 연</ReportLabelCell>
            </tr>
            <tr>
              <ReportLabelCell>Tm(in)</ReportLabelCell>
              <ReportLabelCell>Tm(out)</ReportLabelCell>
              <ReportLabelCell colSpan={2}>현장바탕시료</ReportLabelCell>
              <ReportLabelCell colSpan={2}>시료</ReportLabelCell>
              <ReportValueCell colSpan={2}>( &nbsp;&nbsp;&nbsp; : &nbsp;&nbsp;&nbsp; ~ &nbsp;&nbsp;&nbsp; : &nbsp;&nbsp;&nbsp; )</ReportValueCell>
            </tr>

            {/* 가스상 데이터 행 (앞 4행) */}
            {gasRows.slice(0, GAS_ROW_COUNT - 4).map(({ sample, item }, i) => (
              <tr key={i}>
                <ReportValueCell colSpan={3}>{item?.pollutantNameKr ?? "-"}</ReportValueCell>
                <ReportValueCell colSpan={4}>
                  {sample ? `${sample.startTime} ~ ${sample.endTime}` : ""}
                </ReportValueCell>
                <ReportValueCell>{sample?.suctionQuantity ?? ""}</ReportValueCell>
                <ReportValueCell>{sample?.gasMeterGaugePressure ?? ""}</ReportValueCell>
                <ReportValueCell>{sample?.inTemperature ?? ""}</ReportValueCell>
                <ReportValueCell>{sample?.outTemperature ?? ""}</ReportValueCell>
                <ReportValueCell colSpan={2}>{sample?.beforeVolume ?? ""}</ReportValueCell>
                <ReportValueCell colSpan={2}>{sample?.afterVolume ?? ""}</ReportValueCell>
                <ReportValueCell colSpan={2}>{sample?.blankSampleNumber ?? ""}</ReportValueCell>
                <ReportValueCell colSpan={2}>{sample?.sampleNumber ?? ""}</ReportValueCell>
                <ReportValueCell colSpan={2}>{sample?.samplingVolume ?? ""}</ReportValueCell>
                <ReportValueCell></ReportValueCell>
                <ReportValueCell></ReportValueCell>
              </tr>
            ))}

            {/* 가스상 마지막 4행 (매연 rowspan 그룹) */}
            {gasRows.slice(GAS_ROW_COUNT - 4).map(({ sample, item }, i) => (
              <tr key={`tail-${i}`}>
                <ReportValueCell colSpan={3}>{item?.pollutantNameKr ?? "-"}</ReportValueCell>
                <ReportValueCell colSpan={4}>
                  {sample ? `${sample.startTime} ~ ${sample.endTime}` : ""}
                </ReportValueCell>
                <ReportValueCell>{sample?.suctionQuantity ?? ""}</ReportValueCell>
                <ReportValueCell>{sample?.gasMeterGaugePressure ?? ""}</ReportValueCell>
                <ReportValueCell>{sample?.inTemperature ?? ""}</ReportValueCell>
                <ReportValueCell>{sample?.outTemperature ?? ""}</ReportValueCell>
                <ReportValueCell colSpan={2}>{sample?.beforeVolume ?? ""}</ReportValueCell>
                <ReportValueCell colSpan={2}>{sample?.afterVolume ?? ""}</ReportValueCell>
                <ReportValueCell colSpan={2}>{sample?.blankSampleNumber ?? ""}</ReportValueCell>
                <ReportValueCell colSpan={2}>{sample?.sampleNumber ?? ""}</ReportValueCell>
                <ReportValueCell colSpan={2}>{sample?.samplingVolume ?? ""}</ReportValueCell>
                {i === 0 && <ReportValueCell rowSpan={4} colSpan={2}></ReportValueCell>}
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  </>)
}
