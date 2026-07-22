import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { resumeSchema, type ResumeFormData } from '../domain/schemas';
import { useResumeStore, type Resume } from '../store/useResumeStore';
import { fileToBase64 } from '../../../shared/utils/fileUtils';

interface ResumeFormProps {
  onSuccess: () => void;
  initialData?: Resume;
}

const inputClassName =
  'mt-2 w-full rounded-md border border-gray-700 bg-gray-950 px-3 py-2 text-sm text-gray-100 outline-none transition-colors placeholder:text-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20';

const labelClassName = 'text-sm font-medium text-gray-200';

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="mt-1 text-sm text-red-400">{message}</p>;
}

export function ResumeForm({ onSuccess, initialData }: ResumeFormProps) {
  const addResume = useResumeStore((state) => state.addResume);
  const updateResume = useResumeStore((state) => state.updateResume);

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
    setValue,
  } = useForm<ResumeFormData>({
    resolver: zodResolver(resumeSchema),
    defaultValues: initialData
      ? {
          name: initialData.name,
          targetRole: initialData.targetRole,
          fileName: initialData.fileName || '',
          fileBase64: initialData.fileBase64 || '',
        }
      : {
          name: '',
          targetRole: '',
          fileName: '',
          fileBase64: '',
        },
  });

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const base64 = await fileToBase64(file);
        setValue('fileName', file.name, { shouldValidate: true });
        setValue('fileBase64', base64, { shouldValidate: true });
      } catch (error) {
        toast.error('Erro ao ler o arquivo PDF.');
      }
    }
  }

  function onSubmit(data: ResumeFormData) {
    if (initialData) {
      updateResume(initialData.id, {
        name: data.name,
        targetRole: data.targetRole,
        fileName: data.fileName,
        fileBase64: data.fileBase64,
      });
      toast.success('Currículo atualizado com sucesso!');
    } else {
      addResume({
        id: uuidv4(),
        name: data.name,
        targetRole: data.targetRole,
        createdAt: new Date().toISOString(),
        fileName: data.fileName,
        fileBase64: data.fileBase64,
      });
      toast.success('Currículo criado com sucesso!');
    }

    reset();
    onSuccess();
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className={labelClassName}>
          Nome de Identificação
          <input
            className={inputClassName}
            placeholder="Ex: Perfil React Pleno"
            type="text"
            {...register('name')}
          />
          <FieldError message={errors.name?.message} />
        </label>
      </div>

      <div>
        <label className={labelClassName}>
          Cargo Alvo
          <input
            className={inputClassName}
            placeholder="Ex: Frontend Developer"
            type="text"
            {...register('targetRole')}
          />
          <FieldError message={errors.targetRole?.message} />
        </label>
      </div>

      <div>
        <label className={labelClassName}>
          Arquivo PDF
          <input
            accept=".pdf"
            className={inputClassName}
            onChange={handleFileChange}
            type="file"
          />
          <FieldError message={errors.fileName?.message || errors.fileBase64?.message} />
        </label>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          className="rounded-md bg-cyan-400 px-4 py-2 text-sm font-semibold text-gray-950 transition-colors hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isSubmitting}
          type="submit"
        >
          Salvar currículo
        </button>
      </div>
    </form>
  );
}
