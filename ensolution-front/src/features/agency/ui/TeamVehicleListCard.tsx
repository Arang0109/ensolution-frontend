import type { VehicleResponse } from "@/features/agency/model/agency-types";

interface TeamVehicleListCardProps {
  vehicles: VehicleResponse[];
  onVehicleClick?: (vehicle: VehicleResponse) => void;
}

export const TeamVehicleListCard = ({ vehicles, onVehicleClick }: TeamVehicleListCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">소속 차량 ({vehicles.length}대)</h2>

      {vehicles.length === 0 ? (
        <p className="text-gray-500 text-center py-8">등록된 차량이 없습니다.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              onClick={() => onVehicleClick?.(vehicle)}
              className="p-4 border rounded hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-lg">{vehicle.vehicleNumber}</p>
                  <p className="text-sm text-gray-600">차량 ID: {vehicle.id}</p>
                </div>
                <div className="text-blue-600">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
