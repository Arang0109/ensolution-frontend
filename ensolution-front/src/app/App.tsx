import { BrowserRouter, Routes, Route } from 'react-router';
import { ProtectedRoute, MainLayout } from '@routes/index';
import { LoginPage, UserProfilePage } from '@auth/pages/index';
import { HomePage, ClientPage } from '@home/pages/index';
import { CompanyListPage, CompanyDetailPage } from '@company/pages/index';
import { WorkplaceListPage, WorkplaceDetailPage } from '@workplace/pages/index';
import { StackListPage, StackDetailPage } from '@stack/pages/index';
import { PollutantPage } from '@pollutant/pages/index';
import { ToastProvider } from '@/common/contexts';

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
            <Route path="/home" element={<HomePage />} />
            <Route path="/client" element={<ClientPage />} />
            <Route path="/me" element={<UserProfilePage />} />
            <Route path="/company" element={<CompanyListPage />} />
            <Route path="/company/:companyId" element={<CompanyDetailPage />} />
            <Route path="/workplace" element={<WorkplaceListPage />} />
            <Route path="/workplace/:workplaceId" element={<WorkplaceDetailPage />} />
            <Route path="/stack" element={<StackListPage />} />
            <Route path="/stack/:stackId" element={<StackDetailPage />} />
            <Route path="/pollutant" element={<PollutantPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
