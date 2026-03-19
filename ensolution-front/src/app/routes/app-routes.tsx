import { BrowserRouter, Routes, Route } from "react-router";

import { PublicRoute, ProtectedRoute } from '.';
import { Layout } from '@shared/ui/layouts';

import { LoginPage } from '@pages/login';
import { Dashboard } from '@pages/dashboard';
import { ProfilePage } from "@pages/profile";

import { TeamPage, EquipmentPage } from '@pages/agency';

import { CompanyPage, CompanyDetailPage } from '@pages/company';
import { WorkplacePage, WorkplaceDetailPage } from '@pages/workplace';

import { StackPage, StackDetailPage } from '@pages/stack';
import { PollutantListPage } from '@pollutant/pages/index';

import { PlanPage, PlanRegisterPage, PlanDetailPage } from "@pages/plan";

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
        } />

      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/me" element={<ProfilePage />} />

        {/* 측정대행 의뢰업체 */}
        <Route path="/company" element={<CompanyPage />} />
        <Route path="/company/:companyId" element={<CompanyDetailPage />} />
        <Route path="/workplace" element={<WorkplacePage />} />
        <Route path="/workplace/:workplaceId" element={<WorkplaceDetailPage />} />
        <Route path="/stack" element={<StackPage />} />
        <Route path="/stack/:stackId" element={<StackDetailPage />} />

        <Route path="/equipment" element={<EquipmentPage />} />
        <Route path="/team" element={<TeamPage />} />

        {/* 실험실 */}
        <Route path="/pollutant" element={<PollutantListPage />} />

        {/* 측정일정 */}
        <Route path="/plan" element={<PlanPage />} />
        <Route path="/plan/add" element={<PlanRegisterPage />} />
        <Route path="/plan/:planId" element={<PlanDetailPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);