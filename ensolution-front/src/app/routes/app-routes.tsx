import { BrowserRouter, Routes, Route } from "react-router";

import { PublicRoute, ProtectedRoute } from '.';
import { MainLayout } from '../layouts';

import { LoginPage, UserProfilePage } from '@auth/pages/index';

import { HomePage } from '@home/pages/index';

import { TeamListPage } from '@agency/pages/index';
import { EquipmentListPage } from '@/features/equipment/pages';

import { CompanyListPage, CompanyDetailPage } from '@company/pages/index';
import { WorkplaceListPage, WorkplaceDetailPage } from '@workplace/pages/index';

import { StackListPage, StackDetailPage } from '@stack/pages/index';
import { PollutantPage } from '@pollutant/pages/index';

import { ScheduleListPage, ScheduleDetailPage, ScheduleAddPage } from "@schedule/pages";

import { TestPage } from "@/shared/test/test-page";

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
        } />
      
      <Route path="/test" element= {< TestPage/>}/>

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
        <Route path="/company" element={<CompanyListPage />} />
        <Route path="/company/:companyId" element={<CompanyDetailPage />} />
        <Route path="/workplace" element={<WorkplaceListPage />} />
        <Route path="/workplace/:workplaceId" element={<WorkplaceDetailPage />} />
        <Route path="/stack" element={<StackListPage />} />
        <Route path="/stack/:stackId" element={<StackDetailPage />} />

        {/* 측정대행업체 */}
        <Route path="/agency/team" element={<TeamListPage />} />

        <Route path="/equipment" element={<EquipmentListPage />} />

        {/* 실험실 */}
        <Route path="/lab/pollutant" element={<PollutantPage />} />

        {/* 측정일정 */}
        <Route path="/schedule" element={<ScheduleListPage />} />
        <Route path="/schedule/add" element={<ScheduleAddPage />} />
        <Route path="/schedule/:scheduleId" element={<ScheduleDetailPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);