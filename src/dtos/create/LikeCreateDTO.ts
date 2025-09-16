import type { createLikeSchema } from '@/schemas'
import type { z } from 'zod'

/**
 * - DTO (Data Transfer Object) para criação de like
 * - Tipo derivado do schema de validação Zod para garantir consistência
 * - Contém os campos obrigatórios para criar um novo like (usuário e comentário)
 */
export type LikeCreateDTO = z.infer<typeof createLikeSchema>
