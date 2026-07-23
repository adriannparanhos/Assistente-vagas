import { Plus, LogOut } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { JobForm } from '../../features/jobs/components/JobForm';
import { useAuthStore } from '../../features/auth/store/useAuthStore';
import { Modal } from './Modal';

interface MainLayoutProps {
  children: ReactNode;
}

interface NavigationItem {
  label: string;
  to: string;
}

const navigationItems: NavigationItem[] = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Kanban', to: '/' },
  { label: 'Currículos', to: '/resumes' },
];

export function MainLayout({ children }: MainLayoutProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <aside className="fixed inset-x-0 top-0 z-20 border-b border-white/10 bg-slate-950/95 px-4 backdrop-blur md:inset-y-0 md:left-0 md:right-auto md:w-64 md:border-b-0 md:border-r md:px-5">
        <div className="flex h-16 items-center justify-between md:h-full md:flex-col md:items-stretch md:justify-start">
          <div className="flex items-center gap-3 md:h-20">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-400 text-sm font-bold text-slate-950">
              AV
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Assistente Vagas</p>
              <p className="hidden text-xs text-slate-400 md:block">Application Tracker</p>
            </div>
          </div>

          <nav className="flex items-center gap-2 overflow-x-auto md:mt-8 md:flex-col md:items-stretch md:overflow-visible">
            {navigationItems.map((item) => (
              <NavLink
                className={({ isActive }) =>
                  [
                    'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-cyan-400 text-slate-950'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white',
                  ].join(' ')
                }
                key={item.to}
                to={item.to}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10 hover:text-red-300 md:mt-auto md:mb-6"
            type="button"
          >
            <LogOut className="h-4 w-4" />
            <span>Sair</span>
          </button>
        </div>
      </aside>

      <div className="flex min-h-screen flex-col pt-16 md:pl-64 md:pt-0">
        <header className="sticky top-16 z-10 border-b border-white/10 bg-slate-950/80 px-6 py-4 backdrop-blur md:top-0">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-cyan-300">
                Job Application Tracker
              </p>
              <h1 className="text-xl font-semibold text-white">Painel de Candidaturas</h1>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-200 sm:inline-flex">
                Workspace ativo
              </span>
              <button
                className="inline-flex w-fit items-center gap-2 rounded-md bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-300"
                onClick={() => setIsModalOpen(true)}
                type="button"
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
                Nova Aplicação
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 px-6 py-8 sm:px-8 lg:px-10">{children}</main>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Nova candidatura"
      >
        <JobForm onSuccess={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
}
