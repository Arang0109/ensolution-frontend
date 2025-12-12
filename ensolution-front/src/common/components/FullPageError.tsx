interface FullPageErrorProps {
  message?: string;
}

export const FullPageError = ({
  message = "데이터를 불러올 수 없습니다."
}: FullPageErrorProps) => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-brown-600">{message}</div>
  </div>
);