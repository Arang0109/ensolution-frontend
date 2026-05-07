import { Button } from "@shared/ui";
import { RotateCw } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState = ({
  title,
  actionLabel,
  onAction
}: EmptyStateProps) => (
  <div className="text-center py-12 bg-gray-50 rounded-lg">
    <p className="text-gray-500 text-lg mb-4">{title}</p>

    {actionLabel && onAction && (
      <Button
        label={actionLabel}
        icon={<RotateCw />}
        onClick={onAction}
        type="button" 
        variant="secondary"
      />
    )}
  </div>
);