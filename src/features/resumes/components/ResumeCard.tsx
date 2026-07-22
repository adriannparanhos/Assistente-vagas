import { Edit, Trash, Download, FileText } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Modal } from '../../../shared/ui/Modal';
import { useResumeStore, type Resume } from '../store/useResumeStore';
import { ResumeForm } from './ResumeForm';
import { downloadBase64Pdf } from '../../../shared/utils/fileUtils';

interface ResumeCardProps {
  resume: Resume;
}

const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

export function ResumeCard({ resume }: ResumeCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const deleteResume = useResumeStore((state) => state.deleteResume);

  function handleDelete() {
    if (window.confirm('Deseja realmente excluir este currículo?')) {
      deleteResume(resume.id);
      toast.success('Currículo excluído com sucesso!');
    }
  }

  function handleDownload() {
    if (resume.fileBase64 && resume.fileName) {
      downloadBase64Pdf(resume.fileBase64, resume.fileName);
    }
  }

  return (
    <>
      <article className="rounded-lg border border-gray-700 bg-gray-800 p-5 shadow-sm transition-colors hover:border-cyan-400/50">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="truncate text-lg font-semibold text-gray-100">{resume.name}</h3>
            <p className="mt-1 text-sm font-medium text-cyan-300">{resume.targetRole}</p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              className="rounded p-1.5 text-gray-400 transition-colors hover:bg-gray-700 hover:text-cyan-400"
              onClick={handleDownload}
              title="Baixar PDF"
              type="button"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              className="rounded p-1.5 text-gray-400 transition-colors hover:bg-gray-700 hover:text-cyan-400"
              onClick={() => setIsEditModalOpen(true)}
              title="Editar"
              type="button"
            >
              <Edit className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              className="rounded p-1.5 text-gray-400 transition-colors hover:bg-gray-700 hover:text-red-400"
              onClick={handleDelete}
              title="Excluir"
              type="button"
            >
              <Trash className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {resume.fileName ? (
          <div className="mt-4 flex items-center gap-2 text-sm text-gray-300">
            <FileText className="h-4 w-4 text-gray-500" aria-hidden="true" />
            <span className="truncate" title={resume.fileName}>
              {resume.fileName}
            </span>
          </div>
        ) : null}

        <div className="mt-6 flex items-center justify-between text-xs text-gray-400">
          <span>Criado em: {dateFormatter.format(new Date(resume.createdAt))}</span>
        </div>
      </article>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Editar currículo"
      >
        <ResumeForm initialData={resume} onSuccess={() => setIsEditModalOpen(false)} />
      </Modal>
    </>
  );
}
