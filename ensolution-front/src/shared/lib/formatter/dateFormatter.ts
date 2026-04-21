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
 * 시간을 hh:mm 형식으로 포맷팅합니다. (예: 09:05)
 */
export const formatTime = (time: string | null | undefined): string => {
  if (!time) return '--:--';
  const [hours, minutes] = time.split(':');
  if (!hours || !minutes) return '--:--';
  return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
};