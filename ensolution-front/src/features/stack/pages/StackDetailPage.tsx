import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useStackDetail } from '@stack/hooks';

export const StackDetailPage = () => {
  const { stackId } = useParams();
  const navigate = useNavigate();
  const { stack, fetchStack, loading } = useStackDetail();

  const gradeLabel: Record<string, string> = {
    TYPE_1: "1종",
    TYPE_2: "2종",
    TYPE_3: "3종",
    TYPE_4: "4종",
    TYPE_5: "5종",
  };

  const shapeLabel: Record<string, string> = {
    CIRCULAL: "원형",
    RECTANGULAR: "사각형",
    OTHER: "기타",
  };

  const orientationLabel: Record<string, string> = {
    VERTICAL: "수직",
    HORIZONTAL: "수평",
  };

  useEffect(() => {
    if (stackId) {
      fetchStack(Number(stackId));
    }
  }, [stackId, fetchStack]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">로딩 중...</div>
      </div>
    );
  }

  if (!stack) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">시설 정보를 찾을 수 없습니다.</p>
          <button
            onClick={() => navigate('/stacks')}
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
            onClick={() => navigate('/stack')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-3xl font-bold text-gray-800">{stack.stack.name}</h1>
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
          {/* Stack Info Card */}
          <div className="bg-white border border-sand-200 rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-brown-900">기본 정보</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">시설명</label>
                  <p className="text-base text-gray-800 mt-1">{stack.stack.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Sems 번호</label>
                  <p className="text-base text-gray-800 mt-1">{stack.stack.semsNumber}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">배출시설 규모</label>
                  <p className="text-base text-gray-800 mt-1">
                    <span className="px-2 py-0.5 rounded bg-brown-100 text-brown-800">
                      {gradeLabel[stack.stack.grade] ?? stack.stack.grade}
                    </span>
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">등록일</label>
                  <p className="text-base text-gray-800 mt-1">
                    {new Date(stack.stack.createdAt).toLocaleDateString('ko-KR')}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">높이</label>
                  <p className="text-base text-gray-800 mt-1">{stack.stack.height} m</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">가로 길이</label>
                  <p className="text-base text-gray-800 mt-1">{stack.stack.horizontalLength} m</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">세로 길이</label>
                  <p className="text-base text-gray-800 mt-1">{stack.stack.verticalLength} m</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">형상</label>
                  <p className="text-base text-gray-800 mt-1">
                    {shapeLabel[stack.stack.shape] ?? stack.stack.shape}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">방향</label>
                  <p className="text-base text-gray-800 mt-1">
                    {orientationLabel[stack.stack.orientation] ?? stack.stack.orientation}
                  </p>
                </div>
              </div>

              {stack.stack.remark && (
                <div>
                  <label className="text-sm font-medium text-gray-500">비고</label>
                  <p className="text-base text-gray-800 mt-1 whitespace-pre-wrap">{stack.stack.remark}</p>
                </div>
              )}
            </div>
          </div>

          {/* Preventions Section */}
          <div className="bg-white border border-sand-200 rounded-lg p-6 shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-brown-900">방지시설 목록</h2>
              <button className="px-3 py-1.5 bg-gradient-to-r from-brown-500 to-brown-600 text-white text-sm rounded-lg hover:from-brown-600 hover:to-brown-700 transition-colors shadow-md">
                방지시설 추가
              </button>
            </div>

            {stack.preventions.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-500">등록된 방지시설이 없습니다.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {stack.preventions.map((preventionDetail) => (
                  <div
                    key={preventionDetail.prevention.id}
                    className="border border-sand-200 rounded-lg p-4 hover:shadow-md hover:border-brown-400 transition-all"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-gray-800 text-lg">{preventionDetail.prevention.name}</h3>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        ID: {preventionDetail.prevention.id}
                      </span>
                    </div>
                    {preventionDetail.prevention.remark && (
                      <p className="text-sm text-gray-600 mb-3">{preventionDetail.prevention.remark}</p>
                    )}

                    {/* 배출시설 목록 */}
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <h4 className="text-sm font-semibold text-brown-800 mb-2">배출시설 ({preventionDetail.facilities.length})</h4>
                      {preventionDetail.facilities.length === 0 ? (
                        <p className="text-xs text-gray-500 italic">등록된 배출시설이 없습니다.</p>
                      ) : (
                        <div className="space-y-2">
                          {preventionDetail.facilities.map((facility) => (
                            <div key={facility.id} className="bg-sand-50 rounded p-3 text-sm">
                              <div className="flex justify-between items-start mb-1">
                                <span className="font-medium text-gray-800">{facility.name}</span>
                                <span className="text-xs text-gray-500">ID: {facility.id}</span>
                              </div>
                              <div className="grid grid-cols-2 gap-2 mt-2 text-xs text-gray-600">
                                <div><span className="font-medium">연료종류:</span> {facility.fuelType}</div>
                                <div><span className="font-medium">연료사용량:</span> {facility.fuelUsage}</div>
                                <div><span className="font-medium">연료투입량:</span> {facility.fuelInput}</div>
                                <div><span className="font-medium">제품생산량:</span> {facility.itemOutput}</div>
                              </div>
                              {facility.remark && (
                                <p className="text-xs text-gray-500 mt-2 italic">{facility.remark}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* 제거대상물질 목록 */}
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <h4 className="text-sm font-semibold text-brown-800 mb-2">제거대상물질 ({preventionDetail.targets.length})</h4>
                      {preventionDetail.targets.length === 0 ? (
                        <p className="text-xs text-gray-500 italic">등록된 제거대상물질이 없습니다.</p>
                      ) : (
                        <div className="space-y-2">
                          {preventionDetail.targets.map((target) => (
                            <div key={target.id} className="bg-terracotta-50 rounded p-3 text-sm">
                              <div className="flex justify-between items-center">
                                <div>
                                  <span className="font-medium text-gray-800">{target.targetSubstance}</span>
                                  <span className="ml-3 text-xs">
                                    <span className="font-medium text-terracotta-700">제거효율:</span>{' '}
                                    <span className="font-semibold text-terracotta-800">{target.removalEfficiency}%</span>
                                  </span>
                                </div>
                                <span className="text-xs text-gray-500">ID: {target.id}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="text-xs text-gray-400 mt-3 pt-3 border-t border-gray-100">
                      등록일: {new Date(preventionDetail.prevention.createdAt).toLocaleDateString('ko-KR')}
                    </div>
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
                <span className="text-sm text-brown-600">방지시설 수</span>
                <span className="text-lg font-bold text-brown-700">{stack.preventions.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-brown-600">배출시설 수</span>
                <span className="text-lg font-bold text-brown-700">
                  {stack.preventions.reduce((sum, p) => sum + p.facilities.length, 0)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-brown-600">제거대상물질 수</span>
                <span className="text-lg font-bold text-terracotta-600">
                  {stack.preventions.reduce((sum, p) => sum + p.targets.length, 0)}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-sand-200 rounded-lg p-6 shadow-md">
            <h2 className="text-lg font-semibold mb-4 text-brown-900">최근 수정</h2>
            <p className="text-sm text-gray-600">
              {new Date(stack.stack.modifiedAt).toLocaleString('ko-KR')}
            </p>
            
          </div>

          <div className="bg-white border border-sand-200 rounded-lg p-6 shadow-md">
            <h2 className="text-lg font-semibold mb-4 text-brown-900">사업장 정보</h2>
            <button
              onClick={() => navigate(`/workplace/${stack.stack.workplaceId}`)}
              className="w-full px-4 py-2 bg-gradient-to-r from-brown-500 to-brown-600 text-white rounded-lg hover:from-brown-600 hover:to-brown-700 transition-colors text-sm shadow-md"
            >
              사업장 상세 보기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
