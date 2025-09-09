import { z } from 'zod'
import { updateNoticiaSchema } from '../../schemas'

/**
 * - DTO (Data Transfer Object) para atualização de notícia
 * - Tipo derivado do schema de validação Zod para garantir consistência
 * - Contém campos opcionais que podem ser atualizados em uma notícia existente
 */
export type NoticiaUpdateDTO = z.infer<typeof updateNoticiaSchema>
