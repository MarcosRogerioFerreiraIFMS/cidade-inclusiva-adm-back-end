import api from 'brasilapi-js'
import z from 'zod'
import {
  sanitizeString,
  validateBrazilianCEP,
  validateBrazilianStates
} from '../utils'

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
