import { createNoticiaSchema } from '@/schemas'
import { z } from 'zod'

/**
 * - DTO (Data Transfer Object) para criação de notícia
 * - Tipo derivado do schema de validação Zod para garantir consistência
 * - Contém todos os campos obrigatórios para criar uma nova notícia
 */
export type NoticiaCreateDTO = z.infer<typeof createNoticiaSchema>
