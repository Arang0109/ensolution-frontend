# Ensolution Front-End 프로젝트 가이드

> 이 문서는 Claude Code를 사용한 프로젝트 개발 및 유지보수 가이드입니다.

---

## 목차

1. [프로젝트 구조 원칙](#프로젝트-구조-원칙)
2. [Feature 기반 아키텍처](#feature-기반-아키텍처)
3. [현재 상태 평가](#현재-상태-평가)
4. [코드 작성 가이드](#코드-작성-가이드)
5. [리팩토링 우선순위](#리팩토링-우선순위)
6. [참고할 모범 사례](#참고할-모범-사례)

---

## 프로젝트 구조 원칙

### 핵심 원칙 4가지

#### 1. 파일별 관심사 분리 철저하게
각 파일은 단일 책임을 가져야 합니다.

```
❌ 나쁜 예 - Page에서 모든 것을 처리
export const WorkplaceDetailPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 직접 API 호출
    fetchData();
  }, []);

  const gradeLabel = { ... }; // 상수도 Page에 선언

  return (
    <div>
      {/* 복잡한 UI 로직 */}
    </div>
  );
};

✅ 좋은 예 - 책임 분리
// hooks/useWorkplaceDetail.ts
export const useWorkplaceDetail = (id: number) => {
  // 데이터 fetching 로직
};

// components/WorkplaceInfoCard.tsx
export const WorkplaceInfoCard = ({ workplace }) => {
  // UI 렌더링 로직
};

// pages/WorkplaceDetailPage.tsx
export const WorkplaceDetailPage = () => {
  const { data, loading } = useWorkplaceDetail(id);

  return (
    <>
      <DetailPageHeader {...} />
      <WorkplaceInfoCard data={data} />
      <WorkplaceSidebar {...} />
    </>
  );
};
```

#### 2. Page는 여러 Component를 조립해서 만들기
Page는 레이아웃과 컴포넌트 조립만 담당해야 합니다.

```tsx
✅ Page의 역할
- Layout 구성 (grid, flex 등)
- Component 배치
- Props 전달
- Route params 처리

❌ Page가 하지 말아야 할 것
- 직접적인 API 호출
- 복잡한 상태 관리
- 비즈니스 로직 처리
- 상수 선언
```

**예시:**
```tsx
// ✅ 좋은 Page 구조 (CompanyDetailPage 참고)
export const CompanyDetailPage = () => {
  const { companyId } = useParams();
  const { company, workplaces, loading } = useCompanyDetail(Number(companyId));
  const { handleEdit, handleDelete } = useCompanyActions(company);

  if (loading) return <FullPageLoader />;
  if (!company) return <EmptyState />;

  return (
    <>
      <DetailPageHeader
        title={company.name}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <CompanyInfoCard company={company} />
          <WorkplaceListCard
            workplaces={workplaces}
            companyId={company.id}
          />
        </div>
        <CompanySidebar
          company={company}
          workplaceCount={workplaces.length}
        />
      </div>
    </>
  );
};
```

#### 3. hooks, components, ui 적극 분리 설계

```
📁 feature/
├── 📁 api/              # API 호출 함수
├── 📁 hooks/            # 비즈니스 로직, 상태 관리
├── 📁 components/       # Container Components (hooks 사용 가능)
├── 📁 ui/               # Presentational Components (props만 사용)
├── 📁 pages/            # 페이지 (조립만)
└── 📁 model/            # 타입 정의
```

**역할 구분:**

| 폴더 | 역할 | 예시 |
|------|------|------|
| `hooks/` | 데이터 fetching, 상태 관리, 비즈니스 로직 | `useCompanyDetail`, `useCompanyActions` |
| `components/` | 도메인 특화 컴포넌트, 로직 포함 가능 | `CompanyInfoCard`, `WorkplaceListCard` |
| `ui/` | 재사용 가능한 순수 UI 컴포넌트 | `LoginForm`, `SocialLoginButton` |
| `pages/` | 컴포넌트 조립 및 레이아웃 | `CompanyDetailPage`, `CompanyListPage` |

#### 4. 공통 로직은 common 폴더에서 관리

```
📁 common/
├── 📁 api/              # axios 인스턴스
├── 📁 components/       # 공통 컴포넌트
│   ├── DetailPageHeader.tsx
│   ├── EmptyState.tsx
│   └── FullPageLoader.tsx
├── 📁 constants/        # 공통 상수 (🔴 개선 필요)
│   └── labels.ts        # gradeLabel 등
├── 📁 hooks/            # 공통 훅
│   ├── useToast.ts
│   └── useSearch.ts     # (🔴 추가 필요)
├── 📁 ui/               # 공통 UI 컴포넌트
│   ├── Toast.tsx
│   └── Dropdown.tsx
└── 📁 utils/            # 유틸리티 함수
    └── formatters.ts    # formatBizNumber, formatDate 등
```

---

## Feature 기반 아키텍처

### Feature 구조 템플릿

```
📁 features/your-feature/
├── 📁 api/
│   └── yourFeatureApi.ts         # API 호출 함수
│
├── 📁 hooks/
│   ├── index.ts                  # export 모음
│   ├── useYourFeatures.ts        # 리스트 조회
│   ├── useYourFeatureDetail.ts   # 상세 조회
│   ├── useYourFeatureForm.ts     # 폼 관리
│   └── useYourFeatureActions.ts  # 액션 (수정, 삭제 등)
│
├── 📁 components/
│   ├── index.ts
│   ├── YourFeatureInfoCard.tsx   # 정보 카드
│   ├── YourFeatureListCard.tsx   # 목록 카드
│   └── YourFeatureSidebar.tsx    # 사이드바
│
├── 📁 ui/                        # (선택사항) 순수 UI 컴포넌트
│   └── YourFeatureForm.tsx
│
├── 📁 pages/
│   ├── index.ts
│   ├── YourFeatureListPage.tsx   # 목록 페이지
│   └── YourFeatureDetailPage.tsx # 상세 페이지
│
└── 📁 model/
    ├── index.ts
    └── yourFeature.types.ts      # 타입 정의
```

### Hook 작성 패턴

#### 1. List Hook (목록 조회)
```tsx
// hooks/useYourFeatures.ts
export const useYourFeatures = () => {
  const [items, setItems] = useState<YourFeature[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const data = await yourFeatureApi.getAll();
        setItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return { items, loading, error, refetch: fetchItems };
};
```

#### 2. Detail Hook (상세 조회)
```tsx
// hooks/useYourFeatureDetail.ts
export const useYourFeatureDetail = (id: number) => {
  const [data, setData] = useState<YourFeatureDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const result = await yourFeatureApi.getById(id);
        setData(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  return { data, loading };
};
```

#### 3. Actions Hook (수정, 삭제 등)
```tsx
// hooks/useYourFeatureActions.ts
export const useYourFeatureActions = (item: YourFeature | null) => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleEdit = () => {
    // 수정 로직
  };

  const handleDelete = async () => {
    if (!item) return;

    try {
      await yourFeatureApi.delete(item.id);
      showToast('삭제되었습니다', 'success');
      navigate('/your-features');
    } catch (err) {
      showToast('삭제 실패', 'error');
    }
  };

  return { handleEdit, handleDelete };
};
```

### Component 작성 패턴

#### 1. Info Card (정보 표시)
```tsx
// components/YourFeatureInfoCard.tsx
interface YourFeatureInfoCardProps {
  item: YourFeature;
}

export const YourFeatureInfoCard = ({ item }: YourFeatureInfoCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">기본 정보</h2>
      <div className="space-y-3">
        <div>
          <span className="text-gray-600">이름:</span>
          <span className="ml-2 font-medium">{item.name}</span>
        </div>
        {/* 추가 정보 */}
      </div>
    </div>
  );
};
```

#### 2. List Card (목록 표시)
```tsx
// components/YourFeatureListCard.tsx
interface YourFeatureListCardProps {
  items: YourFeature[];
  onItemClick?: (item: YourFeature) => void;
}

export const YourFeatureListCard = ({
  items,
  onItemClick
}: YourFeatureListCardProps) => {
  if (items.length === 0) {
    return <EmptyState message="등록된 항목이 없습니다." />;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">목록</h2>
      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => onItemClick?.(item)}
            className="p-4 border rounded hover:bg-gray-50 cursor-pointer"
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};
```

### Page 작성 패턴

#### List Page
```tsx
// pages/YourFeatureListPage.tsx
export const YourFeatureListPage = () => {
  const navigate = useNavigate();
  const { items, loading } = useYourFeatures();
  const [showAddModal, setShowAddModal] = useState(false);

  if (loading) return <FullPageLoader />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">항목 관리</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          추가
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <YourFeatureCard
            key={item.id}
            item={item}
            onClick={() => navigate(`/your-features/${item.id}`)}
          />
        ))}
      </div>

      {showAddModal && (
        <AddYourFeatureModal onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
};
```

#### Detail Page
```tsx
// pages/YourFeatureDetailPage.tsx
export const YourFeatureDetailPage = () => {
  const { id } = useParams();
  const { data, loading } = useYourFeatureDetail(Number(id));
  const { handleEdit, handleDelete } = useYourFeatureActions(data);

  if (loading) return <FullPageLoader />;
  if (!data) return <EmptyState message="항목을 찾을 수 없습니다." />;

  return (
    <>
      <DetailPageHeader
        title={data.name}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <YourFeatureInfoCard item={data} />
          <RelatedItemsCard items={data.relatedItems} />
        </div>

        <YourFeatureSidebar item={data} />
      </div>
    </>
  );
};
```

---

## 현재 상태 평가

### Feature별 점수

| Feature | 점수 | 평가 | 주요 이슈 |
|---------|------|------|-----------|
| **Company** | ⭐⭐⭐⭐⭐ | 모범 사례 | - |
| **Auth** | ⭐⭐⭐⭐ | 우수 | ui 폴더 활용 패턴 참고 필요 |
| **Stack** | ⭐⭐⭐ | 양호 | Page가 너무 김 (300+ 줄), 상수 중복 |
| **Workplace** | ⭐⭐ | 개선 필요 | Page에서 직접 로직 처리, hooks 미활용 |

### 공통 문제점

#### 🔴 심각: 상수 중복 (7개 파일)
```tsx
// 🔴 문제: 다음 파일들에서 동일한 상수 중복 선언
// - WorkplaceDetailPage.tsx
// - CompanyDetailPage.tsx
// - StackDetailPage.tsx
// - StackListPage.tsx
// - WorkplaceListPage.tsx
// - WorkplaceItem.tsx
// - WorkplaceListCard.tsx

const gradeLabel: Record<string, string> = {
  TYPE_1: "1종",
  TYPE_2: "2종",
  TYPE_3: "3종",
  TYPE_4: "4종",
  TYPE_5: "5종",
};

// ✅ 해결: common/constants/labels.ts 생성 필요
```

#### 🟡 중간: 검색 로직 중복
```tsx
// 🔴 문제: StackListPage, WorkplaceDetailPage에서 유사한 패턴
const filtered = items.filter((item) =>
  item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  item.code.toLowerCase().includes(searchTerm.toLowerCase())
);

// ✅ 해결: common/hooks/useSearch.ts 생성 필요
```

#### 🟡 중간: 날짜 포맷팅 중복
```tsx
// 🔴 문제: 여러 곳에서 반복
new Date(date).toLocaleDateString('ko-KR')

// ✅ 해결: formatters.ts에 추가 필요
export const formatDate = (date: string | Date): string =>
  new Date(date).toLocaleDateString('ko-KR');
```

---

## 코드 작성 가이드

### 1. 새로운 Feature 추가 시

#### Step 1: 타입 정의
```tsx
// model/yourFeature.types.ts
export interface YourFeature {
  id: number;
  name: string;
  // ...
}

export interface YourFeatureDetail extends YourFeature {
  relatedItems: RelatedItem[];
}

export interface CreateYourFeatureRequest {
  name: string;
  // ...
}
```

#### Step 2: API 함수 작성
```tsx
// api/yourFeatureApi.ts
import { axiosPrivate } from '@/common/api';

export const yourFeatureApi = {
  getAll: async (): Promise<YourFeature[]> => {
    const { data } = await axiosPrivate.get('/api/your-features');
    return data;
  },

  getById: async (id: number): Promise<YourFeatureDetail> => {
    const { data } = await axiosPrivate.get(`/api/your-features/${id}`);
    return data;
  },

  create: async (req: CreateYourFeatureRequest): Promise<YourFeature> => {
    const { data } = await axiosPrivate.post('/api/your-features', req);
    return data;
  },

  // update, delete 등
};
```

#### Step 3: Hooks 작성
Company feature의 hooks 패턴을 참고하세요.

#### Step 4: Components 작성
Page에 직접 UI를 작성하지 말고, 재사용 가능한 Component로 분리하세요.

#### Step 5: Pages 작성
Components를 조립만 하세요.

### 2. 기존 코드 수정 시

#### 체크리스트
- [ ] 공통 상수를 사용하고 있나요? (gradeLabel 등)
- [ ] 중복 로직을 hooks로 분리했나요?
- [ ] Page가 100줄 이하인가요?
- [ ] formatters를 사용하고 있나요?
- [ ] 공통 컴포넌트를 재사용하고 있나요?

#### 리팩토링 기준
```tsx
// ❌ Page가 이렇게 생겼다면 리팩토링 필요
export const SomePage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 직접 API 호출
  }, []);

  const handleSubmit = () => {
    // 복잡한 로직
  };

  return (
    <div>
      {/* 200줄 이상의 JSX */}
    </div>
  );
};

// ✅ 리팩토링 후
export const SomePage = () => {
  const { data, loading } = useSomeData();
  const { handleSubmit } = useSomeActions();

  if (loading) return <FullPageLoader />;

  return (
    <>
      <SomeHeader />
      <SomeContent data={data} onSubmit={handleSubmit} />
      <SomeSidebar />
    </>
  );
};
```

### 3. 공통 모듈 사용

#### formatters 사용
```tsx
import { formatBizNumber, formatDate } from '@/common/utils/formatters';

// ✅ 좋은 예
<span>{formatBizNumber(company.bizNumber)}</span>
<span>{formatDate(company.createdAt)}</span>

// ❌ 나쁜 예
<span>{company.bizNumber.replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3')}</span>
<span>{new Date(company.createdAt).toLocaleDateString('ko-KR')}</span>
```

#### 공통 컴포넌트 사용
```tsx
import {
  DetailPageHeader,
  EmptyState,
  FullPageLoader
} from '@/common/components';

// Loading state
if (loading) return <FullPageLoader />;

// Empty state
if (items.length === 0) {
  return <EmptyState message="등록된 항목이 없습니다." />;
}

// Detail page header
<DetailPageHeader
  title={item.name}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>
```

---

## 리팩토링 우선순위

### 🔴 Phase 1: 공통화 (즉시 시작)

#### 1-1. Labels 상수 통합
```tsx
// ✅ 생성: common/constants/labels.ts
export const GRADE_LABELS: Record<Grade, string> = {
  TYPE_1: "1종",
  TYPE_2: "2종",
  TYPE_3: "3종",
  TYPE_4: "4종",
  TYPE_5: "5종",
} as const;

export const SHAPE_LABELS: Record<Shape, string> = {
  CIRCULAR: "원형",
  RECTANGULAR: "사각형",
  OTHER: "기타",
} as const;

export const ORIENTATION_LABELS: Record<Orientation, string> = {
  VERTICAL: "수직",
  HORIZONTAL: "수평",
} as const;
```

**영향받는 파일 (7개):**
- [x] WorkplaceDetailPage.tsx
- [x] CompanyDetailPage.tsx
- [x] StackDetailPage.tsx
- [x] StackListPage.tsx
- [x] WorkplaceListPage.tsx
- [x] WorkplaceItem.tsx
- [x] WorkplaceListCard.tsx

#### 1-2. Formatters 확장
```tsx
// ✅ 추가: common/utils/formatters.ts
export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('ko-KR');
};

export const formatDateTime = (date: string | Date): string => {
  return new Date(date).toLocaleString('ko-KR');
};

export const formatNumber = (value: number): string => {
  return value.toLocaleString('ko-KR');
};
```

#### 1-3. useSearch Hook 생성
```tsx
// ✅ 생성: common/hooks/useSearch.ts
import { useState, useMemo } from 'react';

export const useSearch = <T extends Record<string, any>>(
  items: T[],
  searchFields: (keyof T)[]
) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = useMemo(() => {
    if (!searchTerm) return items;

    return items.filter((item) =>
      searchFields.some((field) =>
        String(item[field])
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    );
  }, [items, searchTerm, searchFields]);

  return { searchTerm, setSearchTerm, filtered };
};
```

**적용 대상:**
- [x] StackListPage.tsx
- [x] WorkplaceDetailPage.tsx

---

### 🟡 Phase 2: Workplace Feature 리팩토링 (1-2일)

#### 현재 문제
[WorkplaceDetailPage.tsx](ensolution-front/src/features/workplace/pages/WorkplaceDetailPage.tsx)가 모든 로직을 직접 처리:
- 직접 API 호출
- 직접 상태 관리
- 직접 필터링 로직
- 상수를 Page에 선언
- 300+ 줄의 복잡한 UI

#### 리팩토링 계획

**2-1. useWorkplaceDetail Hook 개선**
```tsx
// hooks/useWorkplaceDetail.ts
export const useWorkplaceDetail = (workplaceId: number) => {
  const [data, setData] = useState<WorkplaceDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const result = await workplaceApi.getWorkplaceDetail(workplaceId);
        setData(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [workplaceId]);

  return {
    workplace: data?.workplace,
    stacks: data?.stacks || [],
    loading
  };
};
```

**2-2. Components 분리**
```tsx
// components/WorkplaceInfoCard.tsx
export const WorkplaceInfoCard = ({ workplace }) => { ... };

// components/WorkplaceStackListCard.tsx
export const WorkplaceStackListCard = ({ stacks }) => { ... };

// components/WorkplaceSidebar.tsx
export const WorkplaceSidebar = ({ workplace, stackCount }) => { ... };
```

**2-3. Page 단순화**
```tsx
// pages/WorkplaceDetailPage.tsx (목표: 100줄 이하)
export const WorkplaceDetailPage = () => {
  const { workplaceId } = useParams();
  const { workplace, stacks, loading } = useWorkplaceDetail(Number(workplaceId));
  const { handleEdit, handleDelete } = useWorkplaceActions(workplace);
  const { searchTerm, setSearchTerm, filtered: filteredStacks } = useSearch(
    stacks,
    ['name', 'semsNumber']
  );

  if (loading) return <FullPageLoader />;
  if (!workplace) return <EmptyState />;

  return (
    <>
      <DetailPageHeader
        title={workplace.name}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <WorkplaceInfoCard workplace={workplace} />
          <WorkplaceStackListCard
            stacks={filteredStacks}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
        </div>
        <WorkplaceSidebar
          workplace={workplace}
          stackCount={stacks.length}
        />
      </div>
    </>
  );
};
```

**참고 사례:** [CompanyDetailPage.tsx](ensolution-front/src/features/company/pages/CompanyDetailPage.tsx)

---

### 🟢 Phase 3: Stack Feature 리팩토링 (3-5일)

#### 현재 문제
- [StackDetailPage.tsx](ensolution-front/src/features/stack/pages/StackDetailPage.tsx) 300+ 줄
- 상수 중복 (gradeLabel, shapeLabel, orientationLabel)
- 방지시설, 배출시설 렌더링 로직이 Page에 집중

#### 리팩토링 계획

**3-1. Components 분리**
```tsx
// components/StackInfoCard.tsx - 기본 정보
// components/PreventionSection.tsx - 방지시설 섹션
// components/PreventionDetailItem.tsx - 방지시설 상세
// components/FacilitySection.tsx - 배출시설 섹션
// components/TargetSection.tsx - 제거대상물질 섹션
// components/StackSidebar.tsx - 통계 정보
```

**3-2. Page 단순화**
```tsx
// pages/StackDetailPage.tsx (목표: 150줄 이하)
export const StackDetailPage = () => {
  const { stackId } = useParams();
  const { stack, loading } = useStackDetail(Number(stackId));

  if (loading) return <FullPageLoader />;
  if (!stack) return <EmptyState />;

  return (
    <>
      <DetailPageHeader title={stack.stack.name} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <StackInfoCard stack={stack.stack} />
          <PreventionSection preventions={stack.preventions} />
        </div>
        <StackSidebar stack={stack} />
      </div>
    </>
  );
};
```

---

### 🔵 Phase 4: 선택적 개선 사항 (장기)

#### 4-1. List Page 통합
제네릭 리스트 컴포넌트 생성 (필요시)

#### 4-2. ui vs components 폴더 정리
```
components/ - Container Components (hooks 사용 가능, 도메인 특화)
ui/         - Presentational Components (props만, 재사용 가능)
```

현재는 대부분 components만 사용 중. Auth feature의 ui 패턴 참고.

---

## 참고할 모범 사례

### ⭐ Company Feature (완벽한 관심사 분리)

#### Page 구조
[CompanyDetailPage.tsx](ensolution-front/src/features/company/pages/CompanyDetailPage.tsx)
```tsx
// ✅ Page는 조립만 (약 80줄)
export const CompanyDetailPage = () => {
  const { companyId } = useParams();
  const { company, workplaces, loading } = useCompanyDetail(Number(companyId));
  const { handleEdit, handleDelete } = useCompanyActions(company);
  // ...

  return (
    <>
      <DetailPageHeader {...} />
      <CompanyInfoCard {...} />
      <WorkplaceListCard {...} />
      <CompanySidebar {...} />
    </>
  );
};
```

#### Hooks 분리
```
hooks/
├── useCompanies.ts        # 리스트 조회
├── useCompanyDetail.ts    # 상세 조회
├── useCompanyForm.ts      # 폼 관리
└── useCompanyActions.ts   # 액션 (수정, 삭제)
```

각 hook이 단일 책임을 가짐.

#### Components 분리
```
components/
├── CompanyInfoCard.tsx      # 기본 정보
├── WorkplaceListCard.tsx    # 사업장 목록
├── WorkplaceItem.tsx        # 사업장 아이템
├── CompanySidebar.tsx       # 통계 정보
└── CompanyAddModal.tsx      # 추가 모달
```

재사용 가능하고 테스트하기 쉬운 구조.

---

### ⭐ Auth Feature (ui 폴더 활용)

#### ui vs components 분리
```
ui/
├── LoginForm.tsx          # Presentational
├── SignupHint.tsx         # Presentational
└── SocialLoginButton.tsx  # Presentational

pages/
└── LoginPage.tsx          # Container (조립)
```

**특징:**
- ui 컴포넌트는 props만 받음
- Page는 hooks를 사용하고 ui에 데이터 전달
- 재사용성이 높음

---

### ⭐ Common Utilities

#### formatters.ts
```tsx
// 사업자번호 포맷팅 (잘 구현됨)
export const formatBizNumber = (value: string): string => {
  const cleaned = value.replace(/\D/g, "");
  if (cleaned.length !== 10) return value;
  return cleaned.replace(/(\d{3})(\d{2})(\d{5})/, "$1-$2-$3");
};

export const stripBizNumber = (value: string): string => {
  return value.replace(/-/g, "");
};
```

**좋은 점:**
- 여러 곳에서 재사용됨
- 테스트하기 쉬움
- 비즈니스 로직 중앙화

---

## Quick Reference

### 새 기능 추가 체크리스트
- [ ] types 정의 (model/)
- [ ] API 함수 작성 (api/)
- [ ] Hooks 작성 (hooks/)
- [ ] Components 작성 (components/)
- [ ] Page 작성 (pages/) - 조립만!
- [ ] 공통 상수 사용 (constants/)
- [ ] 공통 유틸 사용 (utils/formatters.ts)
- [ ] 공통 컴포넌트 재사용 (common/components/)

### 코드 리뷰 체크리스트
- [ ] Page가 100줄 이하인가?
- [ ] 중복 상수가 없나?
- [ ] formatters를 사용하는가?
- [ ] hooks로 로직이 분리되었나?
- [ ] 공통 컴포넌트를 재사용하는가?
- [ ] 타입이 정의되어 있나?

### 파일 위치 가이드
| 내용 | 위치 |
|------|------|
| gradeLabel 등 상수 | `common/constants/labels.ts` |
| 날짜 포맷팅 | `common/utils/formatters.ts` |
| 검색 로직 | `common/hooks/useSearch.ts` |
| 로딩 UI | `<FullPageLoader />` |
| 빈 상태 UI | `<EmptyState />` |
| 상세 페이지 헤더 | `<DetailPageHeader />` |

---

## 도움이 필요하면

### 참고할 파일들
1. **모범 Page 구조:** [CompanyDetailPage.tsx](ensolution-front/src/features/company/pages/CompanyDetailPage.tsx)
2. **Hooks 패턴:** [useCompanyDetail.ts](ensolution-front/src/features/company/hooks/useCompanyDetail.ts)
3. **Component 분리:** [CompanyInfoCard.tsx](ensolution-front/src/features/company/components/CompanyInfoCard.tsx)
4. **ui 패턴:** [LoginForm.tsx](ensolution-front/src/features/auth/ui/LoginForm.tsx)

### Claude Code에게 요청하기
```
"CompanyDetailPage 패턴으로 WorkplaceDetailPage 리팩토링해줘"
"gradeLabel을 common/constants로 옮기고 모든 파일에 적용해줘"
"useSearch 훅을 만들어서 검색 로직 통합해줘"
```

---

**마지막 업데이트:** 2025-11-30
**프로젝트:** Ensolution Front-End
**작성자:** Claude Code
