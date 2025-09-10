import { UsuarioCreateDTO } from '@/dtos/create'
import { UsuarioUpdateDTO } from '@/dtos/update'
import { createUsuarioSchema, updateUsuarioSchema } from '@/schemas'

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
export function toUpdateUsuarioDTO(data: unknown): Promise<UsuarioUpdateDTO> {
  return updateUsuarioSchema.parseAsync(data)
}
