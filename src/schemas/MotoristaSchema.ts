import { z } from 'zod'

export const motoristaSchema = z.object({
  nome: z.string().nonempty('Nome é obrigatório'),
  telefone: z.string().optional(),
  email: z.string().email('Email inválido'),
  foto: z.string().url('URL da foto inválida').optional()
})

export const motoristaUpdateSchema = motoristaSchema.partial()
