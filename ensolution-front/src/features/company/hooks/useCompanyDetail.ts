import { useState, useCallback } from "react";

import { getCompany } from "@/entities/company/api/companyApi";

import type { CompanyDetailResponse } from "@entities/company/model";

export const useCompanyDetail = () => {
  const [company, setCompany] = useState<CompanyDetailResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchCompany = useCallback(async (companyId: number) => {
    setLoading(true);
    try {
      const { status, data } = await getCompany(companyId);
      setCompany(status ? data : null);
    } catch (error) {
      console.error(error);
      setCompany(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { company, fetchCompany, loading };
};