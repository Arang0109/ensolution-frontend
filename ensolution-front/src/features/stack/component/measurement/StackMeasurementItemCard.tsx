import type { StackMeasurementResponse } from "@stack/model";
import { IconButton } from "@shared/ui";
import { Pencil } from "lucide-react";
import { formatAllowance } from "@shared/lib";

interface StackMeasurementItemCardProps {
  measurement: StackMeasurementResponse;
  onEdit: (measurement: StackMeasurementResponse) => void;
}

export const StackMeasurementItemCard = ({
  measurement,
  onEdit,
}: StackMeasurementItemCardProps) => {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-300 rounded-lg p-3 hover:shadow-md transition-all hover:border-neutral-400 relative group">
      
      <IconButton
        icon={<Pencil className="h-4 w-4" />}
        title="수정"
        variant="ghost"
        onClick={() => onEdit(measurement)}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100"
      />

      <div className="space-y-2">
        <div>
          <p className="font-bold text-neutral-900 text-sm leading-tight">
            {measurement.pollutant.nameKr}
            {measurement.pollutant.nameEn && (
              <span> [ {measurement.pollutant.nameEn} ]</span>
            )}
          </p>
        </div>

        <div className="pt-2 border-t border-slate-300">
          <p className="text-xs text-gray-600">허용기준</p>
          <p className="font-semibold text-primary-700">
            {formatAllowance(measurement)}
          </p>
        </div>
      </div>
    </div>
  );
};