import { useState, useMemo } from 'react';

/**
 * 검색 기능을 제공하는 커스텀 훅
 *
 * @param items 검색 대상 배열
 * @param searchFields 검색할 필드명 배열
 * @returns 검색어, 검색어 설정 함수, 필터링된 결과
 *
 * @example
 * ```tsx
 * const { searchTerm, setSearchTerm, filtered } = useSearch(
 *   stacks,
 *   ['name', 'semsNumber']
 * );
 * ```
 */
export const useSearch = <T extends Record<string, unknown>>(
  items: T[],
  searchFields: (keyof T)[]
) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = useMemo(() => {
    if (!searchTerm.trim()) return items;

    const lowerSearchTerm = searchTerm.toLowerCase();

    return items.filter((item) =>
      searchFields.some((field) => {
        const value = item[field];
        if (value == null) return false;
        return String(value).toLowerCase().includes(lowerSearchTerm);
      })
    );
  }, [items, searchTerm, searchFields]);

  return {
    searchTerm,
    setSearchTerm,
    filtered,
  };
};
