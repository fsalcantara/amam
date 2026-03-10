import { z } from 'zod';

/**
 * Schemas de validação (Zod) — Camada de Segurança Central
 * Usados nos formulários do Admin para garantir dados consistentes
 * antes de qualquer operação de escrita no serviço.
 */

// --- Post / Conteúdo ---
export const postSchema = z.object({
  title: z.string().min(3, 'O título deve ter pelo menos 3 caracteres.'),
  excerpt: z.string().min(10, 'O resumo deve ter pelo menos 10 caracteres.'),
  type: z.string().min(1, 'Selecione um tipo de conteúdo.'),
  date: z.string().min(1, 'Insira a data do evento/postagem.'),
  imageUrl: z.string().url('Insira uma URL de imagem válida.').optional().or(z.literal('')),
  videoUrl: z.string().optional(),
  content: z.string().optional(),
  ingredients: z.string().optional(),
  preparationSteps: z.string().optional(),
});

export type PostFormValues = z.infer<typeof postSchema>;

// --- Vaga ---
export const jobSchema = z.object({
  title: z.string().min(3, 'O título da vaga deve ter pelo menos 3 caracteres.'),
  area: z.string().min(1, 'Selecione uma área.'),
  location: z.string().min(2, 'Informe a localização da vaga.'),
  description: z.string().min(20, 'A descrição deve ter pelo menos 20 caracteres.'),
  requirements: z.string().min(10, 'Informe os requisitos mínimos.'),
  isActive: z.boolean().optional().default(true),
});

export type JobFormValues = z.infer<typeof jobSchema>;

// --- Usuário ---
export const newUserSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres.'),
  username: z
    .string()
    .min(3, 'O usuário deve ter pelo menos 3 caracteres.')
    .regex(/^[a-z0-9_]+$/, 'Use apenas letras minúsculas, números e underscore.'),
  password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres.'),
  role: z.string().min(1, 'Selecione uma função.'),
});

export type NewUserFormValues = z.infer<typeof newUserSchema>;
