import { updateUsuarioSchema } from '@/schemas'
import { z } from 'zod'

/**
 * - DTO (Data Transfer Object) para atualização de usuário
 * - Tipo derivado do schema de validação Zod para garantir consistência
 * - Contém campos opcionais que podem ser atualizados em um usuário existente
 */
export type UsuarioUpdateDTO = z.infer<typeof updateUsuarioSchema>
