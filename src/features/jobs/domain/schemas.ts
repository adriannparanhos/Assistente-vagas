import { z } from 'zod';

export const jobSchema = z.object({
  company: z.string().min(2, 'Informe uma empresa com pelo menos 2 caracteres.'),
  position: z.string().min(2, 'Informe um cargo com pelo menos 2 caracteres.'),
  status: z.enum(['APPLIED', 'HR_INTERVIEW', 'TECH_INTERVIEW', 'OFFER', 'REJECTED']),
  appliedDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Informe uma data valida.')
    .refine((value) => !Number.isNaN(new Date(`${value}T00:00:00`).getTime()), {
      message: 'Informe uma data valida.',
    }),
  resumeVersion: z.string().min(1, 'Informe a versao do curriculo.'),
  salaryRange: z.string().optional(),
  notes: z.string().optional(),
});

export type JobFormData = z.infer<typeof jobSchema>;
