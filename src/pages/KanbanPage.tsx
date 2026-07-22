import { useMemo } from 'react';
import { useJobStore } from '../features/jobs/store/useJobStore';
import type { JobApplicationStatus } from '../features/jobs/domain/types';

interface StatusColumn {
  label: string;
  status: JobApplicationStatus;
}

const statusColumns: StatusColumn[] = [
  { label: 'Aplicadas', status: 'APPLIED' },
  { label: 'Entrevista RH', status: 'HR_INTERVIEW' },
  { label: 'Entrevista Técnica', status: 'TECH_INTERVIEW' },
  { label: 'Oferta', status: 'OFFER' },
  { label: 'Rejeitadas', status: 'REJECTED' },
];

export function KanbanPage() {
  const jobs = useJobStore((state) => state.jobs);

  const jobsByStatus = useMemo(
    () =>
      statusColumns.map((column) => ({
        ...column,
        jobs: jobs.filter((job) => job.status === column.status),
      })),
    [jobs],
  );

  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <h2 className="text-3xl font-semibold text-white">Meu Kanban ({jobs.length} vagas)</h2>
        <p className="max-w-2xl text-base text-slate-400">
          Visualize e organize suas candidaturas por etapa do processo seletivo.
        </p>
      </div>

      <div className="grid gap-4 xl:grid-cols-5">
        {jobsByStatus.map((column) => (
          <section
            className="rounded-lg border border-white/10 bg-white/[0.03] p-4"
            key={column.status}
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-slate-100">{column.label}</h3>
              <span className="rounded-full bg-slate-800 px-2 py-1 text-xs font-medium text-slate-300">
                {column.jobs.length}
              </span>
            </div>

            <ul className="space-y-3">
              {column.jobs.map((job) => (
                <li className="rounded-md border border-white/10 bg-slate-900 p-3" key={job.id}>
                  <p className="text-sm font-semibold text-white">{job.company}</p>
                  <p className="mt-1 text-sm text-slate-400">{job.position}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </section>
  );
}
