import { ArrowLeft, Building2, FileText } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useJobStore } from '../features/jobs/store/useJobStore';
import { MarkdownEditor } from '../shared/ui/MarkdownEditor';

export function JobDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const jobs = useJobStore((state) => state.jobs);
  const updateJobDetails = useJobStore((state) => state.updateJobDetails);

  const job = jobs.find((j) => j.id === id);

  if (!job) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h2 className="text-2xl font-semibold text-gray-100">Vaga não encontrada</h2>
        <p className="mt-2 text-gray-400">Não foi possível encontrar a candidatura solicitada.</p>
        <Link
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-cyan-400 hover:text-cyan-300"
          to="/"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para o Kanban
        </Link>
      </div>
    );
  }

  const handleSaveNotes = (newContent: string) => {
    updateJobDetails(job.id, { notes: newContent });
    toast.success('Anotações salvas com sucesso!');
  };

  return (
    <section className="space-y-6">
      <div>
        <Link
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 transition-colors hover:text-gray-100"
          to="/"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para o Kanban
        </Link>
      </div>

      <header className="flex flex-col gap-4 rounded-lg border border-gray-800 bg-gray-900/50 p-6 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">{job.position}</h1>
          <div className="mt-2 flex items-center gap-2 text-gray-300">
            <Building2 className="h-4 w-4 text-gray-500" />
            <span className="text-sm">{job.company}</span>
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-700 bg-gray-800 px-3 py-1 text-xs font-medium text-gray-200">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            Status: {job.status}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-700 bg-gray-800 px-3 py-1 text-xs font-medium text-gray-200">
            <FileText className="h-3.5 w-3.5 text-gray-400" />
            {job.resumeVersion}
          </span>
        </div>
      </header>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-100">CRM & Anotações</h2>
        <MarkdownEditor initialValue={job.notes || ''} onSave={handleSaveNotes} />
      </div>
    </section>
  );
}
