import { useState, useEffect, useCallback } from "react";

import { useToast } from "@app/providers/toast";
import { getCompanies } from "@company/api/companyApi";

import type { CompanyResponse } from "@company/model";

export const useCompanies = () => {
  const [companies, setCompanies] = useState<CompanyResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const fetchCompanies = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getCompanies();

      if (!res.status || !res.data) {
        setCompanies([]);
        return;
      }

      setCompanies(res.data);

    } catch (error) {
      console.error(error);
      showToast('업체 목록을 불러오지 못했습니다.', 'error');
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  return {
    companies,
    loading,
    reload: fetchCompanies
  }
}