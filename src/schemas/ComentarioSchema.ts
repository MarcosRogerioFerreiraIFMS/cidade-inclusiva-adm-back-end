import { z } from 'zod'
import { sanitizeContent } from '../utils/stringUtils'

const CONTEUDO_MIN_LENGTH = 1
const CONTEUDO_MAX_LENGTH = 1000

export const createComentarioSchema = z.object({
  conteudo: z
    .string({
      required_error: 'O conteúdo é obrigatório.',
      invalid_type_error: 'O conteúdo deve ser uma string.'
    })
    .transform(sanitizeContent)
    .refine((val) => val.length >= CONTEUDO_MIN_LENGTH, {
      message: `O conteúdo deve ter pelo menos ${CONTEUDO_MIN_LENGTH} caractere.`
    })
    .refine((val) => val.length <= CONTEUDO_MAX_LENGTH, {
      message: `O conteúdo deve ter no máximo ${CONTEUDO_MAX_LENGTH} caracteres.`
    })
    .refine((val) => val.trim().length > 0, {
      message: 'O conteúdo não pode estar vazio ou conter apenas espaços.'
    })
    .refine((val) => !/^\s*$/.test(val), {
      message: 'O conteúdo deve conter pelo menos um caractere não nulo.'
    }),

  usuarioId: z
    .string({
      required_error: 'O ID do usuário é obrigatório.',
      invalid_type_error: 'O ID do usuário deve ser uma string.'
    })
    .trim()
    .uuid(
      'O ID do usuário deve ser um UUID válido (formato: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx).'
    ),

  entidadeId: z
    .string({
      required_error: 'O ID da entidade é obrigatório.',
      invalid_type_error: 'O ID da entidade deve ser uma string.'
    })
    .trim()
    .uuid(
      'O ID da entidade deve ser um UUID válido (formato: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx).'
    ),

  visivel: z
    .boolean({
      invalid_type_error: 'Visível deve ser um valor booleano (true ou false).'
    })
    .optional()
    .default(true)
})

export const updateComentarioSchema = createComentarioSchema
  .pick({
    conteudo: true,
    visivel: true
  })
  .extend({
    conteudo: createComentarioSchema.shape.conteudo.optional(),
    visivel: createComentarioSchema.shape.visivel.optional()
  })
