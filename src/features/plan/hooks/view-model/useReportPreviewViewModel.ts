import {
  WEATHER_CONDITION_LABELS,
  WIND_DIRECTION_LABELS,
  CATEGORY_LABELS,
  type MeasurementItemDocResponse,
} from '@/entities/plan/model';
import { usePlanDetailQuery } from '@/features/plan/hooks';

export const useReportPreviewViewModel = (planId: number, sheetIdx: number) => {

  const { plan, isLoading } = usePlanDetailQuery(Number(planId));

  const info = plan?.measurementInfo;
  const sheet = info?.sheets?.[sheetIdx];
  const client = info?.client;
  const equipment = info?.equipment;

  // 노즐 단면적 계산 (nozzleSize 단위: cm)
  const nozzleSize = Number(sheet?.particleSample.nozzleSize ?? 0);
  const nozzleArea = nozzleSize > 0 ? Math.PI * Math.pow(nozzleSize / 2, 2) : 0;

  // 라벨 변환
  const weatherLabel = sheet
    ? (WEATHER_CONDITION_LABELS[sheet.weather.weatherCondition] ?? sheet.weather.weatherCondition)
    : '';
  const windDirectionLabel = sheet
    ? (WIND_DIRECTION_LABELS[sheet.weather.windDirection] ?? sheet.weather.windDirection)
    : '';
  const categoryLabel = sheet ? (CATEGORY_LABELS[sheet.category] ?? sheet.category) : '';

  const formattedMeasureDate = info?.measureDate
    ? info.measureDate.replace(/-/g, '.')
    : '';

  // 시트의 측정항목 순서 매핑 (primaryItem → concurrentItems 순)
  const itemMap = new Map<number, MeasurementItemDocResponse>();
  info?.measurementItems.forEach((item) => itemMap.set(item.stackMeasurementId, item));

  const orderedItemIds: number[] = [
    ...(sheet?.primaryItemId != null ? [sheet.primaryItemId] : []),
    ...(sheet?.concurrentItemIds ?? []),
  ];
  const orderedItems = orderedItemIds
    .map((id) => itemMap.get(id))
    .filter((item): item is MeasurementItemDocResponse => item != null);

  return {
    isLoading,
    plan: plan?.plan,
    info,
    sheet,
    client,
    equipment,
    sheetIdx,
    totalSheets: info?.sheets?.length ?? 0,
    nozzleSize,
    nozzleArea,
    weatherLabel,
    windDirectionLabel,
    categoryLabel,
    formattedMeasureDate,
    orderedItems,
  };
};
