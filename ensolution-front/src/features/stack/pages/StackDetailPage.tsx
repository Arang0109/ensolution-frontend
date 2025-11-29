import { useParams } from 'react-router';

export const StackDetailPage = () => {
  const { stackId } = useParams();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Stack Detail</h2>
      <p>측정시설 상세 - ID: {stackId}</p>
    </div>
  );
};
