import { AcessibilidadeSimbolo, AcessibilidadeUrbanaCategoria } from '@/enums'
import { sanitizeContent, sanitizeString } from '@/utils'
import { z } from 'zod'
import {
  emailSchema,
  enderecoSchema,
  fotosArraySchema,
  logoSchema,
  nomeSchema,
  telefoneSchema
} from './CommonSchemas'

/** Comprimento mínimo permitido para descrição de recurso */
const DESCRICAO_MIN_LENGTH = 3
/** Comprimento máximo permitido para descrição de recurso */
const DESCRICAO_MAX_LENGTH = 500

/**
 * - Schema de validação Zod para recurso de acessibilidade urbana
 * - Define regras de validação para símbolo e descrição
 */
export const acessibilidadeUrbanaRecursoSchema = z.object({
  simbolo: z
    .string({
      required_error: 'O símbolo é obrigatório.',
      invalid_type_error: 'O símbolo deve ser uma string.'
    })
    .min(1, 'O símbolo não pode estar vazio.')
    .transform(sanitizeString)
    .transform((val) => val.trim().toUpperCase())
    .refine(
      (val) =>
        Object.values(AcessibilidadeSimbolo).includes(
          val as AcessibilidadeSimbolo
        ),
      {
        message: `Símbolo inválido. Valores aceitos: ${Object.values(
          AcessibilidadeSimbolo
        ).join(', ')}`
      }
    )
    .transform((val) => val as AcessibilidadeSimbolo),

  descricao: z
    .string({ invalid_type_error: 'A descrição deve ser uma string.' })
    .transform((val) => (val ? sanitizeContent(val.trim()) : val))
    .refine(
      (val) => {
        if (!val) return true
        return val.length >= DESCRICAO_MIN_LENGTH
      },
      {
        message: `A descrição deve ter pelo menos ${DESCRICAO_MIN_LENGTH} caracteres.`
      }
    )
    .refine(
      (val) => {
        if (!val) return true
        return val.length <= DESCRICAO_MAX_LENGTH
      },
      {
        message: `A descrição deve ter no máximo ${DESCRICAO_MAX_LENGTH} caracteres.`
      }
    )
    .optional()
})

/**
 * - Schema de validação Zod para criação de acessibilidade urbana
 * - Define regras de validação, transformação e refinamento para todos os campos
 * - Inclui validações para e-mail, telefone, categoria e recursos
 */
export const createAcessibilidadeUrbanaSchema = z.object({
  nome: nomeSchema,

  telefone: telefoneSchema,

  email: emailSchema,

  categoria: z
    .string({
      required_error: 'A categoria é obrigatória.',
      invalid_type_error: 'A categoria deve ser uma string.'
    })
    .min(1, 'A categoria não pode estar vazia.')
    .transform(sanitizeString)
    .transform((val) => val.trim().toUpperCase())
    .refine(
      (val) =>
        Object.values(AcessibilidadeUrbanaCategoria).includes(
          val as AcessibilidadeUrbanaCategoria
        ),
      {
        message: `Categoria inválida. Valores aceitos: ${Object.values(
          AcessibilidadeUrbanaCategoria
        ).join(', ')}`
      }
    )
    .transform((val) => val as AcessibilidadeUrbanaCategoria),

  endereco: enderecoSchema,

  logo: logoSchema,

  fotos: fotosArraySchema,

  recursos: z
    .array(acessibilidadeUrbanaRecursoSchema, {
      invalid_type_error: 'Os recursos devem ser um array.'
    })
    .default([])
    .refine((recursos) => recursos.length <= 20, {
      message: 'Não é possível adicionar mais de 20 recursos.'
    })
    .transform((recursos) => {
      // Remover duplicatas baseado no símbolo
      const simbolosUnicos = new Set()
      return recursos.filter((recurso) => {
        if (simbolosUnicos.has(recurso.simbolo)) {
          return false
        }
        simbolosUnicos.add(recurso.simbolo)
        return true
      })
    })
    .optional()
})

/**
 * - Schema de validação Zod para atualização de acessibilidade urbana
 * - Torna todos os campos opcionais, permitindo atualizações parciais
 * - Mantém as mesmas regras de validação do schema de criação
 */
export const updateAcessibilidadeUrbanaSchema = createAcessibilidadeUrbanaSchema
  .partial()
  .extend({
    endereco: createAcessibilidadeUrbanaSchema.shape.endereco
      .partial()
      .optional()
  })
