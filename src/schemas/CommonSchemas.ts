import {
  isImageUrl,
  normalizeUrl,
  sanitizeString,
  sanitizeTelefone,
  transformUrl,
  validateBrazilianCellPhone,
  validateBrazilianCEP,
  validateBrazilianStates,
  verifyUrl
} from '@/utils'
import api from 'brasilapi-js'
import { z } from 'zod'

export const NOME_MIN_LENGTH = 2
export const NOME_MAX_LENGTH = 120
export const TITULO_MIN_LENGTH = 3
export const TITULO_MAX_LENGTH = 100
export const CONTEUDO_MIN_LENGTH = 10
export const CONTEUDO_MAX_LENGTH = 5000
export const TELEFONE_REGEX = /^\(\d{2}\) 9\d{4}-\d{4}$/
export const CEP_REGEX = /^\d{5}-\d{3}$/
export const SENHA_MIN_LENGTH = 8
export const SENHA_MAX_LENGTH = 128
export const EMAIL_MAX_LENGTH = 254

export const nomeSchema = z
  .string({
    required_error: 'O nome é obrigatório',
    invalid_type_error: 'O nome deve ser um texto'
  })
  .transform(sanitizeString)
  .refine(
    (val) => val.length >= NOME_MIN_LENGTH,
    `O nome deve ter no mínimo ${NOME_MIN_LENGTH} caracteres`
  )
  .refine(
    (val) => val.length <= NOME_MAX_LENGTH,
    `O nome deve ter no máximo ${NOME_MAX_LENGTH} caracteres`
  )

export const telefoneSchema = z
  .string({
    required_error: 'O telefone é obrigatório.',
    invalid_type_error: 'O telefone deve ser uma string.'
  })
  .transform((val) => sanitizeTelefone(val.trim()))
  .refine((val) => validateBrazilianCellPhone(val), {
    message:
      'O telefone deve ser um celular brasileiro válido (11 dígitos com DDD válido e iniciado por 9).'
  })

export const emailSchema = z
  .string()
  .email('Email inválido')
  .transform((val) => val.toLowerCase().trim())
  .refine((val) => val.length <= EMAIL_MAX_LENGTH, {
    message: `O email deve ter no máximo ${EMAIL_MAX_LENGTH} caracteres.`
  })

export const loginEmailSchema = emailSchema

