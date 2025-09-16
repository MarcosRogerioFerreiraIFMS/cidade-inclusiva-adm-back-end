import { z } from 'zod'
import { loginEmailSchema } from './EmailSchema'

/**
 * - Schema de validação para dados de login
 * - Define as regras de validação para email e senha
 */
export const createLoginSchema = z.object({
  /** Email do usuário - deve ser um email válido e não vazio */
  email: loginEmailSchema,
  /** Senha do usuário - deve ser uma string não vazia */
  senha: z
    .string({ required_error: 'Senha é obrigatória' })
    .min(1, 'Senha não pode estar vazia')
})

/**
 * Tipo inferido do schema de login para uso em TypeScript
 */
export type LoginSchemaType = z.infer<typeof createLoginSchema>
