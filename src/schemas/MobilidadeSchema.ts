import { MobilidadeStatus } from '@/enums'
import {
  DATE_ERROR_MESSAGES,
  isNotFutureDate,
  isValidDateString,
  sanitizeContent,
  sanitizeString
} from '@/utils'
import { z } from 'zod'

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
    .transform(sanitizeContent)
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
    .transform(sanitizeString)
    .transform((val) => (val ? val.trim().toUpperCase() : val))
    .refine(
      (val) => {
        if (!val) return true
        return Object.values(MobilidadeStatus).includes(val as MobilidadeStatus)
      },
      {
        message: `Status inválido. Valores aceitos: ${Object.values(
          MobilidadeStatus
        ).join(', ')}`
      }
    )
    .transform((val) =>
      val ? (val as MobilidadeStatus) : MobilidadeStatus.PENDENTE
    )
    .optional(),

  dataRegistro: z
    .union([
      z
        .string()
        .transform((val) => val.trim())
        .refine((val) => isValidDateString(val), {
          message: DATE_ERROR_MESSAGES.INVALID_FORMAT
        })
        .refine((val) => isNotFutureDate(val), {
          message: DATE_ERROR_MESSAGES.FUTURE_DATE_NOT_ALLOWED
        }),
      z
        .date({
          invalid_type_error: DATE_ERROR_MESSAGES.INVALID_DATE
        })
        .refine((date) => isNotFutureDate(date), {
          message: DATE_ERROR_MESSAGES.FUTURE_DATE_NOT_ALLOWED
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

/**
 * Schema de validação Zod para o campo status de mobilidade isoladamente
 */
export const mobilidadeStatusSchema = z
  .string({
    invalid_type_error: 'O status deve ser uma string.'
  })
  .transform(sanitizeString)
  .transform((val) => val.trim().toUpperCase())
  .refine(
    (val) => Object.values(MobilidadeStatus).includes(val as MobilidadeStatus),
    {
      message: `Status inválido. Valores aceitos: ${Object.values(
        MobilidadeStatus
      ).join(', ')}`
    }
  )
  .transform((val) => val as MobilidadeStatus)
