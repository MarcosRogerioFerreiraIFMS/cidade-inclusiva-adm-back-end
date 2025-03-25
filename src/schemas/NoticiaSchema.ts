import { z } from 'zod'

const TITULO_MIN_LENGTH = 3
const CONTEUDO_MIN_LENGTH = 10

const CATEGORIA_MIN_LENGTH = 3
const CATEGORIA_MAX_LENGTH = 20

export const noticiaSchema = z.object({
  titulo: z
    .string()
    .min(
      TITULO_MIN_LENGTH,
      `O título deve ter pelo menos ${TITULO_MIN_LENGTH} caracteres`
    ),
  conteudo: z
    .string()
    .min(
      CONTEUDO_MIN_LENGTH,
      `O conteúdo deve ter pelo menos ${CONTEUDO_MIN_LENGTH} caracteres`
    ),
  url: z.string().url('URL inválida').optional(),
  foto: z.string().url('URL da foto inválida').optional(),
  categoria: z
    .string()
    .min(
      CATEGORIA_MIN_LENGTH,
      `A categoria deve ter pelo menos ${CATEGORIA_MIN_LENGTH} caracteres`
    )
    .max(
      CATEGORIA_MAX_LENGTH,
      `A categoria deve ter no máximo ${CATEGORIA_MAX_LENGTH} caracteres`
    )
})

export const noticiaUpdateSchema = noticiaSchema.partial()
