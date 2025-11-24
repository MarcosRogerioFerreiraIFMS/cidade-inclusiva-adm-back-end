import type { updateMobilidadeStatusSchema } from '@/schemas'
import type { z } from 'zod'

/**
 * - DTO (Data Transfer Object) para atualização de status de mobilidade
 * - Tipo derivado do schema de validação Zod para garantir consistência
 * - Permite que apenas administradores atualizem o status das mobilidades
 */
export type MobilidadeUpdateStatusDTO = z.infer<
  typeof updateMobilidadeStatusSchema
>
