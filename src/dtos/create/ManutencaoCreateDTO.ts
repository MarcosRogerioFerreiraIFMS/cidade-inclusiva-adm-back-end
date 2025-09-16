import type { createManutencaoSchema } from '@/schemas'
import type { z } from 'zod'

/**
 * - DTO (Data Transfer Object) para criação de manutenção
 * - Tipo derivado do schema de validação Zod para garantir consistência
 * - Contém todos os campos obrigatórios para criar uma nova manutenção
 */
export type ManutencaoCreateDTO = z.infer<typeof createManutencaoSchema>
