import { KanbanBoard } from '../features/jobs/components/KanbanBoard';

export function KanbanPage() {
  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <h2 className="text-3xl font-semibold text-gray-100">Meu Kanban</h2>
        <p className="max-w-2xl text-base text-gray-300">
          Visualize e organize suas candidaturas por etapa do processo seletivo.
        </p>
      </div>

      <KanbanBoard />
    </section>
  );
}
