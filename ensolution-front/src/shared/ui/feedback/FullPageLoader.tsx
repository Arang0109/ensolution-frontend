interface FullPageLoaderProps {
  message?: string;
  height?: string;
}

export const FullPageLoader = ({
  message = "로딩 중...",
  height = "h-64"
}: FullPageLoaderProps) => (
  <div className={`flex items-center justify-center ${height}`}>
    <div className="text-lg text-gray-600 animate-pulse">{message}</div>
  </div>
);