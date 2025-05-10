import { z } from 'zod'

export const acessibilidadeSchema = z.object({
  nome: z.string().nonempty('Nome é obrigatório'),
  foto: z.string().url('URL da foto inválida').optional(),
  telefone: z.string().optional(),
  email: z.string().email('Email inválido').optional(),
  categoria: z.string().nonempty('Categoria é obrigatória')
})

export const acessibilidadeUpdateSchema = acessibilidadeSchema.partial()
