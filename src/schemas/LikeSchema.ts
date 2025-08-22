import { z } from 'zod'

export const createLikeSchema = z.object({
  usuarioId: z
    .string({
      required_error: 'O ID do usuário é obrigatório.',
      invalid_type_error: 'O ID do usuário deve ser uma string.'
    })
    .trim()
    .uuid(
      'O ID do usuário deve ser um UUID válido (formato: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx).'
    ),

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
