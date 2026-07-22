import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CalendarDays, FileText, GripVertical } from 'lucide-react';
import type { JobApplication } from '../domain/types';

interface JobCardProps {
  job: JobApplication;
}

const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

export function JobCard({ job }: JobCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: job.id,
    data: {
      type: 'job',
      job,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <article
      className={[
        'touch-none rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-lg shadow-black/20 transition-colors',
        'hover:border-cyan-400/50 hover:bg-gray-800/80',
        isDragging ? 'z-20 opacity-60 ring-2 ring-cyan-400' : '',
      ].join(' ')}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold leading-5 text-gray-100">{job.position}</h3>
          <p className="mt-1 text-sm text-gray-300">{job.company}</p>
        </div>
        <GripVertical className="h-4 w-4 shrink-0 text-gray-500" aria-hidden="true" />
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
        <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
        <span>{dateFormatter.format(new Date(`${job.appliedDate}T00:00:00`))}</span>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <span className="inline-flex max-w-full items-center gap-1 rounded-md border border-cyan-400/20 bg-cyan-400/10 px-2 py-1 text-xs font-medium text-cyan-200">
          <FileText className="h-3 w-3 shrink-0" aria-hidden="true" />
          <span className="truncate">{job.resumeVersion}</span>
        </span>

        {job.salaryRange ? (
          <span className="shrink-0 text-xs font-medium text-emerald-300">{job.salaryRange}</span>
        ) : null}
      </div>
    </article>
  );
}
