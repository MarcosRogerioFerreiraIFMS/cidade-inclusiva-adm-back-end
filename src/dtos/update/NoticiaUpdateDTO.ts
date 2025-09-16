import type { updateNoticiaSchema } from '@/schemas'
import type { z } from 'zod'

/**
 * - DTO (Data Transfer Object) para atualização de notícia
 * - Tipo derivado do schema de validação Zod para garantir consistência
 * - Contém campos opcionais que podem ser atualizados em uma notícia existente
 */
export type NoticiaUpdateDTO = z.infer<typeof updateNoticiaSchema>
