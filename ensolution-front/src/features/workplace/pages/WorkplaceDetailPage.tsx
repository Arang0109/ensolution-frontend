import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getWorkplace } from '@workplace/api/workplaceApi';
import type { WorkplaceDetailResponse } from '@workplace/model';

export const WorkplaceDetailPage = () => {
  const { workplaceId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<WorkplaceDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchWorkplaceDetail = async () => {
      if (!workplaceId) return;

      setLoading(true);
      try {
        const res = await getWorkplace(Number(workplaceId));
        if (res.status && res.data) {
          setData(res.data);
        }
      } catch (error) {
        console.error('Failed to load workplace detail:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkplaceDetail();
  }, [workplaceId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>로딩 중...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>사업장 정보를 불러올 수 없습니다.</p>
      </div>
    );
  }

  const { workplace, stacks } = data;

  const gradeLabel: Record<string, string> = {
    TYPE_1: "1종",
    TYPE_2: "2종",
    TYPE_3: "3종",
    TYPE_4: "4종",
    TYPE_5: "5종",
  };

  const filteredStacks = stacks.filter((stack) =>
    stack.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stack.semsNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/workplaces')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-3xl font-bold text-gray-800">{workplace.name}</h1>
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
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Workplace Info Card */}
          <div className="bg-white border border-sand-200 rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-brown-900">기본 정보</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">사업장명</label>
                  <p className="text-base text-gray-800 mt-1">{workplace.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">사업자번호</label>
                  <p className="text-base text-gray-800 mt-1">{workplace.bizNumber}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">업종</label>
                  <p className="text-base text-gray-800 mt-1">{workplace.businessCategory}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">사업장 규모</label>
                  <p className="text-base text-gray-800 mt-1">
                    {gradeLabel[workplace.grade] ?? workplace.grade}
                  </p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">주소</label>
                <p className="text-base text-gray-800 mt-1">{workplace.address}</p>
              </div>

              {workplace.remark && (
                <div>
                  <label className="text-sm font-medium text-gray-500">비고</label>
                  <p className="text-base text-gray-800 mt-1 whitespace-pre-wrap">{workplace.remark}</p>
                </div>
              )}
            </div>
          </div>

          {/* Stacks Section */}
          <div className="bg-white border border-sand-200 rounded-lg p-6 shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-brown-900">측정 대상 시설 목록</h2>
              <button className="px-3 py-1.5 bg-gradient-to-r from-brown-500 to-brown-600 text-white text-sm rounded-lg hover:from-brown-600 hover:to-brown-700 transition-colors shadow-md">
                시설 추가
              </button>
            </div>

            {/* Search Input */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="시설명 또는 Sems 번호로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-sand-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
              />
            </div>

            {filteredStacks.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-500">
                  {searchTerm ? '검색 결과가 없습니다.' : '등록된 측정 대상 시설이 없습니다.'}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredStacks.map((stack) => (
                  <div
                    key={stack.id}
                    onClick={() => navigate(`/stack/${workplace.id}`)}
                    className="border border-sand-200 rounded-lg p-4 hover:shadow-md hover:border-brown-400 transition-all cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-800">{stack.name}</h3>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        ID: {stack.id}
                      </span>
                    </div>
                    <div className="flex gap-4 text-xs text-gray-500">
                      <span>Sems 번호: {stack.semsNumber}</span>
                      <span className="px-2 py-0.5 rounded bg-brown-100 text-brown-800">
                        배출시설 규모: {gradeLabel[stack.grade] ?? stack.grade}
                      </span>
                    </div>
                    {stack.remark && (
                      <p className="text-xs text-gray-500 mt-2 pt-2 border-t border-gray-100">
                        {stack.remark}
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
                <span className="text-sm text-brown-600">측정 시설 수</span>
                <span className="text-lg font-bold text-brown-700">{stacks.length}</span>
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
              {new Date(workplace.modifiedAt).toLocaleString('ko-KR')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
