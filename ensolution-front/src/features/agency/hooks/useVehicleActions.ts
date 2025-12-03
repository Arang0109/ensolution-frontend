import type { VehicleResponse } from "@agency/model/agency.types";
import { deleteVehicle } from "@agency/api/AgencyApi";

export const useVehicleActions = (onSuccess?: () => void) => {
  const handleEdit = (vehicle: VehicleResponse) => {
    // TODO: 수정 모달 또는 페이지로 이동
    console.log("Edit vehicle:", vehicle.id);
  };

  const handleDelete = async (vehicle: VehicleResponse) => {
    const confirmed = window.confirm(`'${vehicle.vehicleNumber}' 차량을 삭제하시겠습니까?`);
    if (!confirmed) return;

    try {
      await deleteVehicle(vehicle.id);
      alert("차량이 삭제되었습니다.");
      onSuccess?.();
    } catch (err) {
      alert("차량 삭제에 실패했습니다.");
      console.error(err);
    }
  };

  return { handleEdit, handleDelete };
};
