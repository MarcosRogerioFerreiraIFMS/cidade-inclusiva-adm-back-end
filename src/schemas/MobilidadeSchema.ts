import { z } from 'zod'
import { StatusMobilidade } from '../enums'
import { sanitizeString } from '../utils/stringUtils'

/** Comprimento mínimo permitido para descrição de mobilidade */
const DESCRICAO_MIN_LENGTH = 5
/** Comprimento máximo permitido para descrição de mobilidade */
const DESCRICAO_MAX_LENGTH = 500

/**
 * - Schema de validação Zod para criação de mobilidade
 * - Define regras de validação, transformação e refinamento para todos os campos
 * - Inclui validações para coordenadas, status e descrição
 */
export const createMobilidadeSchema = z.object({
  latitude: z
    .number({
      required_error: 'A latitude é obrigatória.',
      invalid_type_error: 'A latitude deve ser um número.'
    })
    .min(-90, 'A latitude deve estar entre -90 e 90 graus.')
    .max(90, 'A latitude deve estar entre -90 e 90 graus.'),

  longitude: z
    .number({
      required_error: 'A longitude é obrigatória.',
      invalid_type_error: 'A longitude deve ser um número.'
    })
    .min(-180, 'A longitude deve estar entre -180 e 180 graus.')
    .max(180, 'A longitude deve estar entre -180 e 180 graus.'),

  descricao: z
    .string({
      required_error: 'A descrição é obrigatória.',
      invalid_type_error: 'A descrição deve ser uma string.'
    })
    .transform(sanitizeString)
    .refine((val) => val.length >= DESCRICAO_MIN_LENGTH, {
      message: `A descrição deve ter pelo menos ${DESCRICAO_MIN_LENGTH} caracteres.`
    })
    .refine((val) => val.length <= DESCRICAO_MAX_LENGTH, {
      message: `A descrição deve ter no máximo ${DESCRICAO_MAX_LENGTH} caracteres.`
    }),

  status: z
    .string({
      invalid_type_error: 'O status deve ser uma string.'
    })
    .optional()
    .transform((val) => (val ? val.trim().toUpperCase() : val))
    .refine(
      (val) => {
        if (!val) return true
        return Object.values(StatusMobilidade).includes(val as StatusMobilidade)
      },
      {
        message: `Status inválido. Valores aceitos: ${Object.values(
          StatusMobilidade
        ).join(', ')}`
      }
    )
    .transform((val) =>
      val ? (val as StatusMobilidade) : StatusMobilidade.PENDENTE
    ),

  usuarioId: z
    .string({
      invalid_type_error: 'O ID do usuário deve ser uma string.'
    })
    .uuid('O ID do usuário deve ser um UUID válido.')
    .optional(),

  dataRegistro: z
    .union([
      z
        .string()
        .transform((val) => val.trim())
        .refine(
          (val) => {
            try {
              const date = new Date(val)
              return !isNaN(date.getTime())
            } catch {
              return false
            }
          },
          {
            message: 'A data de registro deve estar no formato ISO 8601.'
          }
        ),
      z.date({
        invalid_type_error: 'A data de registro deve ser uma data válida.'
      })
    ])
    .optional()
})

/**
 * - Schema de validação Zod para atualização de mobilidade
 * - Torna todos os campos opcionais, permitindo atualizações parciais
 * - Mantém as mesmas regras de validação do schema de criação
 */
export const updateMobilidadeSchema = createMobilidadeSchema.partial()
