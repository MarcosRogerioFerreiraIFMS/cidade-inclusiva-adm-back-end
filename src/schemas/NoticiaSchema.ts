import { CategoriaNoticia } from '@/enums'
import {
  normalizeUrl,
  sanitizeContent,
  sanitizeString,
  transformUrl,
  verifyUrl
} from '@/utils'
import { z } from 'zod'
import { fotoOpcionalSchema } from './'

/** Comprimento mínimo permitido para títulos de notícias */
const TITULO_MIN_LENGTH = 3
/** Comprimento máximo permitido para títulos de notícias */
const TITULO_MAX_LENGTH = 100
/** Comprimento mínimo permitido para conteúdo de notícias */
const CONTEUDO_MIN_LENGTH = 10
/** Comprimento máximo permitido para conteúdo de notícias */
const CONTEUDO_MAX_LENGTH = 5000

/**
 * - Schema de validação Zod para criação de notícia
 * - Define regras de validação, transformação e refinamento para todos os campos
 * - Inclui validações para URLs, categorias e comprimentos de texto
 */
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

  foto: fotoOpcionalSchema,

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

/**
 * - Schema de validação Zod para atualização de notícia
 * - Torna todos os campos opcionais, permitindo atualizações parciais
 * - Mantém as mesmas regras de validação do schema de criação
 */
export const updateNoticiaSchema = createNoticiaSchema.partial()
