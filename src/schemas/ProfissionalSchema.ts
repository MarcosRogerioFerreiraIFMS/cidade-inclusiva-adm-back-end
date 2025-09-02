import { EspecialidadeProfissional } from '@prisma/client'
import { z } from 'zod'
import { sanitizeString, sanitizeTelefone } from '../utils/stringUtils'
import {
  isImageUrl,
  normalizeUrl,
  transformUrl,
  verifyUrl
} from '../utils/urlUtils'

/** Comprimento mínimo permitido para nomes de profissionais */
const NOME_MIN_LENGTH = 2
/** Comprimento máximo permitido para nomes de profissionais */
const NOME_MAX_LENGTH = 100
/** Regex para validação de formato de telefone brasileiro */
const TELEFONE_REGEX = /^(?:\d{11}|\d{13})$/

/**
 * - Schema de validação Zod para criação de profissional
 * - Define regras de validação, transformação e refinamento para todos os campos
 * - Inclui validações específicas para telefone, email e especialidades
 */
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
    })
    .refine((val) => /^[a-zA-ZÀ-ÿ\s]+$/.test(val), {
      message: 'O nome deve conter apenas letras e espaços.'
    })
    .refine((val) => val.trim().split(' ').length >= 2, {
      message: 'O nome deve conter pelo menos nome e sobrenome.'
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
          'A URL da foto deve ser válida e apontar para uma imagem. Use um formato válido (ex: https://exemplo.com/imagem.jpg).'
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
        'O telefone deve ter 11 dígitos (ex: 11999999999) ou 13 dígitos com código do país (ex: +5511999999999).'
    })
    .refine(
      (val) => {
        if (val.length === 11) {
          const ddd = val.substring(0, 2)
          const numero = val.substring(2)
          return (
            [
              '11',
              '12',
              '13',
              '14',
              '15',
              '16',
              '17',
              '18',
              '19',
              '21',
              '22',
              '24',
              '27',
              '28',
              '31',
              '32',
              '33',
              '34',
              '35',
              '37',
              '38',
              '41',
              '42',
              '43',
              '44',
              '45',
              '46',
              '47',
              '48',
              '49',
              '51',
              '53',
              '54',
              '55',
              '61',
              '62',
              '63',
              '64',
              '65',
              '66',
              '67',
              '68',
              '69',
              '71',
              '73',
              '74',
              '75',
              '77',
              '79',
              '81',
              '82',
              '83',
              '84',
              '85',
              '86',
              '87',
              '88',
              '89',
              '91',
              '92',
              '93',
              '94',
              '95',
              '96',
              '97',
              '98',
              '99'
            ].includes(ddd) && /^9\d{8}$/.test(numero)
          )
        }
        return true
      },
      {
        message:
          'O telefone deve ter um DDD válido e começar com 9 para celulares.'
      }
    ),

  email: z
    .string({
      required_error: 'O email é obrigatório.',
      invalid_type_error: 'O email deve ser uma string.'
    })
    .email('O email deve ter um formato válido (ex: profissional@dominio.com).')
    .transform((val) => val.trim().toLowerCase())
    .refine((val) => val.length <= 254, {
      message: 'O email deve ter no máximo 254 caracteres.'
    })
    .refine((val) => !val.includes('..'), {
      message: 'O email não pode conter pontos consecutivos.'
    })
    .refine((val) => !val.startsWith('.') && !val.endsWith('.'), {
      message: 'O email não pode começar ou terminar com ponto.'
    }),

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
        ).join(', ')}.`
      }
    )
    .transform((val) => val as EspecialidadeProfissional)
})

/**
 * - Schema de validação Zod para atualização de profissional
 * - Torna todos os campos opcionais, permitindo atualizações parciais
 * - Mantém as mesmas regras de validação do schema de criação
 */
export const updateProfissionalSchema = createProfissionalSchema.partial()
