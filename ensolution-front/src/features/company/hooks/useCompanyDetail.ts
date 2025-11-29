import { useState, useCallback } from "react";
import type { CompanyDetailResponse } from "@company/model";
import { getCompany } from "@company/api/companyApi";

export const useCompanyDetail = () => {
  const [company, setCompany] = useState<CompanyDetailResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchCompany = useCallback(async (companyId: number) => {
    setLoading(true);
    try {
      const { status, data } = await getCompany(companyId);
      setCompany(status ? data : null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { company, fetchCompany, loading };
};