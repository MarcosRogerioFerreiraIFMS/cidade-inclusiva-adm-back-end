import { z } from 'zod'

/**
 * - Schema de validação para criação de likes
 * - Define as regras de validação para relacionamento entre usuário e comentário
 * - O usuarioId é obtido do usuário autenticado, não do body da requisição
 */
export const createLikeSchema = z.object({
  /** ID do comentário que está recebendo o like - deve ser um UUID válido */
  comentarioId: z
    .string({
      required_error: 'O ID do comentário é obrigatório.',
      invalid_type_error: 'O ID do comentário deve ser uma string.'
    })
    .trim()
    .uuid(
      'O ID do comentário deve ser um UUID válido (formato: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx).'
    )
})

/**
 * Tipo inferido do schema de like para uso em TypeScript
 */
export type LikeSchemaType = z.infer<typeof createLikeSchema>
