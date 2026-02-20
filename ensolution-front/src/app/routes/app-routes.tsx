import { BrowserRouter, Routes, Route } from "react-router";

import { PublicRoute, ProtectedRoute } from '.';
import { MainLayout } from '../layouts';

import { LoginPage, UserProfilePage } from '@auth/pages/index';

import { HomePage } from '@home/pages/index';

import { EquipmentListPage } from '@/features/equipment/pages';
import { TeamListPage } from '@agency/pages';

import { CompanyListPage, CompanyDetailPage } from '@company/pages/index';
import { WorkplaceListPage, WorkplaceDetailPage } from '@workplace/pages/index';

import { StackListPage, StackDetailPage } from '@stack/pages/index';
import { PollutantListPage } from '@pollutant/pages/index';

import { PlanListPage, PlanRegisterPage, PlanDetailPage } from "@plan/pages";

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

        <Route path="/equipment" element={<EquipmentListPage />} />
        <Route path="/team" element={<TeamListPage />} />

        {/* 실험실 */}
        <Route path="/lab/pollutant" element={<PollutantListPage />} />

        {/* 측정일정 */}
        <Route path="/plan" element={<PlanListPage />} />
        <Route path="/plan/add" element={<PlanRegisterPage />} />
        <Route path="/plan/:planId" element={<PlanDetailPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);