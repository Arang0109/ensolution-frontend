import { useState, useEffect } from "react";
import type { VehicleResponse } from "@agency/model/agency.types";
import { getVehicles } from "@agency/api/AgencyApi";

export const useVehicles = () => {
  const [vehicles, setVehicles] = useState<VehicleResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getVehicles();
      setVehicles(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "차량 목록을 불러오는데 실패했습니다.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  return { vehicles, loading, error, refetch: fetchVehicles };
};
