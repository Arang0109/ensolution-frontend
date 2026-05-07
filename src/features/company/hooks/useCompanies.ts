import { useState, useEffect, useCallback } from "react";

import { getCompanies } from "@/entities/company/api/companyApi";

import type { CompanyResponse } from "@entities/company/model";

export const useCompanies = () => {
  const [companies, setCompanies] = useState<CompanyResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCompanies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getCompanies();

      if (!res.status || !res.data) {
        setCompanies([]);
        return;
      }

      setCompanies(res.data);

    } catch (error) {
      console.error(error);
      setError('의뢰기관 목록을 불러오지 못했습니다.');
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  return {
    companies,
    loading,
    error,
    reload: fetchCompanies
  }
}