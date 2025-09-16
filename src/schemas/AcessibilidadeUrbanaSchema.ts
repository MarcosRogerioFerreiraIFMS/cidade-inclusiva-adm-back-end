import { CategoriaAcessibilidadeUrbana, SimboloAcessibilidade } from '@/enums'
import {
  isValidEmail,
  normalizeEmail,
  sanitizeContent,
  sanitizeString,
  sanitizeTelefone
} from '@/utils'
import { z } from 'zod'
import { enderecoSchema } from './EnderecoSchema'
import { fotosArraySchema, logoSchema } from './FotoSchemas'

/** Comprimento mínimo permitido para nome de estabelecimento */
const NOME_MIN_LENGTH = 2
/** Comprimento máximo permitido para nome de estabelecimento */
const NOME_MAX_LENGTH = 100
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
    .transform((val) => val.trim().toUpperCase())
    .refine(
      (val) =>
        Object.values(SimboloAcessibilidade).includes(
          val as SimboloAcessibilidade
        ),
      {
        message: `Símbolo inválido. Valores aceitos: ${Object.values(
          SimboloAcessibilidade
        ).join(', ')}`
      }
    )
    .transform((val) => val as SimboloAcessibilidade),

  descricao: z
    .string({ invalid_type_error: 'A descrição deve ser uma string.' })
    .optional()
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
})

/**
 * - Schema de validação Zod para criação de acessibilidade urbana
 * - Define regras de validação, transformação e refinamento para todos os campos
 * - Inclui validações para e-mail, telefone, categoria e recursos
 */
export const createAcessibilidadeUrbanaSchema = z.object({
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

  telefone: z
    .string({
      required_error: 'O telefone é obrigatório.',
      invalid_type_error: 'O telefone deve ser uma string.'
    })
    .transform((val) => sanitizeTelefone(val.trim()))
    .refine((val) => val.length >= 10, {
      message: 'O telefone deve ter pelo menos 10 dígitos.'
    })
    .refine((val) => val.length <= 11, {
      message: 'O telefone deve ter no máximo 11 dígitos.'
    })
    .refine((val) => /^\d+$/.test(val), {
      message: 'O telefone deve conter apenas números.'
    }),

  email: z
    .string({
      required_error: 'O e-mail é obrigatório.',
      invalid_type_error: 'O e-mail deve ser uma string.'
    })
    .min(1, 'O e-mail não pode estar vazio.')
    .transform((val) => normalizeEmail(val.trim()))
    .refine(isValidEmail, {
      message: 'Formato de e-mail inválido.'
    }),

  categoria: z
    .string({
      required_error: 'A categoria é obrigatória.',
      invalid_type_error: 'A categoria deve ser uma string.'
    })
    .min(1, 'A categoria não pode estar vazia.')
    .transform((val) => val.trim().toUpperCase())
    .refine(
      (val) =>
        Object.values(CategoriaAcessibilidadeUrbana).includes(
          val as CategoriaAcessibilidadeUrbana
        ),
      {
        message: `Categoria inválida. Valores aceitos: ${Object.values(
          CategoriaAcessibilidadeUrbana
        ).join(', ')}`
      }
    )
    .transform((val) => val as CategoriaAcessibilidadeUrbana),

  endereco: enderecoSchema,

  logo: logoSchema,

  fotos: fotosArraySchema,

  recursos: z
    .array(acessibilidadeUrbanaRecursoSchema, {
      invalid_type_error: 'Os recursos devem ser um array.'
    })
    .optional()
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
