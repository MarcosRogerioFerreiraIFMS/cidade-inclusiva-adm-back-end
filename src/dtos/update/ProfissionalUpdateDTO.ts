import { z } from 'zod'
import { updateProfissionalSchema } from '../../schemas'

/**
 * - DTO (Data Transfer Object) para atualização de profissional
 * - Tipo derivado do schema de validação Zod para garantir consistência
 * - Contém campos opcionais que podem ser atualizados em um profissional existente
 */
export type ProfissionalUpdateDTO = z.infer<typeof updateProfissionalSchema>
