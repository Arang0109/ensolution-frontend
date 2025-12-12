# CLAUDE.md

이 파일은 Claude Code(claude.ai/code)가 이 저장소의 코드를 다룰 때 참고할 가이드를 제공합니다.

## 개발 명령어

```bash
# HMR이 포함된 개발 서버 시작
npm run dev

# 프로덕션 빌드 (TypeScript 컴파일 후 Vite 빌드 실행)
npm run build

# 코드 린트
npm run lint

# 프로덕션 빌드 미리보기
npm run preview
```

## 아키텍처 개요

### 프로젝트 구조

이 프로젝트는 공통 유틸리티를 공유하는 기능 기반 아키텍처를 따르는 React + TypeScript + Vite 애플리케이션입니다:

```
src/
├── app/              # 애플리케이션 루트 및 환경 설정
├── common/           # 공유 유틸리티 및 컴포넌트
│   ├── api/         # Axios 인스턴스 (axiosPrivate, axiosPublic)
│   ├── model/       # 공유 타입 및 enum
│   ├── routes/      # 라우트 컴포넌트 (ProtectedRoute, MainLayout)
│   └── utils/       # 유틸리티 함수
└── features/        # 기능 모듈
    ├── auth/        # 인증 기능
    ├── home/        # 홈 기능
    ├── company/     # Company(의뢰업체)
    ├── workplace/   # Workplace(사업장)
    └── stack/       # Stack(측정구/굴뚝)
```

각 Feature 내부 구조는 동일한 구조를 따라야 합니다:
- `api/` - 해당 기능의 API 호출
- `hooks/` - 커스텀 React 훅
- `model/` - 기능별 타입
- `pages/` - 페이지 컴포넌트
- `ui/` - UI 컴포넌트

### 경로 별칭(Path Aliases)

프로젝트는 `vite.config.ts`와 `tsconfig.app.json`에 설정된 경로 별칭을 사용합니다:

- `@/` → `src/`
- `@app/` → `src/app/`
- `@api/` → `src/common/api/`
- `@model/` → `src/common/model/`
- `@routes/` → `src/common/route/`
- `@home/` → `src/features/home/`
- `@auth/` → `src/features/auth/`
- `@company/` → `src/features/company/`
- `@workplace/` → `src/features/workplace/`
- `@stack/` → `src/features/stack/`

### 인증 시스템

애플리케이션은 자동 토큰 갱신 기능이 있는 JWT 기반 인증 플로우를 구현합니다:

1. **두 개의 Axios 인스턴스**:
   - `axiosPublic` - 인증되지 않은 요청용 (로그인, 회원가입)
   - `axiosPrivate` - 자동 토큰 관리 기능이 있는 인증된 요청용

2. **토큰 갱신 플로우** (`src/common/api/axiosPrivate.ts`):
   - AccessToken은 `localStorage`에 저장됨
   - Request 인터셉터가 자동으로 Bearer 토큰을 첨부
   - Response 인터셉터가 401 에러를 처리하여 `/api/auth/refresh`를 통해 토큰 갱신 시도
   - 갱신 실패 시 localStorage를 지우고 로그인 페이지로 리다이렉트

3. **라우트 보호** (`src/common/routes/ProtectedRouteProps.tsx`):
   - `ProtectedRoute` 컴포넌트가 localStorage의 `accessToken` 확인
   - 토큰이 없으면 `/`로 리다이렉트

### API 응답 구조

모든 API 응답은 `src/common/model/api.types.ts`에 정의된 일관된 구조를 따릅니다:

```typescript
interface ApiResponseMessage<T> {
  success: boolean;
  message: string;
  data: T;
}
```

### 라우팅 아키텍처

애플리케이션은 2단계 라우트 구조를 가진 React Router v7을 사용합니다:

1. **공개 라우트** (인증 불필요):
   - `/` - 인증/로그인 페이지
   - `/test` - 테스트 페이지

2. **보호된 라우트** (인증 필요):
   - `<ProtectedRoute>` 컴포넌트로 래핑됨
   - 일관된 레이아웃을 위해 `<MainLayout>` 아래에 중첩됨
   - `/home` - 홈 페이지
   - `/profile` - 사용자 프로필
   - `/companies` - 측정대행 의뢰업체 목록
   - `/companies/:companyId` - 측정대행 의뢰업체 상세
   - `/workplaces` - 측정대상 사업장 목록
   - `/workplaces/:workplaceId` - 측정대상 사업장 상세
   - `/stacks` - 측정시설 목록
   - `/stacks/:stackId` - 측정시설 상세

