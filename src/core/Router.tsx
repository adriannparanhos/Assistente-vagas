import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DashboardPage } from '../pages/DashboardPage';
import { KanbanPage } from '../pages/KanbanPage';
import { MainLayout } from '../shared/ui/MainLayout';

export function AppRouter() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route element={<KanbanPage />} path="/" />
          <Route element={<DashboardPage />} path="/dashboard" />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
