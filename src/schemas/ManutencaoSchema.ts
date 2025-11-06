import { sanitizeString } from '@/utils'
import { z } from 'zod'
import {
  emailSchema,
  enderecoSchema,
  fotosArraySchema,
  logoSchema,
  nomeSchema,
  telefoneSchema
} from './CommonSchemas'

/**
 * Schema reutilizável para validação de especialidade
 */
const especialidadeSchema = z
  .string({
    required_error: 'O nome da especialidade é obrigatório.',
    invalid_type_error: 'O nome da especialidade deve ser uma string.'
  })
  .transform(sanitizeString)
  .refine((val) => val.length >= 2, {
    message: 'A especialidade deve ter pelo menos 2 caracteres.'
  })
  .refine((val) => val.length <= 100, {
    message: 'A especialidade deve ter no máximo 100 caracteres.'
  })
  .refine((val) => /^[a-zA-ZÀ-ÿ0-9\s\-.,/]+$/.test(val), {
    message:
      'A especialidade deve conter apenas letras, números, espaços, hífens, pontos, vírgulas e barras.'
  })

/**
 * - Schema de validação Zod para criação de manutenção
 * - Define regras de validação, transformação e refinamento para todos os campos
 * - Inclui validações específicas para dados brasileiros (CEP, telefone, estados)
 */
export const createManutencaoSchema = z.object({
  nome: nomeSchema,

  telefone: telefoneSchema,

  email: emailSchema,

  fotos: fotosArraySchema,

  logo: logoSchema,

  especialidades: z
    .array(especialidadeSchema, {
      invalid_type_error: 'O campo especialidades deve ser um array de strings.'
    })
    .min(1, { message: 'Pelo menos uma especialidade deve ser informada.' })
    .max(20, { message: 'Máximo de 20 especialidades permitidas.' })
    .refine(
      (especialidades) => {
        const uniqueNames = new Set(
          especialidades.map((esp) => esp.toLowerCase())
        )
        return uniqueNames.size === especialidades.length
      },
      {
        message: 'Não é possível ter especialidades duplicadas.'
      }
    ),

  endereco: enderecoSchema
})

/**
 * - Schema de validação Zod para atualização de manutenção
 * - Torna todos os campos opcionais, permitindo atualizações parciais
 * - Mantém as mesmas regras de validação do schema de criação
 */
export const updateManutencaoSchema = createManutencaoSchema.partial().extend({
  endereco: createManutencaoSchema.shape.endereco.partial().optional(),
  especialidades: z
    .array(especialidadeSchema, {
      invalid_type_error: 'O campo especialidades deve ser um array de strings.'
    })
    .min(1, { message: 'Pelo menos uma especialidade deve ser informada.' })
    .max(20, { message: 'Máximo de 20 especialidades permitidas.' })
    .refine(
      (especialidades) => {
        if (!especialidades || especialidades.length === 0) return true
        const uniqueNames = new Set(
          especialidades.map((esp) => esp.toLowerCase())
        )
        return uniqueNames.size === especialidades.length
      },
      {
        message: 'Não é possível ter especialidades duplicadas.'
      }
    )
    .optional()
})
