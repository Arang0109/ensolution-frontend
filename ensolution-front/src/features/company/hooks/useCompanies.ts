import { useState, useEffect } from "react";
import type { CompanyResponse } from "@company/model";
import { getCompanies } from "@company/api/companyApi";

export const useCompanies = () => {
  const [companies, setCompanies] = useState<CompanyResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const res = await getCompanies();
      if (res.status && res.data) {
        setCompanies(res.data)
      } else {
        setCompanies([]);
      } 
    } catch (error) {
      console.error("Failed to load companies:", error);
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCompanies();
  }, []);

  return {
    companies,
    loading,
    refetch: fetchCompanies
  }
}