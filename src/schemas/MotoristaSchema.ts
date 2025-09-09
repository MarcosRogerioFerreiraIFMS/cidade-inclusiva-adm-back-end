import { z } from 'zod'
import { sanitizeString } from '../utils'
import { createEmailSchema, fotoOpcionalSchema } from './'

/** Comprimento mínimo permitido para nomes de motoristas */
const NOME_MIN_LENGTH = 2
/** Comprimento máximo permitido para nomes de motoristas */
const NOME_MAX_LENGTH = 100

/**
 * - Schema de validação Zod para criação de motorista
 * - Define regras de validação, transformação e refinamento para todos os campos
 * - Inclui validações para telefone, email e foto
 */

export const createMotoristaSchema = z.object({
  nome: z
    .string({
      required_error: 'O nome é obrigatório.',
      invalid_type_error: 'O nome deve ser uma string.'
    })
    .transform(sanitizeString)
    .refine((val) => val.length >= NOME_MIN_LENGTH, {
      message: `O nome deve ter pelo menos ${NOME_MIN_LENGTH} caracteres.`
    })
    .refine((val) => val.length <= NOME_MAX_LENGTH, {
      message: `O nome deve ter no máximo ${NOME_MAX_LENGTH} caracteres.`
    }),

  telefone: z
    .string({
      required_error: 'O telefone é obrigatório.',
      invalid_type_error: 'O telefone deve ser uma string.'
    })
    .transform((val) => val.replace(/\D/g, '')) // Remove caracteres não numéricos
    .refine((val) => val.length === 11, {
      message: 'O telefone deve ter 11 dígitos (DDD + 9 dígitos).'
    })
    .refine(
      (val) =>
        val.startsWith('1') ||
        val.startsWith('2') ||
        val.startsWith('3') ||
        val.startsWith('4') ||
        val.startsWith('5') ||
        val.startsWith('6') ||
        val.startsWith('7') ||
        val.startsWith('8') ||
        val.startsWith('9'),
      {
        message: 'DDD inválido.'
      }
    )
    .refine((val) => val[2] === '9', {
      message: 'Telefone deve ser um celular (terceiro dígito deve ser 9).'
    }),

  email: createEmailSchema,

  foto: fotoOpcionalSchema
})

/**
 * - Schema de validação Zod para atualização de motorista
 * - Torna todos os campos opcionais, permitindo atualizações parciais
 * - Mantém as mesmas regras de validação do schema de criação
 */
export const updateMotoristaSchema = createMotoristaSchema.partial()
