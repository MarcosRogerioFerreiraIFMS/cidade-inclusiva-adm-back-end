import { z } from 'zod'
import { sanitizeString } from '../utils'
import { fotosArraySchema } from './'

/** Comprimento mínimo permitido para marcas de veículos */
const MARCA_MIN_LENGTH = 2
/** Comprimento máximo permitido para marcas de veículos */
const MARCA_MAX_LENGTH = 50

/** Comprimento mínimo permitido para modelos de veículos */
const MODELO_MIN_LENGTH = 2
/** Comprimento máximo permitido para modelos de veículos */
const MODELO_MAX_LENGTH = 50

/** Comprimento mínimo permitido para cores de veículos */
const COR_MIN_LENGTH = 3
/** Comprimento máximo permitido para cores de veículos */
const COR_MAX_LENGTH = 30

/**
 * - Schema de validação Zod para criação de veículo
 * - Define regras de validação, transformação e refinamento para todos os campos
 * - Inclui validações para placa, marca, modelo e cor
 */

export const createVeiculoSchema = z.object({
  placa: z
    .string({
      required_error: 'A placa é obrigatória.',
      invalid_type_error: 'A placa deve ser uma string.'
    })
    .transform((val) => val.toUpperCase().replace(/[^A-Z0-9]/g, ''))
    .refine(
      (val) => {
        // Valida formato da placa (padrão brasileiro antigo: AAA-9999 ou novo: AAA9A99)
        const placaAntigaRegex = /^[A-Z]{3}[0-9]{4}$/
        const placaNovaRegex = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/
        return placaAntigaRegex.test(val) || placaNovaRegex.test(val)
      },
      {
        message:
          'A placa deve seguir o formato brasileiro (ex: ABC1234 ou ABC1D23).'
      }
    ),

  marca: z
    .string({
      required_error: 'A marca é obrigatória.',
      invalid_type_error: 'A marca deve ser uma string.'
    })
    .transform(sanitizeString)
    .refine((val) => val.length >= MARCA_MIN_LENGTH, {
      message: `A marca deve ter pelo menos ${MARCA_MIN_LENGTH} caracteres.`
    })
    .refine((val) => val.length <= MARCA_MAX_LENGTH, {
      message: `A marca deve ter no máximo ${MARCA_MAX_LENGTH} caracteres.`
    }),

  modelo: z
    .string({
      required_error: 'O modelo é obrigatório.',
      invalid_type_error: 'O modelo deve ser uma string.'
    })
    .transform(sanitizeString)
    .refine((val) => val.length >= MODELO_MIN_LENGTH, {
      message: `O modelo deve ter pelo menos ${MODELO_MIN_LENGTH} caracteres.`
    })
    .refine((val) => val.length <= MODELO_MAX_LENGTH, {
      message: `O modelo deve ter no máximo ${MODELO_MAX_LENGTH} caracteres.`
    }),

  cor: z
    .string({
      required_error: 'A cor é obrigatória.',
      invalid_type_error: 'A cor deve ser uma string.'
    })
    .transform(sanitizeString)
    .refine((val) => val.length >= COR_MIN_LENGTH, {
      message: `A cor deve ter pelo menos ${COR_MIN_LENGTH} caracteres.`
    })
    .refine((val) => val.length <= COR_MAX_LENGTH, {
      message: `A cor deve ter no máximo ${COR_MAX_LENGTH} caracteres.`
    }),

  motoristaId: z
    .string({
      required_error: 'O ID do motorista é obrigatório.',
      invalid_type_error: 'O ID do motorista deve ser uma string.'
    })
    .uuid('O ID do motorista deve ser um UUID válido.'),

  fotos: fotosArraySchema
})

/**
 * - Schema de validação Zod para atualização de veículo
 * - Torna todos os campos opcionais, permitindo atualizações parciais
 * - Mantém as mesmas regras de validação do schema de criação
 */
export const updateVeiculoSchema = createVeiculoSchema.partial()
