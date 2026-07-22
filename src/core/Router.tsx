import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DashboardPage } from '../pages/DashboardPage';
import { KanbanPage } from '../pages/KanbanPage';
import { JobDetailsPage } from '../pages/JobDetailsPage';
import { ResumesPage } from '../pages/ResumesPage';
import { MainLayout } from '../shared/ui/MainLayout';

export function AppRouter() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route element={<KanbanPage />} path="/" />
          <Route element={<JobDetailsPage />} path="/jobs/:id" />
          <Route element={<DashboardPage />} path="/dashboard" />
          <Route element={<ResumesPage />} path="/resumes" />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
