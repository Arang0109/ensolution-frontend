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
    <p className="text-gray-500 text-lg">{title}</p>

    {actionLabel && onAction && (
      <button
        onClick={onAction}
        className="mt-4 px-4 py-2 bg-gradient-to-r from-neutral-800 to-neutral-900
                 text-white rounded-lg hover:from-neutral-900 hover:to-neutral-950 shadow-md"
      >
        {actionLabel}
      </button>
    )}
  </div>
);