import { createUsuarioSchema } from '@/schemas/UsuarioSchema'
import { z } from 'zod'

/**
 * - DTO (Data Transfer Object) para criação de usuário
 * - Tipo derivado do schema de validação Zod para garantir consistência
 * - Contém todos os campos obrigatórios para criar um novo usuário
 */
export type UsuarioCreateDTO = z.infer<typeof createUsuarioSchema>
