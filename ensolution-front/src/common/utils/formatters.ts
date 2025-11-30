export const formatBizNumber = (value: string): string => {
  // 숫자만 남기기
  const cleaned = value.replace(/\D/g, "");

  // 0~3자리
  if (cleaned.length <= 3) return cleaned;
  // 4~5자리
  if (cleaned.length <= 5) return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
  // 6~10자리
  return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 5)}-${cleaned.slice(5, 10)}`;
};

export const stripBizNumber = (value: string): string =>
  value.replace(/\D/g, "");