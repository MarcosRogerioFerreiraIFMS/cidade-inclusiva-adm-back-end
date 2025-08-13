import { EspecialidadeProfissional } from '@prisma/client'
import { z } from 'zod'
import {
  isImageUrl,
  normalizeUrl,
  transformUrl,
  verifyUrl
} from '../utils/urlUtils'

const NOME_MIN_LENGTH = 2
const NOME_MAX_LENGTH = 100
const TELEFONE_REGEX = /^(?:\d{11}|\d{13})$/

const sanitizeString = (str: string): string => {
  return str
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/[\r\n\t]/g, ' ')
    .replace(/[^\w\s\-.,!?()áàãâéêíóôõúçÁÀÃÂÉÊÍÓÔÕÚÇ]/gi, '')
}

const sanitizeTelefone = (str: string): string => {
  return str.replace(/\D/g, '')
}

export const createProfissionalSchema = z.object({
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

  foto: z
    .string({ invalid_type_error: 'A URL da foto deve ser uma string.' })
    .optional()
    .transform((val) => (val ? normalizeUrl(val.trim()) : val))
    .refine(
      async (val) => {
        if (!val) return true
        if (!verifyUrl(val)) return false
        return await isImageUrl(val, process.env.NODE_ENV === 'test')
      },
      {
        message:
          'A URL da foto deve ser válida e apontar para uma imagem. Use um formato válido (ex: https://exemplo.com/imagem.jpg)'
      }
    )
    .transform(transformUrl),

  telefone: z
    .string({
      required_error: 'O telefone é obrigatório.',
      invalid_type_error: 'O telefone deve ser uma string.'
    })
    .transform((val) => sanitizeTelefone(val.trim()))
    .refine((val) => val && TELEFONE_REGEX.test(val), {
      message:
        'O telefone deve ter 11 dígitos (ex: 11999999999) ou 13 dígitos com código do país (ex: +5511999999999)'
    }),

  email: z
    .string({
      required_error: 'O email é obrigatório.',
      invalid_type_error: 'O email deve ser uma string.'
    })
    .email('O email deve ter um formato válido.')
    .transform((val) => val.trim().toLowerCase()),

  especialidade: z
    .string({
      required_error: 'A especialidade é obrigatória.',
      invalid_type_error: 'A especialidade deve ser uma string.'
    })
    .min(1, 'A especialidade não pode estar vazia.')
    .transform((val) => val.trim().toUpperCase())
    .refine(
      (val) =>
        Object.values(EspecialidadeProfissional).includes(
          val as EspecialidadeProfissional
        ),
      {
        message: `Especialidade inválida. Valores aceitos: ${Object.values(
          EspecialidadeProfissional
        ).join(', ')}`
      }
    )
    .transform((val) => val as EspecialidadeProfissional)
})

export const updateProfissionalSchema = createProfissionalSchema.partial()
