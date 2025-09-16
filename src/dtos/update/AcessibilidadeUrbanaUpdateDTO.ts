import type { updateAcessibilidadeUrbanaSchema } from '@/schemas'
import type { z } from 'zod'

/**
 * - DTO (Data Transfer Object) para atualização de acessibilidade urbana
 * - Tipo derivado do schema de validação Zod para garantir consistência
 * - Permite atualizações parciais de acessibilidade urbana
 */
export type AcessibilidadeUrbanaUpdateDTO = z.infer<
  typeof updateAcessibilidadeUrbanaSchema
>
