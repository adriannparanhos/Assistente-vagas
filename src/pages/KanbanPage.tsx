import { useEffect } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import { KanbanBoard } from '../features/jobs/components/KanbanBoard';
import { useJobStore } from '../features/jobs/store/useJobStore';

export function KanbanPage() {
  const fetchJobs = useJobStore((state) => state.fetchJobs);
  const isLoading = useJobStore((state) => state.isLoading);
  const error = useJobStore((state) => state.error);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <h2 className="text-3xl font-semibold text-gray-100">Meu Kanban</h2>
        <p className="max-w-2xl text-base text-gray-300">
          Visualize e organize suas candidaturas por etapa do processo seletivo.
        </p>
      </div>

      {isLoading && (
        <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-gray-800 bg-gray-900/30">
          <div className="flex flex-col items-center text-cyan-400">
            <Loader2 className="h-8 w-8 animate-spin" />
            <p className="mt-4 text-sm font-medium text-gray-400">Buscando suas vagas...</p>
          </div>
        </div>
      )}

      {!isLoading && error && (
        <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-red-900/50 bg-red-950/20">
          <div className="flex flex-col items-center text-red-400">
            <AlertCircle className="h-8 w-8" />
            <p className="mt-4 text-sm font-medium">{error}</p>
          </div>
        </div>
      )}

      {!isLoading && !error && <KanbanBoard />}
    </section>
  );
}
