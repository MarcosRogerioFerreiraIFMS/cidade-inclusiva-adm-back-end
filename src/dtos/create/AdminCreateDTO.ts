import type { createAdminSchema } from '@/schemas'
import type { z } from 'zod'

/**
 * - DTO (Data Transfer Object) para criação de administrador
 * - Tipo derivado do schema de validação Zod para garantir consistência
 * - Contém campos simplificados para criação de admin (sem foto e endereço)
 */
export type AdminCreateDTO = z.infer<typeof createAdminSchema>
