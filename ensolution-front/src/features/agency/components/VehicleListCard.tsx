import type { VehicleResponse } from "@agency/model/agency.types";
import { VehicleCard } from "@agency/components/VehicleCard";

interface VehicleListCardProps {
  vehicles: VehicleResponse[];
  onEdit?: (vehicle: VehicleResponse) => void;
  onDelete?: (vehicle: VehicleResponse) => void;
}

export const VehicleListCard = ({ vehicles, onEdit, onDelete }: VehicleListCardProps) => {
  if (vehicles.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-12 text-center">
        <p className="text-gray-500 text-lg">등록된 차량이 없습니다.</p>
        <p className="text-gray-400 text-sm mt-2">새 차량을 등록해보세요.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {vehicles.map((vehicle) => (
        <VehicleCard
          key={vehicle.id}
          vehicle={vehicle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
