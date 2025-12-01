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
        className="mt-4 px-4 py-2 bg-gradient-to-r from-brown-500 to-brown-600 
                 text-white rounded-lg hover:from-brown-600 hover:to-brown-700 shadow-md"
      >
        {actionLabel}
      </button>
    )}
  </div>
);