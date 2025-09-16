import type { createAcessibilidadeUrbanaSchema } from '@/schemas'
import type { z } from 'zod'

/**
 * - DTO (Data Transfer Object) para criação de acessibilidade urbana
 * - Tipo derivado do schema de validação Zod para garantir consistência
 * - Contém todos os campos obrigatórios para criar uma nova acessibilidade urbana
 */
export type AcessibilidadeUrbanaCreateDTO = z.infer<
  typeof createAcessibilidadeUrbanaSchema
>
