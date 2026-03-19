import type { StackMeasurementResponse } from "@/entities/stack/model";

interface PollutantName {
  nameKr?: string;
  nameEn?: string;
}

export const formatPollutantName = ({
  nameKr,
  nameEn,
}: PollutantName): string => {
  const kr = nameKr?.trim();
  const en = nameEn?.trim();

  if (kr && en) return `${kr} (${en})`;
  if (kr) return kr;
  if (en) return en;

  return "";
};

export const formatAllowance = (
  measurement: StackMeasurementResponse
): string => {
  if (measurement.allowance == null) return "-";

  const unit =
    measurement.pollutant.phase === "PARTICLE"
      ? "mg/Sm³"
      : "ppm";

  return `${measurement.allowance} ${unit}`;
}