### 도메인 모델

애플리케이션의 핵심 도메인 모델들은 `src/features/workplace/model/workplace.types.ts`에 정의되어 있습니다:

#### 1. Company (측정대행 의뢰업체)

```typescript
interface Company {
  id: number;               // 측정대행 의뢰업체 고유 ID
  name: string;             // 의뢰업체명
  address: string;          // 의뢰업체 주소
  ceoName: string;          // 대표자명
  bizNumber: string;        // 의뢰업체 사업자등록번호
  remark: string;           // 비고
  createdAt: date;          // 생성일
  modifiedAt: date;         // 수정일
}
```

**등록 요청 (CompanyRegisterRequest)**:
```typescript
interface CompanyRegisterRequest {
  name: string;             // 의뢰업체명
  address: string;          // 의뢰업체 주소
  ceoName: string;          // 대표자명
  bizNumber: string;        // 의뢰업체 사업자등록번호
  remark: string;           // 비고
}
```

**수정 요청 (CompanyUpdateRequest)**:
```typescript
interface CompanyUpdateRequest {
  name: string;             // 의뢰업체명
  address: string;          // 의뢰업체 주소
  ceoName: string;          // 대표자명
  bizNumber: string;        // 의뢰업체 사업자등록번호
  remark: string;           // 비고
}
```

**상세 응답 (CompanyDetailReponse)**:
```typescript
interface CompanyDetailResponse {
  company: Company           // 측정대행 의뢰업체
  workplaces: Workplace[]    // 측정대상 사업장 목록
}
```

#### 2. Workplace (측정대상 사업장)

```typescript
interface Workplace {
  id: number;               // 측정대상 사업장 고유 ID
  companyId: number;        // 측정대행 의뢰업체 고유 ID (FK)
  name: string;             // 사업장명
  address: string;          // 사업장 주소
  bizNumber: string;        // 사업장 사업자등록번호
  businessCategory: string; // 업종
  grade: Grade;             // 사업장 규모 (TYPE_1~5)
  remark: string;           // 비고
  createdAt: date;          // 생성일
  modifiedAt: date;         // 수정일
}
```

**등록 요청 (WorkplaceRegisterRequest)**:
```typescript
interface WorkplaceRegisterRequest {
  name: string;             // 사업장명
  companyId: number;        // 측정대행 의뢰업체 고유 ID (FK)
  address: string;          // 사업장 주소
  bizNumber: string;        // 사업장 사업자등록번호
  businessCategory: string; // 업종
  grade: Grade;             // 사업장 규모 (TYPE_1~5)
  remark: string;           // 비고
}
```

**수정 요청 (WorkplaceUpdateRequest)**:
```typescript
interface WorkplaceUpdateRequest {
  name: string;             // 사업장명
  address: string;          // 사업장 주소
  bizNumber: string;        // 사업장 사업자등록번호
  businessCategory: string; // 업종
  grade: Grade;             // 사업장 규모 (TYPE_1~5)
  remark: string;           // 비고
}
```

**상세 응답 (WorkplaceDetailResponse)**:
```typescript
interface WorkplaceDetailResponse {
  workplace: Workplace;       // 측정대상 사업장
  stacks: Stack[];    // 측정시설 목록
}
```

#### 3. Stack (측정시설/굴뚝)

```typescript
interface Stack {
  id: number;               // 측정시설 고유 ID
  workplaceId: number;      // 측정대상 사업장 고유 ID
  name: string;             // 측정시설명
  semsNumber: string;       // 굴뚝번호 (SEMS)
  grade: Grade;             // 배출구 규모 (TYPE_1~5)
  height: string;           // 배출구 높이
  horizontalLength: number; // 측정시설 가로 길이
  verticalLength: number;   // 측정시설 세로 길이
  shape: Shape;             // 측정시설 모양 (사각, 원형, 기타)
  orientation: Orientation; // 측정시설 방향 (수평, 수직)
  remark: string;           // 비고
  createdAt: date;          // 생성일
  modifiedAt: date;         // 수정일
}
```

