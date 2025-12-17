import { BrowserRouter, Routes, Route } from 'react-router';

import { ToastProvider } from '@common/components';
import { ProtectedRoute, MainLayout } from '@common/routes/index';

import { LoginPage, UserProfilePage } from '@auth/pages/index';

import { HomePage, ClientPage } from '@home/pages/index';

import { TeamListPage, VehicleListPage, TeamDetailPage } from '@agency/pages/index';

import { CompanyListPage, CompanyDetailPage } from '@company/pages/index';
import { WorkplaceListPage, WorkplaceDetailPage } from '@workplace/pages/index';

import { StackListPage, StackDetailPage } from '@stack/pages/index';
import { PollutantPage } from '@pollutant/pages/index';

import { ScheduleListPage, ScheduleDetailPage, ScheduleAddPage } from "@schedule/pages";

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />

          <Route
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<HomePage />} />
            <Route path="/me" element={<UserProfilePage />} />

            {/* 측정대행 의뢰업체 */}
            <Route path="/client/company" element={<CompanyListPage />} />
            <Route path="/client/company/:companyId" element={<CompanyDetailPage />} />
            <Route path="/client/workplace" element={<WorkplaceListPage />} />
            <Route path="/client/workplace/:workplaceId" element={<WorkplaceDetailPage />} />
            <Route path="/client/stack" element={<StackListPage />} />
            <Route path="/client/stack/:stackId" element={<StackDetailPage />} />

            {/* 측정대행업체 */}
            <Route path="/agency/team" element={<TeamListPage />} />
            <Route path="/agency/team/:teamId" element={<TeamDetailPage />} />
            <Route path="/agency/vehicle" element={<VehicleListPage />} />

            {/* 실험실 */}
            <Route path="/lab/pollutant" element={<PollutantPage />} />

            {/* 레거시 리다이렉트 (선택사항) */}
            <Route path="/client" element={<ClientPage />} />

            {/* 측정일정 */}
            <Route path="/schedule" element={<ScheduleListPage />} />
            <Route path="/schedule/add" element={<ScheduleAddPage />} />
            <Route path="/schedule/:scheduleId" element={<ScheduleDetailPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
