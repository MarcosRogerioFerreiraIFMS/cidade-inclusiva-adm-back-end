import { TipoEntidadeComentario } from '@/enums'
import { sanitizeContent } from '@/utils'
import { z } from 'zod'

/** Comprimento mínimo permitido para conteúdo de comentários */
const CONTEUDO_MIN_LENGTH = 1
/** Comprimento máximo permitido para conteúdo de comentários */
const CONTEUDO_MAX_LENGTH = 1000

/**
 * - Schema de validação Zod para criação de comentário
 * - Define regras de validação e transformação para conteúdo e relacionamentos
 * - Inclui validações para comprimento e formato do conteúdo
 */
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

  usuarioId: z.string().uuid(),

  tipoEntidade: z
    .string({
      required_error: 'O tipo de entidade é obrigatório.',
      invalid_type_error: 'O tipo de entidade deve ser uma string.'
    })
    .min(1, 'O tipo de entidade não pode estar vazio.')
    .transform((val) => val.trim().toUpperCase())
    .pipe(z.nativeEnum(TipoEntidadeComentario)),

  entidadeId: z
    .string({
      required_error: 'O ID da entidade é obrigatório.',
      invalid_type_error: 'O ID da entidade deve ser uma string.'
    })
    .trim()
    .uuid(
      'O ID da entidade deve ser um UUID válido (formato: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx).'
    )
})

/**
 * - Schema de validação Zod para atualização de comentário
 * - Permite atualização apenas dos campos conteúdo e visibilidade
 * - Todos os campos são opcionais para atualizações parciais
 */
export const updateComentarioSchema = createComentarioSchema
  .pick({
    conteudo: true
  })
  .extend({
    conteudo: createComentarioSchema.shape.conteudo.optional(),
    visivel: z
      .boolean({
        invalid_type_error:
          'Visível deve ser um valor booleano (true ou false).'
      })
      .optional()
  })
