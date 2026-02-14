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