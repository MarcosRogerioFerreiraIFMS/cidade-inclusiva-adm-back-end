import type { createProfissionalSchema } from '@/schemas'
import type { z } from 'zod'

/**
 * - DTO (Data Transfer Object) para criação de profissional
 * - Tipo derivado do schema de validação Zod para garantir consistência
 * - Contém todos os campos obrigatórios para criar um novo profissional
 */
export type ProfissionalCreateDTO = z.infer<typeof createProfissionalSchema>
