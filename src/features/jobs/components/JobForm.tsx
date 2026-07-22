import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { jobSchema, type JobFormData } from '../domain/schemas';
import type { JobApplicationStatus } from '../domain/types';
import { useJobStore } from '../store/useJobStore';

interface JobFormProps {
  onSuccess: () => void;
}

interface StatusOption {
  label: string;
  value: JobApplicationStatus;
}

const statusOptions: StatusOption[] = [
  { label: 'Aplicada', value: 'APPLIED' },
  { label: 'Entrevista RH', value: 'HR_INTERVIEW' },
  { label: 'Entrevista Tecnica', value: 'TECH_INTERVIEW' },
  { label: 'Oferta', value: 'OFFER' },
  { label: 'Rejeitada', value: 'REJECTED' },
];

const inputClassName =
  'mt-2 w-full rounded-md border border-gray-700 bg-gray-950 px-3 py-2 text-sm text-gray-100 outline-none transition-colors placeholder:text-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20';

const labelClassName = 'text-sm font-medium text-gray-200';

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="mt-1 text-sm text-red-400">{message}</p>;
}

export function JobForm({ onSuccess }: JobFormProps) {
  const addJob = useJobStore((state) => state.addJob);

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
  } = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      company: '',
      position: '',
      status: 'APPLIED',
      appliedDate: new Date().toISOString().slice(0, 10),
      resumeVersion: '',
      salaryRange: '',
    },
  });

  function onSubmit(data: JobFormData) {
    addJob({
      id: uuidv4(),
      ...data,
      salaryRange: data.salaryRange?.trim() || undefined,
    });

    reset();
    onSuccess();
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className={labelClassName}>
          Nome da Empresa
          <input
            className={inputClassName}
            placeholder="Ex: Nubank"
            type="text"
            {...register('company')}
          />
          <FieldError message={errors.company?.message} />
        </label>

        <label className={labelClassName}>
          Cargo
          <input
            className={inputClassName}
            placeholder="Ex: Frontend Developer"
            type="text"
            {...register('position')}
          />
          <FieldError message={errors.position?.message} />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className={labelClassName}>
          Status
          <select className={inputClassName} {...register('status')}>
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <FieldError message={errors.status?.message} />
        </label>

        <label className={labelClassName}>
          Data da Aplicacao
          <input className={inputClassName} type="date" {...register('appliedDate')} />
          <FieldError message={errors.appliedDate?.message} />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className={labelClassName}>
          Versao do Curriculo
          <input
            className={inputClassName}
            placeholder="Ex: frontend-v4"
            type="text"
            {...register('resumeVersion')}
          />
          <FieldError message={errors.resumeVersion?.message} />
        </label>

        <label className={labelClassName}>
          Pretensao Salarial
          <input
            className={inputClassName}
            placeholder="Ex: R$ 12k - 15k"
            type="text"
            {...register('salaryRange')}
          />
          <FieldError message={errors.salaryRange?.message} />
        </label>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          className="rounded-md bg-cyan-400 px-4 py-2 text-sm font-semibold text-gray-950 transition-colors hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isSubmitting}
          type="submit"
        >
          Salvar candidatura
        </button>
      </div>
    </form>
  );
}
