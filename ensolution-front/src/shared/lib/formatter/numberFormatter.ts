/**
 * 숫자를 한국 형식으로 포맷팅합니다. (예: 1,000,000)
 */
export const formatNumber = (value: number): string => {
  return value.toLocaleString('ko-KR');
};