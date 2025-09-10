import { createMotoristaSchema } from '@/schemas'
import { z } from 'zod'

/**
 * - DTO (Data Transfer Object) para criação de motorista
 * - Tipo derivado do schema de validação Zod para garantir consistência
 * - Contém todos os campos obrigatórios para criar um novo motorista
 */
export type MotoristaCreateDTO = z.infer<typeof createMotoristaSchema>
