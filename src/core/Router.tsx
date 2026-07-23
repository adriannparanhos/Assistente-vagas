import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DashboardPage } from '../pages/DashboardPage';
import { KanbanPage } from '../pages/KanbanPage';
import { JobDetailsPage } from '../pages/JobDetailsPage';
import { ResumesPage } from '../pages/ResumesPage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { MainLayout } from '../shared/ui/MainLayout';
import { ProtectedRoute } from '../shared/components/ProtectedRoute';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<LoginPage />} path="/login" />
        <Route element={<RegisterPage />} path="/register" />

        {/* Private Routes */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout>
                <Routes>
                  <Route element={<KanbanPage />} path="/" />
                  <Route element={<JobDetailsPage />} path="/jobs/:id" />
                  <Route element={<DashboardPage />} path="/dashboard" />
                  <Route element={<ResumesPage />} path="/resumes" />
                </Routes>
              </MainLayout>
            </ProtectedRoute>
          }
          path="/*"
        />
      </Routes>
    </BrowserRouter>
  );
}
