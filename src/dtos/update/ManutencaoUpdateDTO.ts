import type { updateManutencaoSchema } from '@/schemas'
import type { z } from 'zod'

/**
 * - DTO (Data Transfer Object) para atualização de manutenção
 * - Tipo derivado do schema de validação Zod para garantir consistência
 * - Todos os campos são opcionais para permitir atualizações parciais
 */
export type ManutencaoUpdateDTO = z.infer<typeof updateManutencaoSchema>
