import { TipoEntidade } from '@prisma/client'
import { z } from 'zod'

const CONTEUDO_MIN_LENGTH = 1
const CONTEUDO_MAX_LENGTH = 1000

const sanitizeContent = (str: string): string => {
  return str
    .trim()
    .split('\n')
    .map((line) => line.trim().replace(/\s+/g, ' '))
    .filter((line) => line.length > 0)
    .join('\n')
    .replace(/[^\w\s\-.,!?()\náàãâéêíóôõúçÁÀÃÂÉÊÍÓÔÕÚÇ\n]/gi, '')
}

export const createComentarioSchema = z.object({
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

  entidadeId: z
    .string({
      required_error: 'O ID da entidade é obrigatório.',
      invalid_type_error: 'O ID da entidade deve ser uma string.'
    })
    .uuid('O ID da entidade deve ser um UUID válido.'),

  entidadeTipo: z
    .string({
      required_error: 'O tipo da entidade é obrigatório.',
      invalid_type_error: 'O tipo da entidade deve ser uma string.'
    })
    .min(1, 'O tipo da entidade não pode estar vazio.')
    .transform((val) => val.trim().toUpperCase())
    .refine(
      (val) => Object.values(TipoEntidade).includes(val as TipoEntidade),
      {
        message: `Tipo de entidade inválido. Valores aceitos: ${Object.values(
          TipoEntidade
        ).join(', ')}`
      }
    )
    .transform((val) => val as TipoEntidade),

  likes: z
    .number({ invalid_type_error: 'Os likes devem ser um número.' })
    .int('Os likes devem ser um número inteiro.')
    .min(0, 'Os likes não podem ser negativos.')
    .optional()
    .default(0),

  visivel: z
    .boolean({ invalid_type_error: 'Visível deve ser um valor booleano.' })
    .optional()
    .default(true)
})

export const updateComentarioSchema = z.object({
  conteudo: z
    .string({ invalid_type_error: 'O conteúdo deve ser uma string.' })
    .transform(sanitizeContent)
    .refine((val) => val.length >= CONTEUDO_MIN_LENGTH, {
      message: `O conteúdo deve ter pelo menos ${CONTEUDO_MIN_LENGTH} caracteres.`
    })
    .refine((val) => val.length <= CONTEUDO_MAX_LENGTH, {
      message: `O conteúdo deve ter no máximo ${CONTEUDO_MAX_LENGTH} caracteres.`
    })
    .optional(),

  likes: z
    .number({ invalid_type_error: 'Os likes devem ser um número.' })
    .int('Os likes devem ser um número inteiro.')
    .min(0, 'Os likes não podem ser negativos.')
    .optional(),

  visivel: z
    .boolean({ invalid_type_error: 'Visível deve ser um valor booleano.' })
    .optional()
})

export const likeComentarioSchema = z.object({
  increment: z
    .number({ invalid_type_error: 'O incremento deve ser um número.' })
    .int('O incremento deve ser um número inteiro.')
    .min(-1, 'O incremento deve ser -1, 0 ou 1.')
    .max(1, 'O incremento deve ser -1, 0 ou 1.')
    .default(1)
})

export const validateEntidadeTipoComentarioSchema = z.object({
  entidadeTipo: z
    .string({
      required_error: 'O tipo da entidade é obrigatório.',
      invalid_type_error: 'O tipo da entidade deve ser uma string.'
    })
    .min(1, 'O tipo da entidade não pode estar vazio.')
    .transform((val) => val.trim().toUpperCase())
    .refine(
      (val) => Object.values(TipoEntidade).includes(val as TipoEntidade),
      {
        message: `Tipo de entidade inválido. Valores aceitos: ${Object.values(
          TipoEntidade
        ).join(', ')}`
      }
    )
    .transform((val) => val as TipoEntidade)
})
