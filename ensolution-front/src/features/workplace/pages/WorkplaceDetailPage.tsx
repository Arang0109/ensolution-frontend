import { useParams } from 'react-router';

export const WorkplaceDetailPage = () => {
  const { workplaceId } = useParams();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Workplace Detail</h2>
      <p>사업장 상세 - ID: {workplaceId}</p>
    </div>
  );
};
