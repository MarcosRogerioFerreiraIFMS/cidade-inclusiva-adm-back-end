import { z } from 'zod'

/**
 * - Schema de validação para dados de login
 * - Define as regras de validação para email e senha
 */
export const createLoginSchema = z.object({
  /** Email do usuário - deve ser um email válido e não vazio */
  email: z
    .string({ required_error: 'Email é obrigatório' })
    .email('Email inválido')
    .min(1, 'Email não pode estar vazio'),
  /** Senha do usuário - deve ser uma string não vazia */
  senha: z
    .string({ required_error: 'Senha é obrigatória' })
    .min(1, 'Senha não pode estar vazia')
})

/**
 * Tipo inferido do schema de login para uso em TypeScript
 */
export type LoginSchemaType = z.infer<typeof createLoginSchema>
