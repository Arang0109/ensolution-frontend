import type { VehicleResponse } from "@agency/model/agency.types";

interface VehicleCardProps {
  vehicle: VehicleResponse;
  onEdit?: (vehicle: VehicleResponse) => void;
  onDelete?: (vehicle: VehicleResponse) => void;
}

export const VehicleCard = ({ vehicle, onEdit, onDelete }: VehicleCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold">{vehicle.vehicleNumber}</h3>
          <p className="text-sm text-gray-500">차량 ID: {vehicle.id}</p>
        </div>
        <div className="flex gap-2">
          {onEdit && (
            <button
              onClick={() => onEdit(vehicle)}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              수정
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(vehicle)}
              className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
            >
              삭제
            </button>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center">
          <span className="text-gray-600 w-24">소속 팀:</span>
          <span className="font-medium">팀 ID #{vehicle.teamId}</span>
        </div>
      </div>
    </div>
  );
};
