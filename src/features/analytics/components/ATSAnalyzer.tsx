import { AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import { useJobStore } from '../../jobs/store/useJobStore';
import { useResumeStore } from '../../resumes/store/useResumeStore';
import { calculateATSScore } from '../utils/atsScorer';

interface ATSAnalyzerProps {
  jobId: string;
}

export function ATSAnalyzer({ jobId }: ATSAnalyzerProps) {
  const job = useJobStore((state) => state.jobs.find((j) => j.id === jobId));
  const resume = useResumeStore((state) =>
    state.resumes.find((r) => r.name === job?.resumeVersion)
  );

  if (!job) {
    return null;
  }

  if (!job.jobKeywords) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-700 bg-gray-900/50 p-8 text-center">
        <AlertCircle className="h-10 w-10 text-gray-500" />
        <h3 className="mt-4 text-sm font-semibold text-gray-200">
          Adicione as palavras-chave da vaga no formulário de edição para calcular a compatibilidade.
        </h3>
        <p className="mt-2 max-w-sm text-xs text-gray-400">
          Edite esta vaga e insira os requisitos solicitados.
        </p>
      </div>
    );
  }

  if (!resume || !resume.skills) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-700 bg-gray-900/50 p-8 text-center">
        <AlertCircle className="h-10 w-10 text-yellow-500/70" />
        <h3 className="mt-4 text-sm font-semibold text-gray-200">
          Currículo sem habilidades cadastradas
        </h3>
        <p className="mt-2 max-w-sm text-xs text-gray-400">
          Vá até a aba de Currículos e adicione palavras-chave ao currículo selecionado para esta
          vaga.
        </p>
      </div>
    );
  }

  const { score, matchedSkills, missingSkills } = calculateATSScore(job.jobKeywords, resume.skills);

  let scoreColor = 'text-red-400';
  if (score >= 70) scoreColor = 'text-green-400';
  else if (score >= 40) scoreColor = 'text-yellow-400';

  return (
    <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
      <div className="flex items-center justify-between border-b border-gray-800 pb-4">
        <h2 className="text-lg font-semibold text-gray-100">Compatibilidade ATS</h2>
        <div className="flex items-baseline gap-1">
          <span className={`text-4xl font-bold ${scoreColor}`}>{score}</span>
          <span className="text-sm font-medium text-gray-500">%</span>
        </div>
      </div>

      <div className="mt-6 space-y-6">
        <div>
          <h3 className="flex items-center gap-2 text-sm font-medium text-gray-300">
            <CheckCircle2 className="h-4 w-4 text-green-400" />
            Habilidades Encontradas ({matchedSkills.length})
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {matchedSkills.length > 0 ? (
              matchedSkills.map((skill) => (
                <span
                  className="rounded-md border border-green-400/20 bg-green-400/10 px-2.5 py-1 text-xs font-medium text-green-300"
                  key={skill}
                >
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-xs text-gray-500">Nenhuma habilidade compatível encontrada.</span>
            )}
          </div>
        </div>

        <div>
          <h3 className="flex items-center gap-2 text-sm font-medium text-gray-300">
            <XCircle className="h-4 w-4 text-red-400" />
            Faltam no Currículo ({missingSkills.length})
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {missingSkills.length > 0 ? (
              missingSkills.map((skill) => (
                <span
                  className="rounded-md border border-red-400/20 bg-red-400/10 px-2.5 py-1 text-xs font-medium text-red-300"
                  key={skill}
                >
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-xs text-gray-500">
                Parabéns! Todas as palavras-chave foram encontradas.
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
