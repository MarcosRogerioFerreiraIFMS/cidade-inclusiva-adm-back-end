import { isImageUrl, normalizeUrl, transformUrl, verifyUrl } from '@/utils'
import { z } from 'zod'

/**
 * Schema base para validação de URLs de fotos/imagens
 * - Normaliza e valida URLs de imagens
 * - Verifica se a URL aponta para uma imagem válida
 * - Aplica transformações consistentes
 */
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

/**
 * Schema para foto opcional
 * - Usado em entidades que têm uma única foto opcional (usuário, motorista, profissional, notícia)
 */
export const fotoOpcionalSchema = baseFotoSchema.optional()

/**
 * Schema para foto obrigatória
 * - Usado quando a foto é um campo obrigatório
 */
export const fotoObrigatoriaSchema = baseFotoSchema

/**
 * Schema para array de fotos opcional
 * - Usado em entidades que podem ter múltiplas fotos (veículo, manutenção)
 * - Array vazio por padrão quando não fornecido
 */
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

/**
 * Schema para logo opcional
 * - Específico para logos de empresas/organizações
 * - Usa a mesma validação base mas com mensagem específica para logos
 */
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
