import { BrowserRouter, Routes, Route } from 'react-router';
import { ProtectedRoute, MainLayout } from '@routes/index';
import { LoginPage, UserProfilePage } from '@auth/pages/index';
import { HomePage } from '@home/pages/index';
import { CompanyListPage, CompanyDetailPage } from '@company/pages/index';
import { WorkplaceListPage, WorkplaceDetailPage } from '@workplace/pages/index';
import { StackListPage, StackDetailPage } from '@stack/pages/index';

function App() {
  return (
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
          <Route path="/home" element={<HomePage />} />
          <Route path="/me" element={<UserProfilePage />} />
          <Route path="/companies" element={<CompanyListPage />} />
          <Route path="/companies/:companyId" element={<CompanyDetailPage />} />
          <Route path="/workplaces" element={<WorkplaceListPage />} />
          <Route path="/workplaces/:workplaceId" element={<WorkplaceDetailPage />} />
          <Route path="/stacks" element={<StackListPage />} />
          <Route path="/stacks/:stackId" element={<StackDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
