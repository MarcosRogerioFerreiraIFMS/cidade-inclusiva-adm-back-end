import { CategoriaNoticia } from '@prisma/client'
import { z } from 'zod'
import {
  isImageUrl,
  normalizeUrl,
  transformUrl,
  verifyUrl
} from '../utils/urlUtils'

const TITULO_MIN_LENGTH = 3
const TITULO_MAX_LENGTH = 100
const CONTEUDO_MIN_LENGTH = 10
const CONTEUDO_MAX_LENGTH = 5000

const sanitizeString = (str: string): string => {
  return str
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/[\r\n\t]/g, ' ')
    .replace(/[^\w\s\-.,!?()áàãâéêíóôõúçÁÀÃÂÉÊÍÓÔÕÚÇ]/gi, '')
}

const sanitizeContent = (str: string): string => {
  return str
    .trim()
    .split('\n')
    .map((line) => line.trim().replace(/\s+/g, ' '))
    .filter((line) => line.length > 0)
    .join('\n')
    .replace(/[^\w\s\-.,!?()\náàãâéêíóôõúçÁÀÃÂÉÊÍÓÔÕÚÇ\n]/gi, '')
}

export const createNoticiaSchema = z.object({
  titulo: z
    .string({
      required_error: 'O título é obrigatório.',
      invalid_type_error: 'O título deve ser uma string.'
    })
    .transform(sanitizeString)
    .refine((val) => val.length >= TITULO_MIN_LENGTH, {
      message: `O título deve ter pelo menos ${TITULO_MIN_LENGTH} caracteres.`
    })
    .refine((val) => val.length <= TITULO_MAX_LENGTH, {
      message: `O título deve ter no máximo ${TITULO_MAX_LENGTH} caracteres.`
    }),

  conteudo: z
    .string({
      required_error: 'O conteúdo é obrigatório.',
      invalid_type_error: 'O conteúdo deve ser uma string.'
    })
    .transform(sanitizeContent)
    .refine((val) => val.length >= CONTEUDO_MIN_LENGTH, {
      message: `O conteúdo deve ter pelo menos ${CONTEUDO_MIN_LENGTH} caracteres.`
    })
    .refine((val) => val.length <= CONTEUDO_MAX_LENGTH, {
      message: `O conteúdo deve ter no máximo ${CONTEUDO_MAX_LENGTH} caracteres.`
    }),

  url: z
    .string({ invalid_type_error: 'A URL deve ser uma string.' })
    .optional()
    .transform((val) => (val ? normalizeUrl(val.trim()) : val))
    .refine(
      (val) => {
        if (!val) return true
        return verifyUrl(val)
      },
      {
        message:
          'A URL fornecida não é válida. Certifique-se de usar um formato válido (ex: https://exemplo.com)'
      }
    )
    .transform(transformUrl),

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

  categoria: z
    .string({
      required_error: 'A categoria é obrigatória.',
      invalid_type_error: 'A categoria deve ser uma string.'
    })
    .min(1, 'A categoria não pode estar vazia.')
    .transform((val) => val.trim().toUpperCase())
    .refine(
      (val) =>
        Object.values(CategoriaNoticia).includes(val as CategoriaNoticia),
      {
        message: `Categoria inválida. Valores aceitos: ${Object.values(
          CategoriaNoticia
        ).join(', ')}`
      }
    )
    .transform((val) => val as CategoriaNoticia),

  dataPublicacao: z
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
            message: 'A data de publicação deve estar no formato ISO 8601.'
          }
        ),
      z.date({
        invalid_type_error: 'A data de publicação deve ser uma data válida.'
      })
    ])
    .optional()
})

export const updateNoticiaSchema = createNoticiaSchema.partial()
