import type { createLikeSchema } from '@/schemas'
import type { z } from 'zod'

/**
 * - DTO (Data Transfer Object) para criação de like
 * - Tipo derivado do schema de validação Zod para garantir consistência
 * - Contém apenas o comentarioId (usuarioId é injetado pelo service)
 */
export type LikeCreateDTO = z.infer<typeof createLikeSchema>

/**
 * DTO completo para criação de like com usuarioId injetado
 * Usado internamente após validação do schema
 */
export interface LikeCreateWithUserDTO extends LikeCreateDTO {
  /** ID do usuário que está dando o like (injetado do usuário autenticado) */
  usuarioId: string
}
