import { z } from 'zod'

export const createLoginSchema = z.object({
  email: z
    .string({ required_error: 'Email é obrigatório' })
    .email('Email inválido')
    .min(1, 'Email não pode estar vazio'),
  senha: z
    .string({ required_error: 'Senha é obrigatória' })
    .min(1, 'Senha não pode estar vazia')
})

export type LoginSchemaType = z.infer<typeof createLoginSchema>