export const enderecoSchema = z.object(
  {
    logradouro: z
      .string({
        required_error: 'O logradouro é obrigatório.',
        invalid_type_error: 'O logradouro deve ser uma string.'
      })
      .transform(sanitizeString)
      .refine((val) => val.length >= 3, {
        message: 'O logradouro deve ter pelo menos 3 caracteres.'
      })
      .refine((val) => val.length <= 100, {
        message: 'O logradouro deve ter no máximo 100 caracteres.'
      })
      .refine((val) => /^[a-zA-ZÀ-ÿ0-9\s\-.,]+$/.test(val), {
        message:
          'O logradouro deve conter apenas letras, números, espaços, hífens, pontos e vírgulas.'
      }),

    numero: z
      .string({
        required_error: 'O número é obrigatório.',
        invalid_type_error: 'O número deve ser uma string.'
      })
      .transform((val) => val.trim())
      .refine((val) => val.length >= 1, {
        message: 'O número é obrigatório.'
      })
      .refine((val) => val.length <= 10, {
        message: 'O número deve ter no máximo 10 caracteres.'
      })
      .refine((val) => /^[0-9A-Za-z\s-/]+$/.test(val), {
        message:
          'O número deve conter apenas números, letras, espaços, hífens ou barras.'
      }),

    complemento: z
      .string({ invalid_type_error: 'O complemento deve ser uma string.' })
      .transform((val) => (val ? sanitizeString(val) : val))
      .refine((val) => !val || val.length <= 50, {
        message: 'O complemento deve ter no máximo 50 caracteres.'
      })
      .optional(),

    cidade: z
      .string({
        required_error: 'A cidade é obrigatória.',
        invalid_type_error: 'A cidade deve ser uma string.'
      })
      .transform(sanitizeString)
      .refine((val) => val.length >= 2, {
        message: 'A cidade deve ter pelo menos 2 caracteres.'
      })
      .refine((val) => val.length <= 50, {
        message: 'A cidade deve ter no máximo 50 caracteres.'
      })
      .refine((val) => /^[a-zA-ZÀ-ÿ\s-]+$/.test(val), {
        message: 'A cidade deve conter apenas letras, espaços e hífens.'
      }),

    bairro: z
      .string({
        required_error: 'O bairro é obrigatório.',
        invalid_type_error: 'O bairro deve ser uma string.'
      })
      .transform(sanitizeString)
      .refine((val) => val.length >= 2, {
        message: 'O bairro deve ter pelo menos 2 caracteres.'
      })
      .refine((val) => val.length <= 50, {
        message: 'O bairro deve ter no máximo 50 caracteres.'
      })
      .refine((val) => /^[a-zA-ZÀ-ÿ0-9\s\-.,]+$/.test(val), {
        message:
          'O bairro deve conter apenas letras, números, espaços, hífens, pontos e vírgulas.'
      }),

    cep: z
      .string({
        required_error: 'O CEP é obrigatório.',
        invalid_type_error: 'O CEP deve ser uma string.'
      })
      .transform((val) => val.replace(/\D/g, ''))
      .refine((val) => validateBrazilianCEP(val), {
        message:
          'O CEP deve ter exatamente 8 dígitos e ser um CEP válido brasileiro (ex: 12345678).'
      })
      .refine(
        async (val) => {
          try {
            const response = await api.cep.getBy(val)
            return response && response.data && response.data.cep
          } catch {
            return false
          }
        },
        {
          message:
            'O CEP informado não foi encontrado na base de dados dos Correios. Verifique se o CEP está correto.'
        }
      ),

    estado: z
      .string({
        required_error: 'O estado é obrigatório.',
        invalid_type_error: 'O estado deve ser uma string.'
      })
      .transform((val) => val.trim().toUpperCase())
      .refine((val) => val.length === 2, {
        message: 'O estado deve ter exatamente 2 caracteres (ex: SP, RJ).'
      })
      .refine((val) => validateBrazilianStates(val), {
        message:
          'O estado deve ser um código válido brasileiro (AC, AL, AP, AM, BA, CE, DF, ES, GO, MA, MT, MS, MG, PA, PB, PR, PE, PI, RJ, RN, RS, RO, RR, SC, SP, SE, TO).'
      }),

    pais: z
      .string({ invalid_type_error: 'O país deve ser uma string.' })
      .transform((val) => (val ? sanitizeString(val) : 'Brasil'))
      .refine((val) => !val || val.length <= 50, {
        message: 'O país deve ter no máximo 50 caracteres.'
      })
      .refine((val) => !val || /^[a-zA-ZÀ-ÿ\s]+$/.test(val), {
        message: 'O país deve conter apenas letras e espaços.'
      })
      .optional()
      .default('Brasil')
  },
  {
    required_error: 'O endereço é obrigatório.',
    invalid_type_error: 'O endereço deve ser um objeto.'
  }
)

const baseFotoSchema = z
  .string({ invalid_type_error: 'A URL da foto deve ser uma string.' })
  .trim()
  .transform((val) => (val ? normalizeUrl(val) : val))
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
  .transform(transformUrl)

export const fotoSchema = baseFotoSchema.optional()

export const fotosArraySchema = z
  .array(baseFotoSchema, {
    invalid_type_error: 'O campo fotos deve ser uma lista de URLs.'
  })
  .optional()
  .default([])
  .transform((fotos) => {
    // Remove duplicadas
    const unique = Array.from(new Set(fotos))
    return unique
  })

export const logoSchema = z
  .string({ invalid_type_error: 'A URL do logo deve ser uma string.' })
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
        'A URL do logo deve ser válida e apontar para uma imagem. Use um formato válido (ex: https://exemplo.com/logo.jpg)'
    }
  )
  .transform(transformUrl)
