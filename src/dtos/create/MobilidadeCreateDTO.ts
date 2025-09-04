import { z } from 'zod'
import { createMobilidadeSchema } from '../../schemas/MobilidadeSchema'

/**
 * - DTO (Data Transfer Object) para criação de mobilidade
 * - Tipo derivado do schema de validação Zod para garantir consistência
 * - Contém todos os campos obrigatórios para criar uma nova mobilidade
 */
export type MobilidadeCreateDTO = z.infer<typeof createMobilidadeSchema>
