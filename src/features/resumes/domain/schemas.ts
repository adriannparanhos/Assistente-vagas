import { z } from 'zod';

export const resumeSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres.'),
  targetRole: z.string().min(3, 'O cargo alvo deve ter pelo menos 3 caracteres.'),
  fileName: z.string().min(1, 'Selecione um arquivo PDF.'),
  fileBase64: z.string().min(1, 'O arquivo é obrigatório.'),
});

export type ResumeFormData = z.infer<typeof resumeSchema>;
