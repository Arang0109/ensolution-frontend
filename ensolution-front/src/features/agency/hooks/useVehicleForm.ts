import { useState } from "react";
import type { VehicleRegisterRequest, VehicleUpdateRequest } from "@agency/model/agency.types";
import { registerVehicle, patchVehicle } from "@agency/api/AgencyApi";

export const useVehicleForm = (vehicleId?: number) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (data: VehicleRegisterRequest) => {
    try {
      setLoading(true);
      setError(null);
      const response = await registerVehicle(data);
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "차량 등록에 실패했습니다.");
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (data: VehicleUpdateRequest) => {
    if (!vehicleId) throw new Error("Vehicle ID is required for update");

    try {
      setLoading(true);
      setError(null);
      const response = await patchVehicle(vehicleId, data);
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "차량 수정에 실패했습니다.");
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { handleRegister, handleUpdate, loading, error };
};
