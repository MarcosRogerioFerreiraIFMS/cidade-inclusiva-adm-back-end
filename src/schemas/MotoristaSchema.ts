import { z } from 'zod'
import {
  emailSchema,
  fotoSchema,
  nomeSchema,
  telefoneSchema
} from './CommonSchemas'

/**
 * - Schema de validação Zod para criação de motorista
 * - Define regras de validação, transformação e refinamento para todos os campos
 * - Inclui validações para telefone, email e foto
 */

export const createMotoristaSchema = z.object({
  nome: nomeSchema,
  telefone: telefoneSchema,
  email: emailSchema,
  foto: fotoSchema
})

/**
 * - Schema de validação Zod para atualização de motorista
 * - Torna todos os campos opcionais, permitindo atualizações parciais
 * - Mantém as mesmas regras de validação do schema de criação
 */
export const updateMotoristaSchema = createMotoristaSchema.partial()
