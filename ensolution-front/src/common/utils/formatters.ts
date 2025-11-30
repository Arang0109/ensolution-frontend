/**
 * 사업자번호를 포맷팅합니다. (예: 123-45-67890)
 */
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

/**
 * 사업자번호에서 숫자만 추출합니다.
 */
export const stripBizNumber = (value: string): string =>
  value.replace(/\D/g, "");

/**
 * 날짜를 한국 형식으로 포맷팅합니다. (예: 2024.1.1)
 */
export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('ko-KR');
};

/**
 * 날짜와 시간을 한국 형식으로 포맷팅합니다. (예: 2024.1.1 오후 1:30:00)
 */
export const formatDateTime = (date: string | Date): string => {
  return new Date(date).toLocaleString('ko-KR');
};

/**
 * 숫자를 한국 형식으로 포맷팅합니다. (예: 1,000,000)
 */
export const formatNumber = (value: number): string => {
  return value.toLocaleString('ko-KR');
};