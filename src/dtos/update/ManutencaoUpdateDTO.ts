import { z } from 'zod'
import { updateManutencaoSchema } from '../../schemas'

/**
 * - DTO (Data Transfer Object) para atualização de manutenção
 * - Tipo derivado do schema de validação Zod para garantir consistência
 * - Todos os campos são opcionais para permitir atualizações parciais
 */
export type ManutencaoUpdateDTO = z.infer<typeof updateManutencaoSchema>
