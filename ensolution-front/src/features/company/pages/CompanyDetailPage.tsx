import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useCompanyDetail } from '@company/hooks/useCompanyDetail';

export const CompanyDetailPage = () => {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const { company, fetchCompany, loading } = useCompanyDetail();

  const gradeLabel: Record<string, string> = {
    TYPE_1: "1종",
    TYPE_2: "2종",
    TYPE_3: "3종",
    TYPE_4: "4종",
    TYPE_5: "5종",
  };

  useEffect(() => {
    if (companyId) {
      fetchCompany(Number(companyId));
    }
  }, [companyId, fetchCompany]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">로딩 중...</div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">업체 정보를 찾을 수 없습니다.</p>
          <button
            onClick={() => navigate('/companies')}
            className="mt-4 px-4 py-2 bg-gradient-to-r from-brown-500 to-brown-600 text-white rounded-lg hover:from-brown-600 hover:to-brown-700 shadow-md"
          >
            목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/companies')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-3xl font-bold text-gray-800">{company.company.name}</h1>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-gradient-to-r from-brown-500 to-brown-600 text-white rounded-lg hover:from-brown-600 hover:to-brown-700 transition-colors shadow-md">
            수정
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-terracotta-500 to-terracotta-600 text-white rounded-lg hover:from-terracotta-600 hover:to-terracotta-700 transition-colors shadow-md">
            삭제
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Company Profile Card */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-sand-200 rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-brown-900">기본 정보</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">업체명</label>
                  <p className="text-base text-gray-800 mt-1">{company.company.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">대표자명</label>
                  <p className="text-base text-gray-800 mt-1">{company.company.ceoName}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">사업자번호</label>
                  <p className="text-base text-gray-800 mt-1">{company.company.bizNumber}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">등록일</label>
                  <p className="text-base text-gray-800 mt-1">
                    {new Date(company.company.createdAt).toLocaleDateString('ko-KR')}
                  </p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">주소</label>
                <p className="text-base text-gray-800 mt-1">{company.company.address}</p>
              </div>

              {company.company.remark && (
                <div>
                  <label className="text-sm font-medium text-gray-500">비고</label>
                  <p className="text-base text-gray-800 mt-1 whitespace-pre-wrap">{company.company.remark}</p>
                </div>
              )}
            </div>
          </div>

          {/* Workplaces Section */}
          <div className="bg-white border border-sand-200 rounded-lg p-6 shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-brown-900">사업장 목록</h2>
              <button className="px-3 py-1.5 bg-gradient-to-r from-brown-500 to-brown-600 text-white text-sm rounded-lg hover:from-brown-600 hover:to-brown-700 transition-colors shadow-md">
                사업장 추가
              </button>
            </div>

            {company.workplaces.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-500">등록된 사업장이 없습니다.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {company.workplaces.map((workplace) => (
                  <div
                    key={workplace.id}
                    onClick={() => navigate(`/workplace/${workplace.id}`)}
                    className="border border-sand-200 rounded-lg p-4 hover:shadow-md hover:border-brown-400 transition-all cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-800">{workplace.name}</h3>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        ID: {workplace.id}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{workplace.address}</p>
                    <div className="flex gap-4 text-xs text-gray-500">
                      <span>사업자번호: {workplace.bizNumber}</span>
                      <span>업종: {workplace.businessCategory}</span>
                      <span className={`px-2 py-0.5 rounded ${
                        workplace.grade === 'TYPE_1' ? 'bg-brown-100 text-brown-800' :
                        workplace.grade === 'TYPE_2' ? 'bg-brown-100 text-brown-700' :
                        workplace.grade === 'TYPE_3' ? 'bg-sand-200 text-brown-800' :
                        workplace.grade === 'TYPE_4' ? 'bg-terracotta-100 text-terracotta-800' :
                        'bg-terracotta-200 text-terracotta-900'
                      }`}>
                        사업장 규모 : {gradeLabel[workplace.grade] ?? workplace.grade}
                      </span>
                    </div>
                    {workplace.remark && (
                      <p className="text-xs text-gray-500 mt-2 pt-2 border-t border-gray-100">
                        {workplace.remark}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white border border-sand-200 rounded-lg p-6 shadow-md">
            <h2 className="text-lg font-semibold mb-4 text-brown-900">통계</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-brown-600">사업장 수</span>
                <span className="text-lg font-bold text-brown-700">{company.workplaces.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-brown-600">총 측정 건수</span>
                <span className="text-lg font-bold text-brown-700">-</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-brown-600">진행 중인 측정</span>
                <span className="text-lg font-bold text-terracotta-600">-</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-sand-200 rounded-lg p-6 shadow-md">
            <h2 className="text-lg font-semibold mb-4 text-brown-900">최근 수정</h2>
            <p className="text-sm text-gray-600">
              {new Date(company.company.modifiedAt).toLocaleString('ko-KR')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
