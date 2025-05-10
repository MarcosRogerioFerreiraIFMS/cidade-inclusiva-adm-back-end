import { z } from 'zod'

export const enderecoSchema = z.object({
  rua: z.string().nonempty('Rua é obrigatória'),
  numero: z.string().nonempty('Número é obrigatório'),
  bairro: z.string().nonempty('Bairro é obrigatório'),
  cep: z
    .string()
    .regex(/^\d{5}-\d{3}$/, 'CEP deve estar no formato 00000-000')
    .nonempty('CEP é obrigatório'),
  estado: z.string().nonempty('Estado é obrigatório')
})

export const enderecoUpdateSchema = enderecoSchema.partial()
