import type { updateComentarioSchema } from '@/schemas'
import type { z } from 'zod'

/**
 * - DTO (Data Transfer Object) para atualização de comentário
 * - Tipo derivado do schema de validação Zod para garantir consistência
 * - Contém campos opcionais que podem ser atualizados em um comentário existente
 */
export type ComentarioUpdateDTO = z.infer<typeof updateComentarioSchema>
