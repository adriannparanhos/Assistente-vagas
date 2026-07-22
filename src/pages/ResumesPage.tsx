import { Plus, FileText } from 'lucide-react';
import { useState } from 'react';
import { ResumeCard } from '../features/resumes/components/ResumeCard';
import { ResumeForm } from '../features/resumes/components/ResumeForm';
import { useResumeStore } from '../features/resumes/store/useResumeStore';
import { Modal } from '../shared/ui/Modal';

export function ResumesPage() {
  const resumes = useResumeStore((state) => state.resumes);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-3">
          <h2 className="text-3xl font-semibold text-gray-100">Meus Currículos</h2>
          <p className="max-w-2xl text-base text-gray-300">
            Cadastre e gerencie diferentes versões do seu currículo para testar e descobrir quais geram mais entrevistas.
          </p>
        </div>
        <button
          className="inline-flex w-fit shrink-0 items-center gap-2 rounded-md bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-300"
          onClick={() => setIsModalOpen(true)}
          type="button"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Novo Currículo
        </button>
      </div>

      {resumes.length === 0 ? (
        <div className="flex min-h-[20rem] flex-col items-center justify-center rounded-lg border border-dashed border-gray-700 bg-gray-900/50 p-8 text-center">
          <FileText className="h-12 w-12 text-gray-500" aria-hidden="true" />
          <h3 className="mt-4 text-lg font-semibold text-gray-200">Nenhum currículo cadastrado</h3>
          <p className="mt-2 max-w-sm text-sm text-gray-400">
            Crie sua primeira versão de currículo clicando no botão acima para começar a organizar suas candidaturas.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {resumes.map((resume) => (
            <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Novo currículo"
      >
        <ResumeForm onSuccess={() => setIsModalOpen(false)} />
      </Modal>
    </section>
  );
}
