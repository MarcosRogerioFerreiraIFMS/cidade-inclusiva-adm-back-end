import { z } from 'zod'
import { updateMotoristaSchema } from '../../schemas/MotoristaSchema'

/**
 * - DTO (Data Transfer Object) para atualização de motorista
 * - Tipo derivado do schema de validação Zod para garantir consistência
 * - Permite atualizações parciais com todos os campos opcionais
 */
export type MotoristaUpdateDTO = z.infer<typeof updateMotoristaSchema>
