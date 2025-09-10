import { createLoginSchema } from '@/schemas'
import { z } from 'zod'

/**
 * - DTO para criação/validação de dados de login
 * - Derivado do schema de validação Zod para garantir consistência
 */
export type LoginCreateDTO = z.infer<typeof createLoginSchema>
