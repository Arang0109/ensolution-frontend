import { useParams } from 'react-router';

export const CompanyDetailPage = () => {
  const { companyId } = useParams();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Company Detail</h2>
      <p>의뢰업체 상세 - ID: {companyId}</p>
    </div>
  );
};