**등록 요청 (StackRegisterRequest)**:
```typescript
interface StackRegisterRequest {
  name: string;             // 측정시설명
  workplaceId: number;      // 측정대상 사업장 고유 ID
  semsNumber: string;       // 굴뚝번호 (SEMS)
  grade: Grade;             // 배출구 규모 (TYPE_1~5)
  height: string;           // 배출구 높이
  horizontalLength: number; // 측정시설 가로 길이
  verticalLength: number;   // 측정시설 세로 길이
  shape: Shape;             // 측정시설 모양 (사각, 원형, 기타)
  orientation: Orientation; // 측정시설 방향 (수평, 수직)
  remark: string;           // 비고
}
```

**수정 요청 (StackUpdateRequest)**:
```typescript
interface StackUpdateRequest {
  name: string;             // 측정시설명
  semsNumber: string;       // 굴뚝번호 (SEMS)
  grade: Grade;             // 배출구 규모 (TYPE_1~5)
  height: string;           // 배출구 높이
  horizontalLength: number; // 측정시설 가로 길이
  verticalLength: number;   // 측정시설 세로 길이
  shape: Shape;             // 측정시설 모양 (사각, 원형, 기타)
  orientation: Orientation; // 측정시설 방향 (수평, 수직)
  remark: string;           // 비고
}
```

**상세 응답 (StackDetailResponse)**:
```typescript
interface StackDetailResponse {
  stack: Stack;             // 측정시설
  preventions: Prevention[] // 방지시설 목록
}
```

#### 4. Prevention (방지시설)

```typescript
interface Prevention {
  id: number;                 // 방지시설 ID
  stackId: number;            // 측정시설 ID
  name: string;               // 방지시설명
  remark: string;             // 비고
  createdAt: date;            // 생성일
  modifiedAt: date;           // 수정일
}
```

#### 5. Facility (배출시설)

```typescript
interface Facility {
  id: number;                 // 배출시설 ID
  preventionId: number;       // 방지시설 ID
  name: string;               // 배출시설명
  fuelUsage: string;          // 사용연료
  itemOutput: string;         // 생산제품
  fuelInput: string;          // 연료투입량
  fuelType: string;           // 연료종류
  remark: string;             // 비고
  createdAt: date;            // 생성일
  modifiedAt: date;           // 수정일
}
```

#### 6. Target (측정대상물질)

```typescript
interface Target {
  id: number;                 // 대상물질 ID
  preventionId: number;       // 방지시설 ID
  targetSubstance: string;    // 측정대상물질
  removalEfficiency: number;  // 제거효율 (%)
  createdAt: date;            // 생성일
  modifiedAt: date;           // 수정일
}
```

#### 7. Users (사용자)

```typescript
interface Users {
  id: number;
  teamId: number;
  username: string;
  password: string;
  name: string;
  grade: string;
  department: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
  status: string;
  createdAt: date;
  updatedAt: date
}
```

#### 공통 타입

**Grade (규모 분류)**:
```typescript
type Grade = 'TYPE_1' | 'TYPE_2' | 'TYPE_3' | 'TYPE_4' | 'TYPE_5';
```

**Shape (모양 분류)**:
```typescript
type Shape = 'CIRCULAR' | 'RECTANGULAR' | 'OTHER';
```

**Orientataion (방향 분류)**:
```typescript
type Orientataion = 'VERTICAL' | 'HORIZONTAL';
```

### 백엔드 통합

- 개발 백엔드: `http://localhost:8080/api`
- 프로덕션 백엔드: `/api` (상대 경로)
- 개발 환경에서 `vite.config.ts`에 API 프록시 설정
- 모든 요청은 쿠키 기반 리프레시 토큰을 위해 `withCredentials: true` 사용

### 주요 기술

- **React 19** - 훅과 함수형 컴포넌트 사용
- **TypeScript** - strict 모드 활성화
- **Vite** - 빌드 도구 및 HMR
- **React Router v7** - 라우팅
- **Axios** - HTTP 요청
- **Zustand** - 상태 관리 (필요시)
- **Tailwind CSS v4** - 스타일링
- **Day.js** - 날짜 포맷팅

### TypeScript 설정

- 포괄적인 린팅 규칙과 함께 strict 모드 활성화
- `noUnusedLocals` 및 `noUnusedParameters` 적용
- Target: ES2022
- Module resolution: bundler 모드
- Verbatim module syntax 필수

### 코드 스타일

- TypeScript, React Hooks, React Refresh 플러그인으로 ESLint 설정
- 사용하지 않는 변수나 매개변수 허용 안 함
- 엄격한 타입 체킹 적용
