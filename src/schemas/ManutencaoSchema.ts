import { ManutencaoEspecialidadeTipo } from '@/enums'
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

/** Número mínimo de especialidades permitidas */
const MIN_ESPECIALIDADES = 1
/** Número máximo de especialidades permitidas */
const MAX_ESPECIALIDADES = 20

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
    .array(
      z
        .string({
          required_error: 'A especialidade é obrigatória.',
          invalid_type_error: 'A especialidade deve ser uma string.'
        })
        .transform(sanitizeString)
        .transform((val) => val.trim().toUpperCase())
        .pipe(
          z.nativeEnum(ManutencaoEspecialidadeTipo, {
            invalid_type_error: 'O campo especialidade deve ser um tipo válido.'
          })
        ),
      {
        invalid_type_error:
          'O campo especialidades deve ser um array de tipos válidos.'
      }
    )
    .min(MIN_ESPECIALIDADES, {
      message: `Pelo menos ${MIN_ESPECIALIDADES} especialidade deve ser informada.`
    })
    .max(MAX_ESPECIALIDADES, {
      message: `Máximo de ${MAX_ESPECIALIDADES} especialidades permitidas.`
    })
    .refine(
      (especialidades) => {
        const uniqueTypes = new Set(especialidades)
        return uniqueTypes.size === especialidades.length
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
    .array(
      z
        .string({
          required_error: 'A especialidade é obrigatória.',
          invalid_type_error: 'A especialidade deve ser uma string.'
        })
        .transform(sanitizeString)
        .transform((val) => val.trim().toUpperCase())
        .pipe(
          z.nativeEnum(ManutencaoEspecialidadeTipo, {
            invalid_type_error: 'O campo especialidade deve ser um tipo válido.'
          })
        ),
      {
        invalid_type_error:
          'O campo especialidades deve ser um array de tipos válidos.'
      }
    )
    .min(MIN_ESPECIALIDADES, {
      message: `Pelo menos ${MIN_ESPECIALIDADES} especialidade deve ser informada.`
    })
    .max(MAX_ESPECIALIDADES, {
      message: `Máximo de ${MAX_ESPECIALIDADES} especialidades permitidas.`
    })
    .refine(
      (especialidades) => {
        if (!especialidades || especialidades.length === 0) return true
        const uniqueTypes = new Set(especialidades)
        return uniqueTypes.size === especialidades.length
      },
      {
        message: 'Não é possível ter especialidades duplicadas.'
      }
    )
    .optional()
})
