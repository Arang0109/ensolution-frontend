/**
 * 사업자번호를 포맷팅합니다. (예: 123-45-67890)
 */
export const formatBizNumber = (value?: string | null): string => {
  if (!value) return "-";

  const cleaned = value.replace(/\D/g, "");

  if (cleaned.length <= 3) return cleaned;
  if (cleaned.length <= 5) return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
  return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 5)}-${cleaned.slice(5, 10)}`;
};

/**
 * 사업자번호에서 숫자만 추출합니다.
 */
export const stripBizNumber = (value?: string | null): string =>
  value ? value.replace(/\D/g, "") : "";