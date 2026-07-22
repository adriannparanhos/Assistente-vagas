import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { JobCard } from './JobCard';
import type { JobApplication, JobApplicationStatus } from '../domain/types';

interface KanbanColumnProps {
  title: string;
  status: JobApplicationStatus;
  jobs: JobApplication[];
}

export function KanbanColumn({ title, status, jobs }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
    data: {
      type: 'column',
      status,
    },
  });

  return (
    <section
      className={[
        'flex min-h-[28rem] flex-col rounded-lg border bg-gray-900 transition-colors',
        isOver ? 'border-cyan-400/70 bg-gray-800/70' : 'border-gray-800',
      ].join(' ')}
      ref={setNodeRef}
    >
      <header className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-gray-800 bg-gray-900/95 px-4 py-3 backdrop-blur">
        <h2 className="text-sm font-semibold text-gray-100">{title}</h2>
        <span className="rounded-full bg-gray-800 px-2 py-1 text-xs font-medium text-gray-300">
          {jobs.length}
        </span>
      </header>

      <SortableContext items={jobs.map((job) => job.id)} strategy={verticalListSortingStrategy}>
        <div className="flex flex-1 flex-col gap-3 p-3">
          {jobs.map((job) => (
            <JobCard job={job} key={job.id} />
          ))}

          {jobs.length === 0 ? (
            <div className="flex min-h-32 flex-1 items-center justify-center rounded-lg border border-dashed border-gray-700 px-4 text-center text-sm text-gray-500">
              Nenhuma candidatura nesta etapa.
            </div>
          ) : null}
        </div>
      </SortableContext>
    </section>
  );
}
