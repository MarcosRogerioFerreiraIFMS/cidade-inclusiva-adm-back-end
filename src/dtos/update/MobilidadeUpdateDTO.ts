import { z } from 'zod'
import { updateMobilidadeSchema } from '../../schemas/MobilidadeSchema'

/**
 * - DTO (Data Transfer Object) para atualização de mobilidade
 * - Tipo derivado do schema de validação Zod para garantir consistência
 * - Permite atualizações parciais dos campos de mobilidade
 */
export type MobilidadeUpdateDTO = z.infer<typeof updateMobilidadeSchema>
