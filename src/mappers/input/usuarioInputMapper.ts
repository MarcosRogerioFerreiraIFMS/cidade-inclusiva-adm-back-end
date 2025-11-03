import type { AdminCreateDTO, UsuarioCreateDTO } from '@/dtos/create'
import type { UsuarioUpdateDTO } from '@/dtos/update'
import {
  createAdminSchema,
  createUsuarioSchema,
  updateUsuarioSchema
} from '@/schemas'

/**
 * - Converte dados não tipados para DTO de criação de usuário
 * - Aplica validação usando Zod schema e retorna dados tipados e validados
 * @param {unknown} data - Dados de entrada não tipados (geralmente req.body)
 * @returns {Promise<UsuarioCreateDTO>} DTO validado para criação de usuário
 * @throws {ZodError} Erro de validação se os dados não atenderem ao schema
 */
export function toCreateUsuarioDTO(data: unknown): Promise<UsuarioCreateDTO> {
  return createUsuarioSchema.parseAsync(data)
}

/**
 * - Converte dados não tipados para DTO de atualização de usuário
 * - Aplica validação usando Zod schema e retorna dados tipados e validados
 * @param {unknown} data - Dados de entrada não tipados (geralmente req.body)
 * @returns {Promise<UsuarioUpdateDTO>} DTO validado para atualização de usuário
 * @throws {ZodError} Erro de validação se os dados não atenderem ao schema
 */
export async function toUpdateUsuarioDTO(
  data: unknown
): Promise<UsuarioUpdateDTO> {
  return await updateUsuarioSchema.parseAsync(data)
}

/**
 * - Converte dados não tipados para DTO de criação de administrador
 * - Aplica validação usando Zod schema e retorna dados tipados e validados
 * @param {unknown} data - Dados de entrada não tipados (geralmente req.body)
 * @returns {Promise<AdminCreateDTO>} DTO validado para criação de administrador
 * @throws {ZodError} Erro de validação se os dados não atenderem ao schema
 */
export function toCreateAdminDTO(data: unknown): Promise<AdminCreateDTO> {
  return createAdminSchema.parseAsync(data)
}
