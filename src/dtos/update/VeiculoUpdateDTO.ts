import { z } from 'zod'
import { updateVeiculoSchema } from '../../schemas'

/**
 * - DTO (Data Transfer Object) para atualização de veículo
 * - Tipo derivado do schema de validação Zod para garantir consistência
 * - Permite atualizações parciais com todos os campos opcionais
 */
export type VeiculoUpdateDTO = z.infer<typeof updateVeiculoSchema>
